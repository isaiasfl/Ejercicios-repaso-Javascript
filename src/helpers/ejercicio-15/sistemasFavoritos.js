import { usuarios, productos } from '../../db/data.js';

let favoritosUsuarios = [];
let favoritosProductos = [];

export const sistemasFavoritos = () => {
    
  /**
 * Añadir un elemento a favoritos
 * @author Rita Vicente Dominguez
 * @param {String} tipo 
 * @param {Number} id 
 * @returns {Array} 
 * 
 */
  const agregarFavorito = (tipo = 'usuario', id=1) => {
    if (tipo === 'producto'){

      const producto = productos
        .find(p => p.id === id);
      if (!producto) {
        console.log(`No existe producto con id ${id}`);
        return;
      }
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
      if (!usuario) {
        console.log(`No existe usuario con id ${id}`);
        return;
      }
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
  

  /**
   * Eliminar un elemento de favoritos
  /**
   * @author Rita Vicente
   * @param {String} tipo 
   * @param {Number} id 
   * @returns {array}
   */

  const eliminarFavorito = (tipo = 'usuario', id= 1) => {
    if (tipo === 'producto'){
      const producto = productos
        .filter(p => p.id !== id);
      if (!producto) {
        console.log(`No existe producto con id ${id}`);
        return;
      }
      const fav = {
        tipo, 
        id, 
        fecha: new Date().toISOString()
      };
      localStorage.setItem('favoritosProductos', JSON.stringify(favoritosProductos));
      console.log(`Producto con id ${id} eliminado.`);
      
    }else{
      const usuario = usuarios
        .filter(u => u.id !== id);
      if (!usuario) {
        console.log(`No existe producto con id ${id}`);
        return;
      }
      const favU = {
        tipo, 
        id, 
        fecha: new Date().toISOString()
      };
      localStorage.setItem('favoritosUsuarios', JSON.stringify(favoritosUsuarios));
      console.log(`Usuario con id ${id} eliminado.`);

    }
  };

  /**
   * Comprueba si un elemento es favorito
   * @author Rita Vicente 
   * @param {String} tipo 
   * @param {Number} id 
   * @returns {Boolean}
   */
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
 

  /**
   * Devuelve todos los favoritos de un tipo
   * @author Rita Vicente
   * @param {String} tipo 
   * @returns {Array}
   * 
   */
  const obtenerFavoritos= (tipo= 'usuario') => {
    if (tipo === 'producto'){
      return favoritosProductos;
    }else{
      return favoritosUsuarios;
    }
  };
  

  /**
   * Devuelve los favoritos con todos los detalles
   * @author Rita Vicente
   * @param {String} tipo 
   * @returns {Array}
   */
  const obtenerFavoritosConDetalles = (tipo = 'usuario') => {
    if (tipo === 'producto'){
      return favoritosProductos
        .map(fav => {
          const producto = productos
            .find(p => p.id === fav.id);
          return {
            ...fav,
            ...producto,
          };
        });

    }else{
      return favoritosUsuarios.map(us => {
        const usuario = usuarios.find(u => u.id === us.id);
        return {
          ...us,
          ...usuario
        };
      });
    }  
  };
  

  /**
   * Filtrar favoritos por fecha de adición
   * @author Rita Vicente
   * @param {String} tipo 
   * @param {String} fecha 
   * @returns {Array}
   */
  const filtrarFavsDate = (tipo = 'usuario', fecha = new Date().toISOString().slice(0, 10 )) => {
    if (tipo === 'producto'){
      return favoritosProductos
        .filter(f => f.fecha.slice(0, 10) === fecha);
    }else{
      return favoritosUsuarios
        .filter(f => f.fecha.slice(0, 10) === fecha);

    }
  };
  


  /**
   * Buscar dentro de los favoritos
   * @author Rita Vicente
   * @param {String} tipo 
   * @param {String} texto 
   * @returns {String}
   */
  const buscarDentroFavorito = (tipo = 'usuario', texto = 'ana') => {
    const favsDetallados = obtenerFavoritosConDetalles(tipo);
    const palabra = texto.toLowerCase();
    return favsDetallados.filter(fav => {
      const datos = JSON.stringify(fav).toLowerCase();
      return datos.includes(palabra);
    });
     
  };
  


  /**
   * Crear colecciones personalizadas de favoritos
   * @author Rita Vicente
   * @param {String} tipo 
   * @param {String} nombre 
   * @param {Number} id 
   */
  const crearColecciones = (tipo, nombre, id) => {
    let lista;
  
    if (tipo === 'producto') {
      lista = favoritosProductos;
    } else {
      lista = favoritosUsuarios;
    }
    const favorito = lista.find(f => f.id === id);
    const coleccion = [];
    if (favorito) {
      coleccion.push(favorito);
    }
    console.log('Colección "' + nombre + '":', coleccion);
  };

  const demostracionEjercicio15 = () => {
    agregarFavorito('usuario', 1);
    agregarFavorito('producto', 102);
    console.log(agregarFavorito('producto', 103));
    console.log(eliminarFavorito('producto', 102));
    console.log(esFavorito('producto', 103)); 
    console.log(esFavorito('producto', 105));
    console.log(obtenerFavoritos('usuario'));
    console.log(obtenerFavoritosConDetalles('usuario'));
    console.log(filtrarFavsDate('usuario', '2022-01-15'));
    console.log(buscarDentroFavorito('usuario', 'ana'));
    console.log(filtrarFavsDate('usuario', '2025-10-17'));
    console.log(crearColecciones('producto', 'Productos favoritos', 102));
    

  };
  demostracionEjercicio15();

  return {agregarFavorito, eliminarFavorito, esFavorito, obtenerFavoritos, obtenerFavoritosConDetalles, filtrarFavsDate, buscarDentroFavorito, crearColecciones, demostracionEjercicio15};
};


