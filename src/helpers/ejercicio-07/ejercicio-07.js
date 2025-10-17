import { productos } from '../../db/data.js';

/**
 * 
 * @param {Array} productos 
 */
function sistemaEtiquetas(productos){
  // Guardamos en una variable todas las etiquetas de los productos
  // --> .map: (convertimos el array productos en un array de arrays)
  // --> .reduce: (lo que hace es unir todos los array en uno solo)
  const extraerTodasEtiquetas = productos
    .map(producto => producto.etiquetas)
    .reduce((acum, etiquetas) => acum.concat(etiquetas, []));
  
  // Lo que hacemos ahora es meter el array en un Set para eliminar duplicados
  const etiquetas = new Set(extraerTodasEtiquetas);

  // Resultado después de eliminar los duplicados:
  console.log('Etiquetas únicas:', [...etiquetas]);

  /**
   * Añadir etiquetas
   * @param {*} etiqueta 
   */
  function agregarEtiqueta(etiqueta){
    // Lo que hace es añadir etiquetas al Set "etiquetas".
    etiquetas.add(etiqueta);
    console.log(`Se ha agregado la etiqueta ${etiqueta}`);
  }

  /**
   * Elimina las etiquetas
   * @param {*} etiqueta 
   */
  function eliminarEtiqueta(etiqueta){
    // En el if() se comprueba si el Set "etiquetas" contiene el párametro que se pide 
    // en la función y si este coincide con uno de los valores del Set, lo elimina y si no,
    // dice que no existe.
    if(etiquetas.has(etiqueta)){
      etiquetas.delete(etiqueta);
      console.log(`Se ha eliminado la etiqueta ${etiqueta}`);
    }else{
      console.log(`La etiqueta ${etiqueta} no existe`);
    }
  }

  /**
   * Obtiene los productos según la etiqueta
   * @param {*} etiqueta 
   * @returns - Devuelve los productos que contengan la etiqueta pedida
   */
  const obtenerProductosConEtiqueta = (etiqueta) => productos
    .filter(producto => producto.etiquetas
      .includes(etiqueta)); 

  /**
   * Devuelve todas las etiquetas que existan
   * @returns - Devuelve un array con todas las etiquetas que hayan
   */
  const etiquetasDisponibles = () => [...etiquetas];

  /**
   * Filtrar productos por múltiples etiquetas (AND / OR)
   * @param {Array} etiquetaFiltrada 
   * @param {*} modo 
   * @returns 
   */
  // --> etiquetaFiltrada: (Es un array de etiquetas).
  // --> modo: (es la cadena que decide la lógica del filtrado).
  const filtrarEtiquetas = (etiquetaFiltrada, modo = 'OR') => 
    productos.filter(producto => {
      // Filtra todos los productos que contengan esas etiquetas
      const coincidencias = etiquetaFiltrada
        .filter(e => producto.etiquetas.includes(e));

      // En el return, se cambia la lógica a AND para que solamente devuelva los Productos
      // que coincidan con las etiquetas que se han pedido.
      return modo === 'AND'
        ? coincidencias.length === etiquetaFiltrada.length
        : coincidencias.length > 0;
    });
  
  /**
   * Cuenta cuántos productos tiene cada etiqueta
   * @returns - Devuelve cuantos productos tiene cada etiqueta
   */  
  // --> [...etiquetas]: (Convierte el set de etiquetas en un array)
  // Convertimos el set en un array para poder tener elementos duplicados,
  // ahora recorremos el array con un .reduce() y que nos devuevla las etiquetas.
  const contarEtiqueta = () =>
    [...etiquetas]
      .reduce((conteo, etiqueta) => {
        // Ahora el conteo lo hacemos un objeto y así en cada vuelta que se haga,
        // se le añade un nuevo elemento con la etiqueta y las veces que ha aparecido.
        conteo[etiqueta] = productos
          .filter(p => p.etiquetas.includes(etiqueta)).length;

        // Devuelve el objeto conteo  
        return conteo;
      }, {});

  /**
  * Busca las etiquetas populares
  * @returns - Devuelve las etiquetas más populares
  */  
  const etiquetasPopulares = () => {
    // Llama a la función contarEtiqueta()
    const conteo = contarEtiqueta();

    // Guarda solo los números del objeto "conteo"
    const cantidades = Object.values(conteo);

    // Busca el número más alto
    const max = Math.max(...cantidades);

    // Solamente devuelve las etiquetas que han aparecido las mismas
    // veces que la cantidad máxima.
    return Object.keys(conteo).filter(etiqueta => conteo[etiqueta] === max);
  };

  // Devolver todo:

  return {
    etiquetas,
    agregarEtiqueta,
    eliminarEtiqueta,
    obtenerProductosConEtiqueta,
    etiquetasDisponibles,
    filtrarEtiquetas,
    contarEtiqueta,
    etiquetasPopulares
  };

}

const sistema = sistemaEtiquetas(productos);

sistema.agregarEtiqueta('ordenador');
sistema.eliminarEtiqueta('ordenador');

console.log('Productos con etiqueta "trabajo":', sistema.obtenerProductosConEtiqueta('trabajo'));

console.log('Todas las etiquetas:', sistema.etiquetasDisponibles());

console.log('Productos filtrados ["gaming","rgb"]:', sistema.filtrarEtiquetas(['gaming','rgb']));

console.log('Conteo de etiquetas:', sistema.contarEtiqueta());

console.log('Etiquetas populares:', sistema.etiquetasPopulares());
