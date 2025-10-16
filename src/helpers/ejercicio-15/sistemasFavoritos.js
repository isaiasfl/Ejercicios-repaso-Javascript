import { usuarios, productos } from './data.js';

let favoritosUsuarios = [];
let favoritosProductos = [];

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
      const fav = {
        tipo, 
        id, 
        fecha: new Date().toISOString()
      };
      favoritosProductos
        .push(fav);
      localStorage.setItem('favoritosProductos', JSON.stringify(favoritosProductos));
      console.log('Producto añadido: ', fav); 
    }else{
      const usuario = usuarios
        .find(u => u.id === id);
      const favU = {
        tipo, 
        id, 
        fecha: new Date().toISOString()
      };
      favoritosUsuarios
        .push(favU);
      localStorage.setItem('favoritosUsuarios', JSON.stringify(favoritosUsuarios)); 
      console.log('Usuario añadido: ', favU); 
    

    }
   
  };
  console.log(agregarFavorito('usuario', 1));
  console.log(agregarFavorito('producto', 2));



  const eliminarFavorito = (tipo = 'usuario', id= 1) => {
    if (tipo === 'producto'){
      const producto = productos
        .find(p => p.id !== id);
      const fav = {
        tipo, 
        id, 
        fecha: new Date().toISOString()
      };
      localStorage.setItem('favoritosProductos', JSON.stringify(favoritosProductos));
      console.log(`Producto con id ${id} eliminado.`);
      
    }

  };
  eliminarFavorito('producto', 2);


  const esFavorito = (tipo = 'usuario', id = 1) => {
    if (tipo === 'producto'){
      const ids = favoritosProductos
        .map(f => f.id);
      return ids.includes(id);
    }else{
      const ids = favoritosUsuarios
        .map(f => f.id);
      return ids.includes(id);
    }
  }; 
  console.log(esFavorito('producto', 2)); 
  console.log(esFavorito('producto', 5));


  const obtenerFavoritos= (tipo= 'usuario') => {
    if (tipo === 'producto'){
      return favoritosProductos;
    }else{
      return favoritosUsuarios;
    }
  };
  console.log(obtenerFavoritos('usuario'));


  const obtenerFavoritosConDetalles = (tipo = 'usuario') => {
    if (tipo === 'producto'){
      return favoritosProductos
        .map(p => {
          const producto = productos
            .find(p => p.id === p.id);
          return {
            ...p,
            ...producto,
          };
        });

    }else{
      return favoritosUsuarios.map(fav => {
        const usuario = usuarios.find(u => u.id === fav.id);
        return {
          ...fav,
          ...usuario
        };
      });
    }  
  };
  console.log(obtenerFavoritosConDetalles('usuario'));

  const filtrarFavsDate = (tipo = 'usuario', fecha = new Date().toISOString()) => {
    if (tipo === 'producto'){
      return favoritosProductos
        .filter(f => f.fecha === fecha);
    }else{
      return favoritosUsuarios
        .filter(f => f.fecha === fecha);

    }
  };
  console.log(filtrarFavsDate('usuario', '2022-01-15'));

  const buscarDentroFavorito = (tipo = 'usuario', texto = 'ana') => {
    const favsDetallados = obtenerFavoritosConDetalles(tipo);
    const palabra = texto.toLowerCase();
    return favsDetallados.filter(fav => {
      const datos = JSON.stringify(fav).toLowerCase();
      return datos.includes(palabra);
    });
     
  };
  console.log(buscarDentroFavorito('usuario', 'ana'));

  
};