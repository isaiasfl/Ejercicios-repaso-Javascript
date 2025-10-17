import { usuarios } from '../../db/data';


export function tablaDatos(){
  /**
   * Crea una estructura de tabla a partir de datos.
   * @param {Array} datos -- Recibe la data que va a transformar a tabla.
   * @param {Array} columnas -- Especifica que columnas va a mostrar en la tabla.
   * @returns {Object} -- Retorna un objeto con la estructura de la tabla.
   */
  function crearTabla(datos,columnas){
    //Si no recibimos datos o datos no es un array devolvemos un objeto vacío
    if(!Array.isArray(datos) || datos.length===0) return {columnas:[],filas:[],totalFilas:0};
    //Igualamos las columnas finales a las columnas pasadas por parámetro 
    // o si no hemos recibido las columnas, cogerá las del primer objeto que reciba.
    const columnasFinales = columnas || Object.keys(datos[0]);
    
    const filas = datos.map(item=>{
      const fila = {};
      columnasFinales.forEach(col =>{
        fila[col] = item[col];
      });
      return fila;
    });

    return {
      columnas:columnasFinales,
      filas:filas,
      totalFilas:filas.length
    };
  }
  /**
 * Ordena un array de objetos según una columna específica. 
 * @param {Array<Object>} datos - Array de objetos a ordenar.
 * @param {string} columna - Nombre de la propiedad por la cual ordenar.
 * @param {string} [direccion='asc'] - Dirección: 'asc' o 'desc'.
 * @returns {Array<Object>} - Nuevo array ordenado.
 */
  function ordenarTabla(datos,columna,direccion='asc'){
    if (!Array.isArray(datos) || datos.length === 0) return [];
    //Cogemos todo el array completo y lo guardamos en otra variable para no modificar el original
    const datosOrdenados= [...datos];

    datosOrdenados.sort((a,b)=>{
      const valorA = a[columna];
      const valorB = b[columna];
      if (valorA === undefined || valorA === null) return 1;
      if (valorB === undefined || valorB === null) return -1;
      const comparacion = valorA < valorB ? -1 : valorA > valorB ? 1 : 0;
      //Aquí invierte el resultado de la comparación si la dirección es distinta a 'asc'
      return direccion === 'asc' ? comparacion : -comparacion;
    });
    return datosOrdenados;
  }
  /**
   * Pagina un array de datos.
   * @param {Array<object>} datos - Array de objetos a paginar. 
   * @param {Number} pagina  - Número de la página.
   * @param {Number} elementosPorPagina - Cantidad de elementos por página.
   * @returns {Array<Object>} - Retorna el array de los elementos de la página solicitada
   */
  function paginarTabla(datos,pagina,elementosPorPagina){
    if(!Array.isArray(datos) ||datos.length ===0 ) return [];
    //Controlamos que el número de la página y/o elementos por página sean validos
    if (pagina <= 0 || elementosPorPagina <= 0) return [];
    //Calculamos el inicio de la página, se le resta menos uno porque el índice inicial en "slice()" es la posición - 1
    const inicio = (pagina - 1) * elementosPorPagina;
    //Calculamos el final de la página
    const final = pagina * elementosPorPagina;
    //Controlamos si el indice de inicio es mayor al rango de datos.
    if(inicio>=datos.length){
      //Si se pasa del rango de datos posible, el indice será la última página que haya.
      //La función "Math.ceil()" sirve para redondear hacia arriba.
      const ultimaPagina = Math.ceil(datos.length/elementosPorPagina);
      const nuevoInicio = ultimaPagina;
      const nuevoFinal = datos.length;
      return datos.slice(nuevoInicio, nuevoFinal);
    }

    return datos.slice(inicio,final);
  }
  /**
   * Función que filtra un array de objetos según el término que se busque
   * @param {Array<Object>} datos - Array de objetos a filtrar 
   * @param {String} terminoBusqueda - Término a buscar en los datos
   * @returns {Array<Object>} - Devuelve un array de objetos con los datos filtrados
   */
  function filtrarTabla(datos,terminoBusqueda){
    //Devolveremos los datos pasados si una de las condiciones se cumple.
    if(!Array.isArray(datos) || datos.length===0 || typeof terminoBusqueda!=='string' || terminoBusqueda.trim()==='')return datos;
    //Pasamos el término de busqueda a minúsculas y quitamos los espacios tanto por delante como por detras para evitar problemas
    const terminoBusquedaLowerCase = terminoBusqueda.toLocaleLowerCase().trim();
    //Devolverá el array de objetos que pase el filtro, en este caso es si some === true
    return datos.filter(item=>{ 
      //Obtenemos un array de los valores del item, el método some verificará si al menos hay una coincidencia. 
      return Object.values(item).some(value=>{
        if(value!==null){
          //Si el valor no es igual a null, transformará el valor a string.
          const valor = String(value).toLowerCase();
          //Al tener el valor de tipo string, podemos utilizar "includes" para ver si el termino de búsqueda está incluido en el valor.
          return valor.includes(terminoBusquedaLowerCase);
        }
        return false;
      });
    });
  }
  
  /**
   * 
   * @param {Array<Object>} datos - Array de objetos  a exportar
   * @param {string} formato - Formato de exportación
   * @returns {string} - String con los datos formateados
   */
  function exportarTabla(datos,formato){
    // Validar que datos sea un array válido y no esté vacío
    if(!Array.isArray(datos) || datos.length===0) return '';
    // Validar que formato sea un string válido y no esté vacío
    if(typeof formato !=='string' ||formato.trim()==='')return '';
    // Normalizar el formato: eliminar espacios y convertir a minúsculas
    formato = formato.trim().toLowerCase();

    switch(formato){
    case 'json':
      return JSON.stringify(datos);
    default:
      return '';
    }
  
  }
  function demostracionEjercicio17() {
    console.log('🚀 === EJERCICIO 17: SISTEMA DE TABLAS ===\n');
  
    const tabla = tablaDatos();
  
    // 1. CREAR TABLA
    console.log('1️⃣ CREAR TABLA');
    const miTabla = tabla.crearTabla(usuarios, ['nombre', 'email', 'edad']);
 
    console.table(miTabla.filas);
    console.log('\n');
  
    // 2. ORDENAR
    console.log('2️⃣ ORDENAR por edad (descendente)');
    const ordenados = tabla.ordenarTabla(usuarios, 'edad', 'desc');
    console.table(ordenados.slice(0, 5));
    console.log('\n');
  
    // 3. FILTRAR
    console.log('3️⃣ FILTRAR "ana"');
    const filtrados = tabla.filtrarTabla(usuarios, 'ana');
    console.table(filtrados);
    console.log('\n');
  
    // 4. PAGINAR
    console.log('4️⃣ PAGINAR (página 1, 3 elementos)');
    const paginados = tabla.paginarTabla(usuarios, 1, 3);
    console.table(paginados);
    console.log('\n');
  
    // 5. EXPORTAR
    console.log('5️⃣ EXPORTAR a JSON (primeros 3)');
    const json = tabla.exportarTabla(usuarios.slice(0, 3), 'json');
    console.log(json);
    console.log('\n');
  

    console.log('\n✅ Ejercicio 17 completado\n');
  }

  return {
    crearTabla,
    ordenarTabla,
    paginarTabla,
    filtrarTabla,
    exportarTabla,
    demostracionEjercicio17
  };
  


}
 

