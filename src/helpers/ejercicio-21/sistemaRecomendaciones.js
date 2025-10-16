import { usuarios, pedidos, productos } from '../../db/data.js';

/**
 * @description Crea un Map que relacione cada usuario con las categorías que ha comprado y su frecuencia.
 * @author Sergio
 * @returns {Map} Mapa con clave = nombre del usuario y valor = objeto con frecuencia de categorías.
 */
export const analizarPatronesCompra = () => {
  const patronesCompra = new Map();

  pedidos.forEach((pedido) => {
    const usuario = usuarios.find((user) => user.id === pedido.idUsuario);
    if (!usuario) {
      return;
    }

    if (!patronesCompra.has(usuario.nombre)) {
      patronesCompra.set(usuario.nombre, {});
    }

    pedido.productos.forEach((product) => {
      const producto = productos.find((p) => p.id === product.idProducto);
      if (!producto) {
        return;
      }

      const categoria = producto.categoría;
      const categoriasUsuario = patronesCompra.get(usuario.nombre);

      categoriasUsuario[categoria] =
        (categoriasUsuario[categoria] || 0) + product.cantidad;

      patronesCompra.set(usuario.nombre, categoriasUsuario);
    });
  });

  return patronesCompra;
};

/**
 * @description Calcula un índice de similitud entre dos usuarios basado en hobbies, categorías, edad y ciudad.
 * * @author Sergio
 * @param {number} idUsuario1 - usuario
 * @param {number} idUsuario2 - usuario
 * @returns {number} Índice de similitud
 */
export const calcularSimilitudUsuarios = (idUsuario1, idUsuario2) => {
  const usuario1 = usuarios.find((u) => u.id === idUsuario1);
  const usuario2 = usuarios.find((u) => u.id === idUsuario2);
  if (!usuario1 || !usuario2) {
    return;
  }
  if (idUsuario1 === idUsuario2) {
    return 1;
  }

  //Hobbies
  const hobbies1 = new Set(usuario1.hobbies);
  const hobbies2 = new Set(usuario2.hobbies);
  const hobbiesComunes = [...hobbies1].filter((hobbie) => hobbies2.has(hobbie));
  const similitudHobbies =
    hobbiesComunes.length / Math.max(hobbies1.size, hobbies2.size);

  // categorias
  const patrones = analizarPatronesCompra();
  const categories1 = patrones.get(usuario1.nombre)
    ? Object.keys(patrones.get(usuario1.nombre))
    : [];
  const categories2 = patrones.get(usuario2.nombre)
    ? Object.keys(patrones.get(usuario2.nombre))
    : [];
  const comunesCategories = categories1.filter((category) =>
    categories2.includes(category)
  );
  const similitudCategorias =
    comunesCategories.length / Math.max(categories1.length, categories2.length);

  // edad
  const maxDiferencia = 50;
  const diferenciaEdad = Math.abs(usuario1.edad - usuario2.edad);
  const similitudEdad = 1 - Math.min(diferenciaEdad / maxDiferencia, 1);

  // ciudad
  const similitudCiudad = usuario1.ciudad === usuario2.ciudad ? 1 : 0;

  // Total
  const similitudTotal =
    similitudHobbies * 0.3 +
    similitudCategorias * 0.4 +
    similitudEdad * 0.15 +
    similitudCiudad * 0.15;

  return Number(similitudTotal);
};

/**
 * @author Sergio
 * @description Devuelve los N usuarios más similares al usuario dado
 * @param {number} idUsuario - ID del usuario de referencia
 * @param {number} limite - Número máximo de usuarios a devolver
 * @returns {Array} Array de objetos con { usuario, similitud }
 */
export const obtenerUsuariosSimilares = (idUsuario, limite = 1) => {
  const usuarioReferencia = usuarios.find((u) => u.id === idUsuario);
  if (!usuarioReferencia) {
    return [];
  }

  return usuarios
    .filter((u) => u.id !== idUsuario)
    .map((u) => ({
      usuario: u,
      similitud: calcularSimilitudUsuarios(idUsuario, u.id),
    }))
    .sort(
      (primerUser, segundoUser) => segundoUser.similitud - primerUser.similitud
    )
    .slice(0, limite);
};

