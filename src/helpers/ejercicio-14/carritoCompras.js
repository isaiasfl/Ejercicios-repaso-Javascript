import { productos } from '../../db/data.js';

/**
 * This function adds a product to the shopping cart stored in localStorage.
 * If the cart does not exist, it initializes it as an empty array.
 * It then finds the product by its id, calculates the subtotal based on the quantity,
 * @param {number} idProducto - Id of the product to add.
 * @param {number} cantidad - Quantity of the product to add.
 */
export const agregarProducto = (idProducto, cantidad=1) => {

  if(typeof idProducto !== 'number' || typeof cantidad !== 'number'){
    throw new Error('El id del producto y la cantidad deben ser números');
  }

  if(!localStorage.hasOwnProperty('carrito')){
    localStorage.setItem('carrito', JSON.stringify([]));
  }
  const carrito = JSON.parse(localStorage.getItem('carrito'));
  // guardar los datos concretos en el carrito (idProducto, nombre, precio, cantidad y subtotal)
  const producto = productos.find(p => p.id === idProducto);
  if(producto){
    const subtotal = producto.precio * cantidad;
    carrito.push({
      idProducto: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad,
      subtotal
    });
    localStorage.setItem('carrito', JSON.stringify(carrito));
  } else {
    console.error('Producto no encontrado');
  }
}

/**
 * Esta función elimina un producto del carrito de compras almacenado en el localStorage cuyo id se pasa como parámetro.
 * @param {number} idProducto -Id of the product to remove
 */
export const eliminarProducto = (idProducto) => {

  if(typeof idProducto !== 'number'){

    throw new Error('El id del producto debe ser un número');
  }
  if(!localStorage.hasOwnProperty('carrito')){

    throw new Error('El carrito está vacío');
  }

  const carrito = JSON.parse(localStorage.getItem('carrito'));
  const carritoActualizado = carrito.filter(product => product.idProducto !== idProducto);

  localStorage.setItem('carrito', JSON.stringify(carritoActualizado));
  
}

/**
 * Esta función actualiza la cantidad de un producto en el carrito.
 * @param {number} idProducto - Id del producto a modificar.
 * @param {number} nuevaCantidad - Cantidad nueva del producto.
 */
export const actualizarCantidad = (idProducto, nuevaCantidad) => {

  if(typeof idProducto !== 'number' || typeof nuevaCantidad !== 'number'){

    throw new Error('El id del producto y la nueva cantidad deben ser números');
  }
  if(!localStorage.hasOwnProperty('carrito')){
    
    throw new Error('El carrito está vacío');
  }

  const carrito = JSON.parse(localStorage.getItem('carrito'));
  const producto = carrito.find(product => product.id === idProducto);

  if(!producto){
    throw new Error('El objeto pasado no existe en el carrito');
  }

  producto.cantidad = nuevaCantidad;
  producto.subtotal = producto.precio * nuevaCantidad;

  localStorage.setItem('carrito', JSON.stringify(carrito));
}

export const vaciarCarrito= () => {
  localStorage.setItem('carrito', JSON.stringify([]));
}