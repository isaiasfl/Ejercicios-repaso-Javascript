//EJERCICIO 11
//importamos lo que nos haga falta
import { usuarios } from '../../db/data';

//Creamos las funciones que usemos:

/**
 * Esta función guarda un usuario pasado como parámetro en localStorage
 * @param {Object} usuario - objeto que representa un usuario
 */
//primero se pone lo que debe hacer, las comprobaciones se harán a posteriori
export const guardarUsuario = (usuario) =>{
  localStorage.setItem('usuario', JSON.stringify(usuario));
  usuarios.push(usuario);
};

/**
 * Esta función recibe un id de usuario como parámetro, y la función devolverá todos los datos de ese usuario si la id existe.
 * @param {number} id - parámetro que nos indica el usuario que queremos recuperar del localStorage
 * @returns los datos del usuario con el id pasado como parámetro
 */
export const obtenerUsuario = (id) =>{
  return id === usuarios.id ? localStorage.getItem('usuario') : null;
};

/**
 * Esta función recibe un id y unos datos de usuario como parámetros y la función debe actualizar el usuario con el id pasado con los datos
 * recibidos como parámetros en LocalStorage 
 * @param {number} id - un numero identificativo de cada usuario
 * @param {Object} datos - los campos que se quieran modificar del usuario
 */
export const actualizarUsuario = (id, datos) =>{
  
};

/**
 * 
 * @param {number} id - un numero identificativo de cada usuario
 */
export const eliminarUsuario = (id) =>{

};

/**
 * Esta función solo devuelve una lista de todos los usuarios que hay almacenados en localStorage
 * @returns un listado de todos los usuarios.
 */
export const listarUsuarios = () =>{
  return usuarios;
};