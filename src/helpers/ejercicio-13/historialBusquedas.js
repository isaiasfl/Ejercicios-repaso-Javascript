/* eslint-disable no-prototype-builtins */
//imports



//Enunciado
// Implementa un módulo llamado  configuracionPreferencias  que:
// 1. Implemente un sistema de preferencias de usuario utilizando LocalStorage
// 2. Debe incluir las siguientes funciones:

// establecerPreferencia(clave, valor) : Guarda una preferencia

// obtenerPreferencia(clave, valorPorDefecto) : Obtiene una preferencia con valor por defecto

// restablecerPreferencias() : Restablece todas las preferencias a sus valores por defecto

// exportarPreferencias() : Devuelve un objeto con todas las preferencias

// importarPreferencias(preferencias) : Importa un objeto de preferencias

// 3. Define preferencias por defecto para:
// Tema ("claro"/oscuro)
// Idioma (es/en/fr)
// Notificaciones (activadas/desactivadas)
// Elementos por página (10/25/50)

// Crea funciones adicionales para:
// Validar los valores antes de guardar
// Crear perfiles de configuración
// Aplicar las preferencias automáticamente
// Muestra los resultados por consola.

//Funciones
// ===============================
// Módulo: configuracionPreferencias.js
// ===============================

// 📋 Preferencias por defecto
const preferenciasPorDefecto = {
  Tema: 'claro', // claro | oscuro
  Idioma: 'es',  // es | en | fr
  Notificaciones: 'activadas', // activadas | desactivadas
  'Elementos por página': 10, // 10 | 25 | 50
};

// ✅ Validar valores antes de guardar
function validarPreferencia(clave, valor) {
  const opcionesValidas = {
    Tema: ['claro', 'oscuro'],
    Idioma: ['es', 'en', 'fr'],
    Notificaciones: ['activadas', 'desactivadas'],
    'Elementos por página': [10, 25, 50],
  };

  return opcionesValidas[clave] ? opcionesValidas[clave].includes(valor) : false ;
}

//  Establecer una preferencia
export function establecerPreferencia(clave, valor) {
  if (!validarPreferencia(clave, valor)) {
    throw new Error('Preferencias invalidas ❌');
  }
  
  console.info('Preferencia restablecida. ☑️');
  localStorage.setItem(JSON.stringify(clave), JSON.stringify(valor));
}

// 🔍 Obtener una preferencia 
export function obtenerPreferencia(clave, valorPorDefecto) {
  clave= JSON.stringify(clave);
  valorPorDefecto = JSON.stringify(valorPorDefecto);

  if (!validarPreferencia(clave, valorPorDefecto) || !localStorage.hasOwnProperty(clave)) {
    throw new Error('Preferencias invalidas ❌');
  }

  return localStorage.getItem(clave);
}

//  Restablecer todas las preferencias a sus valores por defecto
export function restablecerPreferencias() {
  // devuelve un array de claves y valores -> foreach-> callback estableciendo una preferencia por cada iteración
  Object.entries(preferenciasPorDefecto).forEach(([clave, valor]) =>{
    if(clave === 'Elementos por p\u00E1gina')
      clave = 'Elementos por página';
    
    establecerPreferencia(clave, valor);
  });

  console.log('Preferencias restablecidas a valores por defecto. ♻️');
}

// Exportar todas las preferencias (como objeto)
export function exportarPreferencias() {
  const preferencias = {};
  Object.keys(preferenciasPorDefecto).forEach((clave) => {
    preferencias[clave] = obtenerPreferencia(clave, preferenciasPorDefecto[clave]);
  });

  return preferencias;
}

// Importar un objeto de preferencias
export function importarPreferencias(preferencias) {
  if (!(typeof {} === preferencias)){
    throw new Error('preferencias no es objeto');
  }

  Object.entries(preferencias).forEach(([clave, valor]) => {

    if (!validarPreferencia(clave, valor)) {
      throw new Error('Preferencias invalidas ❌');
    }
    establecerPreferencia(clave, valor);
  });

  console.info('Preferencias importadas. 📥');

}

//  Crear un perfil de configuración
export function crearPerfil(nombrePerfil, preferencias) {
  //verificar que preferencias es objeto {} y no está vacio
  if (typeof preferencias !== 'object' || preferencias === null || Array.isArray(preferencias)) {
    throw new Error( `El parámetro preferencias = ${preferencias} debe ser un objeto.`);
  }

  //Verificar que todas las claves existen en preferenciasPorDefecto
  const clavesValidas = Object.keys(preferenciasPorDefecto);
  const clavesRecibidas = Object.keys(preferencias);

  // Si hay alguna clave no válida, lanzar error
  const clavesInvalidas = clavesRecibidas.filter(
    (clave) => !clavesValidas.includes(clave)
  );

  if (clavesInvalidas.length > 0) {
    throw new Error(`⚠️ Claves no válidas en las preferencias: ${clavesInvalidas}`);
  }

  /*
  // Completar las claves que falten con los valores por defecto
  clavesValidas.forEach((clave) => {
    if (!(clave in preferencias)) {
      preferencias[clave] = preferenciasPorDefecto[clave];
    }
  });
*/

  localStorage.setItem(nombrePerfil, JSON.stringify(preferencias));
  
  console.info(`Usuario ${nombrePerfil} creado con exito. ☑️`);

}

// ⚙️ Aplicar automáticamente las preferencias 
export function aplicarPreferencias() {
  
  
}


