/* eslint-disable no-prototype-builtins */
//imports

//Funciones
// ===============================
// Módulo: configuracionPreferencias
// ===============================

export default function configuracionPreferencias (){

  // 📋 Preferencias por defecto- Objeto con las preferencias base por defecto
  const preferenciasPorDefecto = {
    Tema: 'claro', // claro | oscuro
    Idioma: 'es',  // es | en | fr
    Notificaciones: 'activadas', // activadas | desactivadas
    ElementosPorPágina: 10, // 10 | 25 | 50
  };

  // ✅ Validar valores antes de guardar
  /**
   * 
   * @param {String} clave -String de la clave a verificar 
   * @param {String} valor -String del valor de la clave a verificar
   * @returns {boolean} -Si la clave existe y el valor encontrado se  encuentra en el array será true sino false
   */
  function validarPreferencia(clave, valor) {
    const opcionesValidas = {
      Tema: ['claro', 'oscuro'],
      Idioma: ['es', 'en', 'fr'],
      Notificaciones: ['activadas', 'desactivadas'],
      ElementosPorPágina: [10, 25, 50],
    };

    return opcionesValidas[clave] ? opcionesValidas[clave].includes(valor) : false ;
  }

  //  Establecer una preferencia
  /**
   * 
   * @param {String} clave -String de la clave de la preferencia a establecer
   * @param {String} valor -String del valor del preferencia a poner
   */
  function establecerPreferencia(clave='', valor='') {
    if (!validarPreferencia(clave, valor)) {
      throw new Error('Preferencias invalidas ❌');
    }
  
    console.info('Preferencia establecida. ☑️');
    localStorage.setItem(clave, JSON.stringify(valor));
  }

  // 🔍 Obtener una preferencia 
  /**
   * 
   * @param {String} clave -String de la clave a obtener
   * @param {String} valorPorDefecto -Valor por defecto para validar clave 
   * @returns {*} -Retorna el valor que guarda la clave 
   */
  function obtenerPreferencia(clave='', valorPorDefecto='es') {
  
    if (!validarPreferencia(clave, valorPorDefecto) ) {
      throw new Error('Preferencias invalidas ❌');
    }
    
    console.info('Preferencia obtenida. 🔍');
    
    return JSON.parse(localStorage.getItem(clave));  
  }

  //  Restablecer todas las preferencias a sus valores por defecto
  /**
   * Restablece todas las preferencias a los valores por defecto decididos en preferenciasPorDefecto 
   * @returns {Object} -Retorna un objeto con todas las preferencias
   */
  function restablecerPreferencias() {
  // devuelve un array de claves y valores -> foreach-> callback estableciendo una preferencia por cada iteración
    Object.entries(preferenciasPorDefecto).forEach(([clave, valor]) =>{
      establecerPreferencia(clave, valor);
    });
    const preferencias = {};
    console.log('Preferencias restablecidas a valores por defecto. ♻️');

    Object.keys(preferenciasPorDefecto).forEach((clave) => {
      preferencias[clave] = obtenerPreferencia(clave, preferenciasPorDefecto[clave]);
    });

    return preferencias;

  }

  // Exportar todas las preferencias (como objeto)
  /**
   * 
   * @returns {Object} -Retorna un objeto con todas las preferencias actuales
   */
  function exportarPreferencias() {
    const preferencias = {};
    Object.keys(preferenciasPorDefecto).forEach((clave) => {
      preferencias[clave] = obtenerPreferencia(clave, preferenciasPorDefecto[clave]);
    });

    return preferencias;
  }

  // Importar un objeto de preferencias
  /**
   * 
   * @param {Object} preferencias -Objeto {} con todas las preferencias que desea poner
   * @returns {Object} -Retorna un objeto {} con las preferencias actualizadas
   */
  function importarPreferencias(preferencias) {
    if (typeof preferencias !== 'object' || preferencias === null || Array.isArray(preferencias)) {
      throw new Error( `El parámetro preferencias = ${preferencias} debe ser un objeto.`);
    }

    Object.entries(preferencias).forEach(([clave, valor]) => {

      if (!validarPreferencia(clave, valor)) {
        throw new Error('Preferencias invalidas ❌');
      }
      establecerPreferencia(clave, valor);
    });

    Object.keys(preferenciasPorDefecto).forEach((clave) => {
      preferencias[clave] = obtenerPreferencia(clave, preferenciasPorDefecto[clave]);
    });

    console.info('Preferencias importadas. 📥');

    return preferencias;

  }

  //  Crear un perfil de configuración
  /**
 * 
 * @param {string} nombrePerfil -Nombre del perfil
 * @param {Object} preferencias - objeto {} que deberá contener las preferencias
 * @returns {} -Se guarda en local storage por clave=nombrePerfil
 */
  function crearPerfil(nombrePerfil, preferencias) {
    nombrePerfil = nombrePerfil.trim();
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

    
    // Completar las claves que falten con los valores por defecto
    clavesValidas.forEach((clave) => {
      if (!(clave in preferencias)) {
        preferencias[clave] = preferenciasPorDefecto[clave];
      }
    });


    localStorage.setItem(nombrePerfil, JSON.stringify(preferencias));
  
    console.info(`Usuario ${nombrePerfil} creado con exito. ☑️`);

  }

  // ⚙️ Aplicar automáticamente las preferencias 
  /**
   * 
   * @param {String} nombreUsuario -String con el nombre del perfil a aplicar preferencias 
   */
  function aplicarPreferencias(nombreUsuario) {
  // Verificar que se haya pasado un nombre de usuario
    if (!nombreUsuario || typeof nombreUsuario !== 'string') {
      throw new Error('Debes indicar un nombre de usuario válido.');
    }

    // Buscar el perfil en localStorage
    const perfilGuardado = localStorage.getItem(nombreUsuario);

    if (!perfilGuardado) {
      throw new Error(`No existe ningún perfil guardado con el nombre "${nombreUsuario}".`);
    }

    // Convertir a objeto las preferencias guardadas
    const preferencias = JSON.parse(perfilGuardado);

    // Aplicar cada preferencia válida
    for (const [clave, valor] of Object.entries(preferencias)) {
      if (validarPreferencia(clave, valor)) {
        establecerPreferencia(clave, valor);
        console.log(`⚙️ Aplicado: ${clave} = ${valor}`);
      } else {
        console.warn(`⚠️ Valor no válido para ${clave}: ${valor}`);
      }
    }

    console.info(`✅ Preferencias del usuario "${nombreUsuario}" aplicadas correctamente.`);
  }

  
  

  function demostracionEjercicio13() {
    localStorage.clear();
    console.log('------------------------------------------------------');
    console.log('Poniendo preferecias a default');
    console.table(restablecerPreferencias());
    console.log('------------------------------------------------------');

    console.log('Estableciendo preferencia Tema= oscuro');
    establecerPreferencia('Tema','oscuro');
    console.log('------------------------------------------------------');

    console.log('Obteniendo preferencia Tema');
    console.log(obtenerPreferencia('Tema','claro'));
    console.log('------------------------------------------------------');

    
    console.log('Obteniendo preferencias Exportadas');
    console.table(exportarPreferencias());
    console.log('------------------------------------------------------');

    const preferencias = {
      Tema: 'oscuro',
      Idioma: 'en',
      Notificaciones: 'activadas',
      ElementosPorPágina: 25,
    };
    console.log('Importando preferencias');
    console.table(importarPreferencias(preferencias));
    console.log('------------------------------------------------------');

    const preferenciasV2 = {
      Tema: 'oscuro',
      Idioma: 'es',
      Notificaciones: 'activadas',
      ElementosPorPágina: 50,
    };
    console.log('Crear usuario de configuración');
    crearPerfil('Ingeniero',preferenciasV2);
    console.log('------------------------------------------------------');

    console.log('Aplicando preferencias del usuario');
    aplicarPreferencias('Ingeniero');
    console.log('------------------------------------------------------');




  }

  return {establecerPreferencia,
    obtenerPreferencia,
    restablecerPreferencias,
    exportarPreferencias,
    importarPreferencias,
    aplicarPreferencias,
    demostracionEjercicio13};

}


