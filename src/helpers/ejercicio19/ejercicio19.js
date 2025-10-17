
const sistemaNotificaciones = ()=>{
  
  // la terminal de node no acepta CSS sino código ANSI para aplicar el color al texto.
  // en caso de ser para navegador, habria que cambiar el codigo por este formato "color:color_del_texto",
  // para que lo identifique como CSS.

  /**
   * - array para almacenar las notificaciones
   */
  const historial = [];


  /**
   * - Obeto con los colores en CSS que se van a usar para los mensajes
   */
  const estilos={     // objeto con los estilos en CSS para mostrar los mensajes en consola
    exito: 'color: green', // verde  \x1b[32m --> codigo ANSI de verde
    error: 'color: red', // rojo  \x1b[31m --> codigo ANSI de rojo
    advertencia: 'color: yellow', //amarillo  \x1b[33m --> codigo ANSI de amarillo
    informacion: 'color: blue' // azul  \x1b[34m --> codigo ANSI de azul
  };

  /**
 * @description - Funcion que sirve para obtener la hora 
 * @returns {String} - Devuelve un objeto String con la fecha y hora
 */
  function obtenerHora(){
    return new Date().toLocaleString();
  }


  /**
 * @description - Crea el formato que va a tener la notificacion en la consola, con un fecha, un tipo y un mensaje
 * @param {String} mensaje - Cadena con el mensaje que se va a mostrar en consola
 * @param {String} tipo - Tipo de mensaje que se va a mostrar en la consola (exito, error, advertencia, informacion)
 * @returns {String} - Mensaje con el formato de notificacion.
 */
  function formatearNotificacion(mensaje,tipo){
    const timestamp = obtenerHora();
    return `${timestamp}, ${tipo.toUpperCase()}: ${mensaje}`;
  }

  /**
 * @description - Muestra en consola un mensaje formateado con un tipo especifico de notificacion
 * @param {String} mensaje - Cadena con el mensaje que se va a monstrar en consola
 * @param {String} tipo - Tipo de mensaje que se va a mostrar en la consola (exito, error, advertencia, informacion)
 */
  function mostrarNotificacion(mensaje,tipo){
    const notificacion = formatearNotificacion(mensaje, tipo);
    console.log(`%c${notificacion}`, estilos[tipo]);
  }


  /**
 * @description - Añade al array historial el objeto con la notificacion que se crea
 * @param {String} mensaje - Cadena con el mensaje que se va a monstrar en consola
 * @param {String} tipo - Tipo de mensaje que se va a mostrar en la consola (exito, error, advertencia, informacion)
 */
  function registrarNotificacion(mensaje, tipo){
    const addNotificacion = {
      mensaje: `${mensaje}`,
      tipo: `${tipo}`,
      hora: `${obtenerHora()}`
    };

    historial.push(addNotificacion);
    mostrarNotificacion('Mensaje almacenado correctamente', 'informacion');
  }


  /**
 * @description - devuelve el array con todos los mensajes almacenados
 * @returns {Array} - Devuelve un array que contiene todos los mensajes que se han registrado
 */
  function obtenerHistorialNotificaciones(){
    return historial;
  }


  /**
 * @description - funcion que filtra el array de historial para buscar los mensajes cuyo tipo coincidan con el tipo pasado como parametro
 * @param {String} tipo - Tipo de mensaje que se va a mostrar en la consola (exito, error, advertencia, informacion)
 * @returns {Array} - Devuelve un array con los objetos cuyo tipo coincidan con el tipo pasado por parametro.
 */
  function filtrarNotificaciones(tipo){
    return historial.filter((notificacion)=>notificacion.tipo===tipo);
  }


  function demostracionEjercicio19(){
    mostrarNotificacion('Mensaje mostrado con exito', 'exito');
    mostrarNotificacion('Algo salio mal', 'error');
    mostrarNotificacion('Advertencia, revise el codigo', 'advertencia');
    mostrarNotificacion('Informacion importante', 'informacion');

    registrarNotificacion('Mensaje mostrado con exito', 'exito');
    registrarNotificacion('Algo salio mal', 'error');
    registrarNotificacion('Mensaje mostrado con exito otra vez', 'exito');
    registrarNotificacion('Informacion importante', 'informacion');

    console.table(obtenerHistorialNotificaciones());
    console.table(filtrarNotificaciones('exito'));
  }

  //demostracionEjercicio19();

  return { formatearNotificacion,mostrarNotificacion,registrarNotificacion,obtenerHistorialNotificaciones,filtrarNotificaciones,demostracionEjercicio19 };
};

export default sistemaNotificaciones;
