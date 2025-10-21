
// --- importaciones ---

import { productos } from '../../db/data.js';

/**
 * Función para gestionar el inventario de productos.
 * @returns {Object} Un objeto con métodos para gestionar el inventario.
 */
export function gestionarInventario(){
  const mapProductos= new Map(productos.map((producto)=> [producto.id,producto]));


  /**
   * Función para actualizar el stock de un producto.
   * @param {number} idProducto - el id del producto a actualizar.
   * @param {number} nuevaCantidad - La nueva cantidad de stock.
   */
  const actualizarStock = ((idProducto, nuevaCantidad) => {
    const producto = mapProductos.get(idProducto);
    if(producto){
      producto.stock = nuevaCantidad;
    }else{
      console.error('Producto no encontrado');
    }
  });



  /**
   * Función para obtener un producto por su ID.
   * @param {number} idProducto - el ID del producto a obtener
   */
  const obtenerProductoPorId = ((idProducto) => {
    const producto = mapProductos.get(idProducto);
    if(producto){
      return producto;
    }else{
      console.error('Producto no encontrado');
    }
  });



  /**
   * Devuelve un array con productos cuyo stock sea inferior al límite.
   * @param {number} limite - El límite de stock.
   * @return {Object} - Un array de productos con bajo stock.
   */
  const productosConBajoStock = ((limite) => {
    const arrayProductos = Array.from(mapProductos.values()).filter((producto)=> producto.stock < limite);
    return arrayProductos;
  });



  /**
   * Función que alerta si un producto tiene bajo stock
   * @param {number} idProducto - El id del producto a verificar.
   * @param {number} limite - El límite de stock.
   */
  const alertaBajoStock = ((idProducto,limite) => {
    const producto = mapProductos.get(idProducto);
    if(producto){
      if(producto.stock<limite){
        console.warn('Alerta: El producto con id ',idProducto,' tiene bajo stock.');
      }
    }else{
      console.error('Producto no encontrado');
    }
  });



  /**
   * Función que busca productos por nombre o categoría.
   * @param {string} termino - El nombre o categoría a buscar.
   * @return {Object} - Un array de productos que coinciden con la búsqueda.
   */
  const buscarProductos = ((termino)=>{
    const resultado = Array.from(mapProductos.values()).filter((producto) => (producto.nombre === termino || producto.categoría === termino) ? producto : null);
    return resultado;
  });



  /**
   * Función que guarda el inventario en el localStorage.
   */
  const guardarLocalStorage = (() =>{
    const jsonData = JSON.stringify(Array.from(mapProductos.entries()));
    localStorage.setItem('Inventario', jsonData);
  });
  
  

  /**
   * Función para la demostración de todas las funciones.
   */
  const demostracionEjercicio06 = (() => {
    const inventario = gestionarInventario();
    console.log(' --- Demostración Ejercicio 06 --- ');

    //Test función actualizarStock
    inventario.actualizarStock(101, 15);
    
    // test función obtenerProductoPorId
    console.log('Test función obtenerProductoPorId');
    console.log(inventario.obtenerProductoPorId(101));

    //test función productosConBajoStock
    console.log('Test función productosConBajoStock');
    console.log(inventario.productosConBajoStock(10));

    //test función alertaBajoStock
    console.log('Alerta función alertaBajoStock');
    inventario.alertaBajoStock(103,10);

    //test función buscarProductos
    console.log('Test función buscarProductos');
    console.log(inventario.buscarProductos('Electrónica'));

    // test función guardarLocalStorage
    inventario.guardarLocalStorage();
  });

  return {
    mapProductos,
    actualizarStock,
    obtenerProductoPorId,
    productosConBajoStock,
    alertaBajoStock,
    buscarProductos,
    guardarLocalStorage,
    demostracionEjercicio06
  };

}

