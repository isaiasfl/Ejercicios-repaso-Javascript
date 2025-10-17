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
export const calcularSimilitudUsuarios = (idUsuario1 = 1, idUsuario2 = 1) => {
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
export const obtenerUsuariosSimilares = (idUsuario = 1, limite = 1) => {
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
 * @description Genera recomendaciones de productos para un usuario con puntuación, razones y usuarios similares
 * @param {number} idUsuario - ID del usuario objetivo
 * @param {number} numeroRecomendaciones - Número máximo de productos a recomendar
 * @returns {Array} Array de objetos con estructura { producto, puntuacion, razones, usuariosSimilaresQueCompraron, categoriaRelacionada }
 */
export const generarRecomendaciones = (
  idUsuario = 1,
  numeroRecomendaciones = 5
) => {
  const usuario = usuarios.find((u) => u.id === idUsuario);
  if (!usuario) return [];

  const patrones = analizarPatronesCompra();
  const pedidosUsuario = pedidos.filter((p) => p.idUsuario === idUsuario);
  const productosComprados = new Set();
  pedidosUsuario.forEach((pedido) =>
    pedido.productos.forEach((p) => productosComprados.add(p.idProducto))
  );

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

  const todosProductos = [
    ...productosSimilares,
    ...productosCategorias,
    ...productosHobbies,
  ];

  const recomendacionesMap = new Map();

  todosProductos.forEach((p) => {
    const razones = [];
    let puntuacion = 0;

    const usuariosQueCompraron = similares
      .filter(({ usuario: u }) =>
        pedidos
          .filter((pedido) => pedido.idUsuario === u.id)
          .some((pedido) =>
            pedido.productos.some((prod) => prod.idProducto === p.id)
          )
      )
      .map(({ usuario: u }) => u.id);

    if (usuariosQueCompraron.length > 0) {
      razones.push('Comprado por usuarios similares');
      puntuacion += 40;
    }

    if (categoriasUsuario.includes(p.categoría) && p.valoracion >= 4) {
      razones.push(
        'Pertenece a tus categorías favoritas y tiene alta valoración'
      );
      puntuacion += 30;
    }

    if (
      p.destacado &&
      usuario.hobbies.some((h) => p.etiquetas.includes(h.toLowerCase()))
    ) {
      razones.push('Producto destacado coincide con tus hobbies');
      puntuacion += 30;
    }

    if (puntuacion > 100) puntuacion = 100;

    recomendacionesMap.set(p.id, {
      producto: p,
      puntuacion,
      razones,
      usuariosSimilaresQueCompraron: usuariosQueCompraron,
      categoriaRelacionada: categoriasUsuario.includes(p.categoría)
        ? p.categoría
        : '',
    });
  });

  return Array.from(recomendacionesMap.values())
    .filter((p) => p.producto.stock > 0)
    .sort((a, b) => b.puntuacion - a.puntuacion)
    .slice(0, numeroRecomendaciones);
};

/**
 * @description Auxiliar para generarRecomendaciones: devuelve productos comprados por usuarios similares que el usuario objetivo no ha comprado
 */
const nuevosProductosDeUsuariosSimilares = (
  usuariosSimilares = [],
  productosComprados = []
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
    ? (productosRecomendables.reduce(
      (total, product) => total + product.valoracion,
      0
    ) / totalProductosRecomendables)
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

/**
 * @author Sergio
 * @description Actualiza las recomendaciones de un usuario cuando hay nuevos datos
 * @param {number} idUsuario - ID del usuario objetivo
 * @returns {Array} Array de productos recomendados actualizados
 */
export const actualizarRecomendaciones = (idUsuario = 1) => {
  const recomendacionesActualizadas = generarRecomendaciones(idUsuario);
  return recomendacionesActualizadas;
};

/**
 * @author Sergio
 * @description Explica por qué se recomienda un producto específico a un usuario
 * @param {number} idUsuario - ID del usuario objetivo
 * @param {number} idProducto - ID del producto recomendado
 * @returns {string} Explicación de la recomendación
 */
export const explicarRecomendacion = (idUsuario = 1, idProducto = 101) => {
  const usuario = usuarios.find((u) => u.id === idUsuario);
  const producto = productos.find((p) => p.id === idProducto);
  if (!usuario || !producto) return 'Usuario o producto no encontrado.';

  const patrones = analizarPatronesCompra();
  const productosComprados = new Set();
  pedidos.forEach((pedido) => {
    if (pedido.idUsuario === idUsuario) {
      pedido.productos.forEach((prod) =>
        productosComprados.add(prod.idProducto)
      );
    }
  });

  const similares = obtenerUsuariosSimilares(idUsuario, 5);
  const compradoPorSimilares = similares.some(({ usuario: u }) =>
    pedidos
      .filter((p) => p.idUsuario === u.id)
      .some((pedido) =>
        pedido.productos.some((prod) => prod.idProducto === idProducto)
      )
  );
  if (compradoPorSimilares)
    return 'Recomendado porque usuarios similares lo han comprado.';

  const categoriasUsuario = patrones.get(usuario.nombre)
    ? Object.keys(patrones.get(usuario.nombre))
    : [];
  if (
    categoriasUsuario.includes(producto.categoría) &&
    producto.valoracion >= 4 &&
    !productosComprados.has(producto.id)
  ) {
    return 'Recomendado porque pertenece a tus categorías favoritas y tiene alta valoración.';
  }

  if (
    producto.destacado &&
    usuario.hobbies.some((h) => producto.etiquetas.includes(h.toLowerCase()))
  ) {
    return 'Recomendado porque es destacado y coincide con tus hobbies.';
  }

  return 'Recomendación del sistema';
};

/**
 * @author Sergio
 * @description Identifica productos y categorías más populares entre usuarios similares
 * @returns {Object} Contiene productos y categorías más populares
 */
export const obtenerTendencias = () => {
  const productosContador = new Map();
  const categoriasContador = new Map();

  usuarios.forEach((usuario) => {
    const similares = obtenerUsuariosSimilares(usuario.id, 5);

    similares.forEach(({ usuario: u }) => {
      const pedidosUsuario = pedidos.filter((p) => p.idUsuario === u.id);
      pedidosUsuario.forEach((pedido) => {
        pedido.productos.forEach((p) => {
          const producto = productos.find((prod) => prod.id === p.idProducto);
          if (!producto) return;

          productosContador.set(
            producto.nombre,
            (productosContador.get(producto.nombre) || 0) + p.cantidad
          );

          categoriasContador.set(
            producto.categoría,
            (categoriasContador.get(producto.categoría) || 0) + p.cantidad
          );
        });
      });
    });
  });

  const limite = 5;
  const productosPopulares = [...productosContador.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limite)
    .map(([nombre]) => nombre);

  const categoriasPopulares = [...categoriasContador.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limite)
    .map(([nombre]) => nombre);

  return {
    productos: productosPopulares,
    categorias: categoriasPopulares,
  };
};

/**
 * @author Sergio
 * @description Guarda las recomendaciones generadas para un usuario en localStorage
 * @param {number} idUsuario - ID del usuario objetivo
 */
export const guardarRecomendacionesLocalStorage = (idUsuario = 1) => {
  const recomendaciones = generarRecomendaciones(idUsuario);

  if (!recomendaciones || recomendaciones.length === 0) return;

  localStorage.setItem(
    `recomendaciones_usuario_${idUsuario}`,
    JSON.stringify(recomendaciones)
  );
};

/**
 * @author Sergio
 * @description Simula el porcentaje de recomendaciones que podrían ser aceptadas por los usuarios
 * @returns {Object} Contiene porcentaje promedio y detalles por usuario
 */
export const compararEfectividad = () => {
  const resultados = [];

  usuarios.forEach((usuario) => {
    const recomendaciones = generarRecomendaciones(usuario.id, 5);

    if (recomendaciones.length === 0) return;

    const aceptadas = recomendaciones.filter(
      (p) => p.stock > 0 && p.valoracion >= 4.0
    ).length;

    const porcentajeAceptacion = (aceptadas / recomendaciones.length) * 100;

    resultados.push({
      usuario: usuario.nombre,
      totalRecomendaciones: recomendaciones.length,
      aceptadas,
      porcentajeAceptacion: Number(porcentajeAceptacion),
    });
  });

  const promedioAceptacion =
    resultados.length > 0
      ? resultados.reduce((total, r) => total + r.porcentajeAceptacion, 0) /
        resultados.length
      : 0;

  return {
    promedioAceptacion: Number(promedioAceptacion),
    detalles: resultados,
  };
};

export const tests = () => {
  console.log('RECOMENDACIONES');
  console.table(generarRecomendaciones(1, 2));
  console.table(generarRecomendaciones(2, 2));
  console.table(generarRecomendaciones(3, 2));
  console.log('SIMILITUD');
  console.table(calcularSimilitudUsuarios(1,2));
  console.table(calcularSimilitudUsuarios(2,3));
  console.table(calcularSimilitudUsuarios(1,3));
  console.log('EXPLICAR RECOMENDACION');
  console.log(explicarRecomendacion(2,101));
  console.log('OBTENER ESTADISTICAS');
  console.table(obtenerEstadisticasRecomendaciones());
};

// INICIALIZAR APLICACION
tests();