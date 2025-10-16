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
    .sort((primerUser, segundoUser) => segundoUser.similitud - primerUser.similitud)
    .slice(0, limite);
};
