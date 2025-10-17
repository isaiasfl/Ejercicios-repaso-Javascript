//EJERCICIO 11
//importamos lo que nos haga falta mediante destructuring (solo necesito el array de usuarios)
import { usuarios } from '../../db/data';

//Usamos la clave para el LocalStorage
const key = usuarios;
/**
 * 
 * @returns Esta función devolverá todos los usuarios que haya en ese momento en el localStorage y en caso de que no haya nada,
 * devuelve un array vacío.
 */
export const obtenerUsuarios = () => localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];

/**
   * Esta función lo que hace es subir los usuarios que le pasemos como parámetro
   * @param {Object} usuarios - el array de usuarios que vamos a guardar en el localStorage
   */
export function guardarUsuarios(usuarios){
  localStorage.setItem(key, JSON.stringify(usuarios));
}

//Creamos las funciones que usaremos dentro del módulo:

const persistenciaUsuario = ()=>{
  
  /**
   * Esta función guarda un usuario pasado como parámetro en localStorage
   * @param {Object} usuario - objeto que representa un usuario
   */
  const guardarUsuario = (usuario) =>{
    try{
      validarUsuario(usuario);
      const usuarios = obtenerUsuarios();
      const posición = usuarios.findIndex(u => u.id === usuario.id);
      posición >= 0 ? usuarios[posición]= usuario : usuarios.push(usuario);
      guardarUsuarios(usuarios);
    }catch(error){
      return error.message;
    }
  };

  /**
   * Esta función recibe un id de usuario como parámetro, y la función devolverá todos los datos de ese usuario si la id existe.
   * @param {number} id - parámetro que nos indica el usuario que queremos recuperar del localStorage
   * @returns los datos del usuario con el id pasado como parámetro
   */
  const obtenerUsuario = (id) =>{
    const lista = obtenerUsuarios();
    const usuario = lista.find(u => u.id === id);
    return usuario || '';
  };

  /**
   * Esta función recibe un id y unos datos de usuario como parámetros y la función debe actualizar el usuario con el id pasado con los datos
   * recibidos como parámetros en LocalStorage 
   * @param {number} id - un numero identificativo de cada usuario
   * @param {Object} datos - los campos que se quieran modificar del usuario
   */
  const actualizarUsuario = (id, datos) =>{
    const usuario = obtenerUsuario(id);
    if (!usuario) return;
    //En la variable actualizado se usa destructuring para separar los datos de los usuarios
    //y los datos que queremos modificar.
    const actualizado = { ...usuario, ...datos, id };
    guardarUsuario(actualizado);
  };

  /**
   * Esta función recibe el id de un usuario y lo borra del localStorage
   * @param {number} id - un numero identificativo de cada usuario
   */
  const eliminarUsuario = (id) =>{
    const listaNueva= obtenerUsuarios().filter(usuario=>usuario.id !== id);
    guardarUsuarios(listaNueva);
  };

  /**
   * Esta función solo devuelve una lista de todos los usuarios que hay almacenados en localStorage
   * @returns un listado de todos los usuarios almacenados.
   */
  function listarUsuarios (){
    const lista = obtenerUsuarios();
    return lista;
  }

  const demostracionEjercicio11 = () =>{
    console.table(listarUsuarios());
    guardarUsuario({
      id: 9,
      nombre: 'Pepe',
      apellidos: 'Pérez Pérez',
      email: 'pepe.perez@example.com',
      telefono: '555689741',
      edad: 27,
      ciudad: 'Jaén',
      pais: 'España',
      hobbies: ['lectura', 'programar', 'voleibol'],
      activo: true,
      fechaRegistro: new Date('2021-09-22'),
      avatar: 'https://picsum.photos/seed/user9/200/200.jpg',
      nivel: 'estándar',
      puntos: 1500
    });
    console.table(obtenerUsuario(9));
    actualizarUsuario(9,{activo: false});
    console.table(obtenerUsuarios());
    eliminarUsuario(9);
  };

  return {
    guardarUsuario,
    obtenerUsuario,
    actualizarUsuario,
    eliminarUsuario,
    listarUsuarios,
    demostracionEjercicio11
  };
};
export default persistenciaUsuario;

/**
 * Esta función valida los usuarios que reciba como parámetro, se usará sobre todo a la hora de añadir usuarios
 * al localStorage. Si no es válido, lanzará un error
 * @param {Object} usuario - el objeto usuario que se le pasa a la función para validar que es un usuario válido
 */
function validarUsuario(usuario){
  if(!usuario || typeof usuario.id !== 'number' || !usuario.nombre || !usuario.email) 
    throw new Error('El usuario no es válido. El usuario debe contener id, nombre y email');
}

//Exportar los datos en un JSON
export const exportJson = () => {
  const json = JSON.stringify(obtenerUsuarios());
  return json;
};

export const importarJson = (json) =>{
  try {
    const usuarios = JSON.parse(json);
    guardarUsuarios(usuarios);
  } catch (error) {
    throw new Error('Error al importar el JSON.');
  }
};