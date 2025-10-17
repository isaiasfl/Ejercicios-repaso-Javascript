import { usuarios } from '../../db/data.js';

/**
 * Busca usuarios que tengan al menos uno de los hobbies indicados.
 * @param {String[]} arrayHobbies - Array de hobbies a buscar en los usuarios
 * @returns - Array de usuarios que tienen alguno de los hobbies, ordenado por cantidad de coincidencias y nombre.
 */
export function buscarUsuariosPorHobbies(arrayHobbies) {
  // Filtra los usuarios que tengan al menos un hobby incluido en arrayHobbies
  const usuariosCoincidencias = usuarios.filter((usuario) => 
    usuario.hobbies.some((hobby) => arrayHobbies.includes(hobby)));

  // Función que cuenta cuántos hobbies coinciden con arrayHobbies
  const contarCoincidencias = (usuario) =>
    usuario.hobbies.filter((hobby) => arrayHobbies.includes(hobby)).length;

  // Ordena los usuarios por cantidad de coincidencias y nombre
  usuariosCoincidencias.sort((a, b) => {
    if (contarCoincidencias(b) === contarCoincidencias(a)){
      return a.nombre.localeCompare(b.nombre);
    } else {
      return contarCoincidencias(b) - contarCoincidencias(a);
    }
  });

  return usuariosCoincidencias;
}

/**
 * Filtra los usuarios que viven en una ciudad específica.
 * @param {String} ciudad - Nombre de la ciudad.
 * @returns Array de usuarios que viven en la ciudad indicada.
 */
export function filtrarPorCiudad(ciudad) {
  return usuarios.filter((usuario) => usuario.ciudad === ciudad);
}

/**
 * Filtra los usuarios que tienen un nivel específico.
 * @param {String} nivel - Nivel del usuario (por ejemplo: 'premium', 'básico').
 * @returns Array de usuarios que tienen el nivel indicado.
 */
export function filtrarPorNivel(nivel) {
  return usuarios.filter((usuario) => usuario.nivel === nivel);
}

/**
 * Calcula estadísticas de todos los hobbies de los usuarios.
 * @returns Array de objetos con el nombre del hobby, cantidad de veces que aparece y porcentaje respecto al total.
 */
export function estadisticasHobbiesPopulares() {
  // Cuenta la cantidad de veces que aparece cada hobby
  const hobbies = usuarios.reduce((acc, usuario) => {
    usuario.hobbies.reduce((acc, hobby) => {
      acc[hobby] = (acc[hobby] || 0) + 1;
      return acc;
    }, acc);
    return acc;
  }, {});

  // Calcula el total de hobbies para poder obtener el porcentaje
  const totalHobbies = Object.values(hobbies).reduce((a, b) => a + b, 0);

  // Convierte el objeto de hobbies a un array ordenado y con porcentaje
  const hobbiesPopulares = Object.entries(hobbies)
    .sort((a, b) => b[1] - a[1]) // Ordenar de mayor a menor cantidad
    .map(([hobby, cantidad]) => ({
      nombre: hobby,
      cantidad,
      porcentaje: ((cantidad / totalHobbies) * 100).toFixed(2),
    }));

  return hobbiesPopulares;
}

/**
 * Función de prueba que ejecuta todas las funciones anteriores y muestra los resultados en consola.
 */
export function test() {
  console.log('=== TEST DE FUNCIONES ===');

  // 1️⃣ Test: buscarUsuariosPorHobbies
  const hobbiesBuscados = ['lectura', 'cocina'];
  console.log('\nUsuarios que tienen hobbies:', hobbiesBuscados);
  const usuariosPorHobbies = buscarUsuariosPorHobbies(hobbiesBuscados);
  console.table(usuariosPorHobbies);

  // 2️⃣ Test: filtrarPorCiudad
  const ciudadBuscada = 'Madrid';
  console.table(`\nUsuarios que viven en ${ciudadBuscada}:`);
  const usuariosPorCiudad = filtrarPorCiudad(ciudadBuscada);
  console.table(usuariosPorCiudad);

  // 3️⃣ Test: filtrarPorNivel
  const nivelBuscado = 'premium';
  console.log(`\nUsuarios con nivel ${nivelBuscado}:`);
  const usuariosPorNivel = filtrarPorNivel(nivelBuscado);
  console.table(usuariosPorNivel);

  // 4️⃣ Test: estadisticasHobbiesPopulares
  console.log('\nEstadísticas de hobbies populares:');
  const statsHobbies = estadisticasHobbiesPopulares();
  console.table(statsHobbies);

  console.log('\n=== FIN DE LOS TEST ===');
}

// Ejecuta la función de prueba
test();