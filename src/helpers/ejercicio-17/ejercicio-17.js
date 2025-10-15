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
    if(!Array.isArray(datos) || datos.length===0) return {columnas:[],filas:[],totalFilas:filas.length};
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

  function ordenarTabla(datos,columa,direccion){
    if (!Array.isArray(datos) || datos.length === 0) return [];

    const datosOrdenados= [...datos];



  }

  function paginarTabla(datos,pagina,elementosPorPagina){

  }

  function filtrarTabla(datos,terminoBusqueda){

  }
  function exportarTabla(datos,formato){

  }






  

}