/**
 * @author Sergio
 * @description Genera recomendaciones de productos para un usuario basadas en varios criterios
 * @param {number} idUsuario - ID del usuario objetivo
 * @param {number} numeroRecomendaciones - Número máximo de productos a recomendar
 * @returns {Array} Array de productos recomendados
 */
export const generarRecomendaciones = (
  idUsuario,
  numeroRecomendaciones = 5
) => {
  const usuario = usuarios.find((u) => u.id === idUsuario);
  if (!usuario) {
    return [];
  }
  const patrones = analizarPatronesCompra();
  const pedidosUsuario = pedidos.filter((p) => p.idUsuario === idUsuario);
  const productosComprados = new Set();
  pedidosUsuario.forEach((pedido) => {
    pedido.productos.forEach((p) => productosComprados.add(p.idProducto));
  });

  const similares = obtenerUsuariosSimilares(idUsuario, 5);
  const productosSimilares = nuevosProductosDeUsuariosSimilares(
    similares,
    productosComprados
  );

  const categoriasUsuario = patrones.get(usuario.nombre)
    ? Object.keys(patrones.get(usuario.nombre))
    : [];
  const productosCategorias = productos.filter(
    (p) =>
      categoriasUsuario.includes(p.categoría) &&
      p.valoracion >= 4 &&
      !productosComprados.has(p.id)
  );

  const productosHobbies = productos.filter(
    (p) =>
      p.destacado &&
      usuario.hobbies.some((h) => p.etiquetas.includes(h.toLowerCase())) &&
      !productosComprados.has(p.id)
  );

  const recomendacionesSet = new Map();
  [...productosSimilares, ...productosCategorias, ...productosHobbies].forEach(
    (p) => {
      recomendacionesSet.set(p.id, p);
    }
  );

  const recomendaciones = Array.from(recomendacionesSet.values())
    .filter((product) => product.stock > 0)
    .sort(
      (primerProducto, segundoProducto) =>
        segundoProducto.valoracion - primerProducto.valoracion
    )
    .slice(0, numeroRecomendaciones);

  return recomendaciones;
};

/**
 * @description Auxiliar para generarRecomendaciones: devuelve productos comprados por usuarios similares que el usuario objetivo no ha comprado
 */
const nuevosProductosDeUsuariosSimilares = (
  usuariosSimilares,
  productosComprados
) => {
  const productosNuevos = [];

  usuariosSimilares.forEach(({ usuario }) => {
    const pedidosUsuario = pedidos.filter((p) => p.idUsuario === usuario.id);
    pedidosUsuario.forEach((pedido) => {
      pedido.productos.forEach((p) => {
        if (!productosComprados.has(p.idProducto)) {
          const producto = productos.find((prod) => prod.id === p.idProducto);
          if (producto) productosNuevos.push(producto);
        }
      });
    });
  });

  return productosNuevos;
};

/**
 * @author Sergio
 * @description Devuelve estadísticas del sistema de recomendaciones
 * Analiza: número de usuarios, productos recomendables, promedio de valoración y stock disponible.
 * @returns {Object} Estadísticas generales
 */
export const obtenerEstadisticasRecomendaciones = () => {
  const usuariosAnalizados = usuarios.filter((u) => u.activo).length;

  const productosRecomendables = productos.filter(
    (p) => p.stock > 0 && p.valoracion >= 4.0
  );

  const totalProductosRecomendables = productosRecomendables.length;

  const promedioValoracion = totalProductosRecomendables
    ? productosRecomendables.reduce(
      (total, product) => total + product.valoracion,
      0
    ) / totalProductosRecomendables
    : 0;

  const productosDisponiblesPorUsuario = usuarios.map((u) => {
    const pedidosUsuario = pedidos.filter((p) => p.idUsuario === u.id);
    const productosComprados = new Set();
    pedidosUsuario.forEach((pedido) =>
      pedido.productos.forEach((prod) =>
        productosComprados.add(prod.idProducto)
      )
    );

    const productosNoComprados = productosRecomendables.filter(
      (p) => !productosComprados.has(p.id)
    );
    return { usuario: u, productosNoComprados };
  });

  return {
    usuariosAnalizados,
    totalProductosRecomendables,
    promedioValoracion: Number(promedioValoracion),
    productosDisponiblesPorUsuario,
  };
};
