import { usuarios } from '../../src/db/data';

/**
 * - Crea un Map donde la clave sea el id del usuario y el valor un Set con los permisos que tiene el usuario.
 * - Si el usuario está activo, tendrá los permisos 'leer' y 'editar'.
 * - Si el usuario no está activo, solo tendrá el permiso 'leer'.
 * - Devuelve un objeto con el Map y las funciones para gestionarlo.
 */
export const gestionarPermisos = () => {
  const map = new Map();
  // Inicializar permisos según si el usuario está activo o no
  usuarios.forEach(usuario => {
    const permisos = usuario.activo ? new Set(['leer', 'editar']) : new Set(['leer']);
    map.set(usuario.id, permisos);
  });

  if (map.size === 0) {
    console.error('No hay usuarios para gestionar permisos.');
  }

  /**
   * - Agrega un permiso a un usuario si no lo tiene ya.
   * @param {number} idUsuario - ID del usuario  
   * @param {string} permiso - Permiso a agregar
   * @returns {Map<number, Set<string>>} - El Map actualizado
   */
  const agregarPermiso = (idUsuario, permiso) => {
    const id = Number(idUsuario);
    const permisoClean = permiso.trim().toLowerCase();
    if (map.has(id)) {
      map.get(id).add(permisoClean);
      console.log(`Permiso '${permisoClean}' agregado al usuario con ID ${id}.`);
    } else {
      console.log(`El usuario con ID ${id} ya tiene el permiso '${permisoClean}'.`);
    }
    console.table(map);
    return map;
  };


  /**
   * Elimina un permiso a un usuario
   * @param {number} idUsuario - ID del usuario
   * @param {string} permiso - Permiso a eliminar
   * @returns {Map<number, Set<string>>} - El Map actualizado
   */
  const eliminarPermiso = (idUsuario, permiso) => {
    const id = Number(idUsuario);
    const permisoClean = permiso.trim().toLowerCase();
    if (map.has(id)){
      map.get(id).delete(permisoClean);
      console.log(`Permiso '${permisoClean}' eliminado del usuario con ID ${id}.`);
    }
    console.table(map);
    return map;
  };

  /**
   * Verifica si un usuario tiene un permiso
   * @param {number} idUsuario - ID del usuario
   * @param {string} permiso - Permiso a verificar
   * @returns {boolean} - true si tiene el permiso, false si no lo tiene
   */
  const tienePermiso = (idUsuario, permiso) => {
    const id = Number(idUsuario);
    const permisoClean = permiso.trim().toLowerCase();
    if(map.has(id) && map.get(id).has(permisoClean)){
      console.log(`El usuario con ID ${id} tiene el permiso '${permisoClean}'.`);
      return true;
    }
    console.log(`El usuario con ID ${id} NO tiene el permiso '${permisoClean}'.`);
    return false; // Devuelve true si el map contiene el id como clave y esa clave contiene el permiso
  };

  /**
   * Devuelve un array con los ids de usuarios que tienen un permiso específico
   * @param {string} permiso - Permiso a verificar
   * @returns {number[]} - Array con los ids de usuarios que tienen el permiso
   */
  const usuariosConPermiso = (permiso) => {
    const permisoClean = permiso.trim().toLowerCase();
    const resultado = [];
    map.forEach((permisosSet, id) => {
      if (permisosSet.has(permisoClean)) {
        resultado.push(id);
      }
    });
    console.log(resultado);
    return resultado;
  };


  // FUNCIONES EXTRA
   
  // Crear una función para crear roles predefinidos de permisos
  const rolesPredefinidos = () => {
    return {
      admin: ['leer', 'editar', 'eliminar', 'crear'],
      editor: ['leer', 'editar', 'crear'],
      lector: ['leer']
    };
  };
  
  // Crear una funcion que asigne roles a multiples usuarios a la vez
  /**
   * - Asigna un rol predefinido a múltiples usuarios
   * @param {Array<number>} idsUsuarios - Array con los IDs de los usuarios
   * @param {string} role - El rol a asignar ('admin', 'editor', 'lector')
   * @returns {Map<number, Set<string>>} - El Map actualizado
   */
  const asignarRolesAMultiplesUsuarios = (idsUsuarios = [], role = 'lector') => {
    const roles = rolesPredefinidos();
    // Obtener los permisos del rol
    const permisosQueTieneElRol = roles[role];
    // Si el rol no existe, no hacer nada
    if (!permisosQueTieneElRol) {
      return map; // Si el rol no existe, devuelve el map sin cambios
    }
    idsUsuarios.forEach(idUsuario => {
      // Guardamos en una variable el id convertido a número
      const id = Number(idUsuario);
      if (map.has(id)) {
        //Recorremos los permisos del rol y los agregamos al usuario
        permisosQueTieneElRol.forEach(permiso => {
          map.get(id).add(permiso); // Agrega cada permiso del rol al usuario
        });
        console.log(`Rol '${role}' asignado al usuario con ID ${id}.`);
      }
    });
    console.table(map);
    return map;
  };

  // Generar un informe de permisos de todos los usuarios
  /**
   * Genera un informe con los permisos de todos los usuarios
   * @returns {Array<Object>} - Array de objetos con idUsuario y permisos
   */
  const generarInformeDePermisos = () => {
    const informe = [];
    map.forEach((permisos, id) => {
      informe.push({idUsuario: id, permisos: [...permisos] // Convierte el Set en un Array para facilitar la lectura
      });
    });
    console.table(informe);
    return informe;
  };

  // Aqui se Devuelve el objeto con el Map y las funciones para gestionarlo el map es simplemente la variable permisosMap
  return {
    map,
    agregarPermiso,
    eliminarPermiso,
    tienePermiso,
    usuariosConPermiso,
    asignarRolesAMultiplesUsuarios,
    generarInformeDePermisos
  };
};


export const demostracionEjercicio10 = () => {
  const sistemaPermisos = gestionarPermisos();

  console.log('===== 🟢 Agregar permiso \'eliminar\' al usuario 2 =====');
  sistemaPermisos.agregarPermiso(2, 'eliminar');

  console.log('\n===== 🔴 Eliminar permiso \'editar\' del usuario 1 =====');
  sistemaPermisos.eliminarPermiso(1, 'editar');

  console.log('\n===== 🔍 Verificar si el usuario 3 tiene permiso \'leer\' =====');
  sistemaPermisos.tienePermiso(3, 'leer');

  console.log('\n===== 👥 Listar usuarios con permiso \'editar\' =====');
  sistemaPermisos.usuariosConPermiso('editar');

  console.log('\n===== 🧩 Asignar rol \'admin\' a usuarios [1, 3] =====');
  sistemaPermisos.asignarRolesAMultiplesUsuarios([1, 3], 'admin');

  console.log('\n===== 📋 Generar informe final de permisos =====');
  sistemaPermisos.generarInformeDePermisos();
};




