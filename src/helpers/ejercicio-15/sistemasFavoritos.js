import { usuarios, productos } from './data.js';

const favoritosUsuarios = [];
const favoritosProductos = [];

// Hacer un módulo, una funcion grande llamada sistemasFavoritos que tenga 
// dentro el resto de funciones y en la ultima línea antes del cierre 
// se pone un return con todas las funciones que incluyen
// para que luego el destructuring puedas sacar lo que quieras

export const sistemasFavoritos = () => {
    
  /**
 * Añadir un elemento a favoritos
 * @author // Rita Vicente Dominguez
 * @param {String} tipo 
 * @param {Number} id 
 * Devuelve en el array favoritos que correnda el favorito añadido
 */
  const agregarFavorito = (tipo = 'usuario', id=1) => {
    if (tipo === 'producto'){
      const producto = productos
        .find(p => p.id === id);
      favoritosProductos
        .push(producto);
      localStorage.setItem('favoritosProductos', JSON.stringify(favoritosProductos));
      console.log('Producto añadido: ', producto); 
    }else{
                                                           const usuario = usuarios
      .find(u => u.id === id);
    favoritosUsuarios
      .push(usuario);
    localStorage.setItem('favoritosUsuarios', JSON.stringify(favoritosUsuarios)); 
    console.log('Usuario añadido: ', usuario); 
    

  }
  
};
console.log(agregarFavorito('usuario', 1));
console.log(agregarFavorito('producto', 2));



const eliminarFavorito = (tipo, id) => {};
const esFavorito = (tipo, id) => {}; 
const obtenerFavoritos= (tipo) => {};
const obtenerFavortiosConDetalles = (tipo) => {};


};
 