import { productos } from '../../db/data.js';

/**
 * Esta función agrega un producto al carrito de compras almacenado en el localStorage.
 * si el carrito no existe, inicializa el carrito como un array vacío.
 * @param {number} idProducto - Id del producto a agregar.
 * @param {number} cantidad - Cantidad del producto a agregar.
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

/**
 * Esta función vacía el carrito de compras.
 */
export const vaciarCarrito= () => {
  localStorage.setItem('carrito', JSON.stringify([]));
}

/**
 * Esta función obtiene el carrito de compras del localStorage.
 * @returns - El carrito de compras como un array de objetos.
 */
export const obtenerCarrito = () => {
  return JSON.parse(localStorage.getItem('carrito'));
}

/**
 * Esta función calcula el total del carrito de compras.
 * @returns - El total del carrito de compras.
 */
export const calcularTotal = () => {
  if(!localStorage.hasOwnProperty('carrito')){
    return 0;
  }
  const carrito = JSON.parse(localStorage.getItem('carrito'));
  return carrito.reduce((total, producto) => total + producto.subtotal, 0);
}

/**
 * Esta función aplica un código de descuento al total del carrito de compras.
 * @param {number} codigoDescuento 
 * @returns - El total del carrito de compras con el descuento aplicado.
 */
export const aplicarCodigoDescuento = (codigoDescuento) => {
  if(!localStorage.hasOwnProperty('carrito')){
    return 0;
  }
  if(typeof codigoDescuento !== 'number'){
    throw new Error('El código de descuento debe ser un número');
  }
  if(codigoDescuento !== 24214){
    throw new Error('Código de descuento inválido');
  }
  const carrito = JSON.parse(localStorage.getItem('carrito'));
  let total = carrito.reduce((total, producto) => total + producto.subtotal, 0);
  
  total = total * 0.12;

};

// calcular gastos de envio segun total
/**
 * Esta función calcula los gastos de envío del carrito de compras.
 * @returns - Retorna 0 si el total es mayor a 100, de lo contrario retorna 10.
 */
export const calcularGastosEnvio = () => {
  const total = calcularTotal();
  if(total > 100){
    return 0;
  }
  return 10;
}

/**
 * 
 * @returns 
 */
export const simularProcesoCheckout = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(calcularTotal());
    }, 1000);
  });
}

export const testEjercicio14 = () => {
  console.log('--- Ejercicio 14: Carrito de Compras ---');
  agregarProducto(101,3);
  agregarProducto(102,2);
  agregarProducto(103,1);
  agregarProducto(104,2);
  agregarProducto(105,1);

  eliminarProducto(103);

  actualizarCantidad(104,5);

  console.log(obtenerCarrito());
  console.log(calcularTotal());
}