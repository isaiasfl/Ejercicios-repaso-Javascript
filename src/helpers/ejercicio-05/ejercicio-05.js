
//-----------------------Filtrar Por Nivel Usuario

/**
 * Esta función te devuelve un array con los usuarios del mismo grupo de nivel
 * @param {object} arrayUsers Un array compuesto de usuarios
 * @param {String} nivel Es el nivel que tiene cada usuario
 * @returns {object} Retorna un Array de usuarios y los usuarios tendrán el nivel pedido
 */
export const filterByNivelUser = (arrayUsers, nivel) =>
  arrayUsers
    .filter((user) => user.nivel.toLowerCase() === nivel.toLowerCase());


//-----------------------Comparar Grupos

/**
 * Esta función te devuelve la media de puntos de cada grupo usuarios que son del mismo nivel
 * @param {object} arrayUsers Un array de usuarios
 * @returns {object} Devuelve los resultados de la media de cada grupo de nivel
 */
export const compareGroups = (arrayUsers) => {
  const niveles = ['básico', 'estándar', 'premium'];
  const resultado = niveles
    .map((nivel) => {
      const grupo = filterByNivelUser(arrayUsers, nivel);
      const puntosMedios = grupo
        .reduce((acc, usuario) => acc + usuario.puntos, 0) / grupo.length;
      return { nivel, puntosMedios };
    });
  return resultado;
};


//------------------------Usuarios destacados según criterio

/**
 * Esta función según el criterio (puntos, activos, premium, estándar, básico) que tu digas te da un array de usuarios que cumplan ese criterio
 * @param {object} arrayUsers Un array de usuarios
 * @param {String} criterio El criterio de como los quieres filtrar
 * @returns {object} Devuelve un array con los usuarios destacados según el criterio
 */
export function getFeaturedUsers(arrayUsers, criterio) {
  switch (criterio) {
  case 'puntos': {
    const puntosMax = Math
      .max(...arrayUsers
        .map((usuario) => usuario.puntos));
    return arrayUsers.filter((usuario) => usuario.puntos === puntosMax);
  }
  case 'activos':
    return arrayUsers.filter((usuario) => usuario.activo);

  case 'premium':
    return arrayUsers.filter((usuario) => usuario.nivel === 'premium');

  case 'estándar':
    return arrayUsers.filter((usuario) => usuario.nivel === 'estándar');

  case 'básico':
    return arrayUsers.filter((usuario) => usuario.nivel === 'básico');

  default:
    return [];
  }
}

//---------------------------Obtener estadísticas de los usuarios

/**
 * Esta función te devuelve un objeto con edadMedia, el usuario mas Mayor, el usuario mas Pequeño, cuantos usuarios hay por ciudad y el porcentaje de usuarios activos
 * @param {object} arrayUsers Array de usuarios
 * @returns {object} Devuelve un objeto con el resultado de cada estadística
 */
export const obtenerEstadisticasUsuarios = (arrayUsers) => {
  //edad Media
  const edadMedia = arrayUsers
    .reduce( (acc, usuario) => acc+usuario.edad, 0)/arrayUsers.length;

  //User mas mayor
  const usuarioMaxEdad = Math
    .max(...arrayUsers
      .map((usuario) => usuario.edad));
  const userMayor = arrayUsers.filter((usuario) => usuario.edad === usuarioMaxEdad);

  //User mas pequeño
  const usuarioMinEdad = Math
    .min(...arrayUsers
      .map((usuario) => usuario.edad));
  const userMenor = arrayUsers.filter((usuario) => usuario.edad === usuarioMinEdad);

  //cuantos usuarios hay por ciudad
  const ciudades = [...new Set(arrayUsers.map((usuario) => usuario.ciudad))];

  const numCiudad = ciudades
    .map( ciudad => arrayUsers
      .reduce((acc, usuario) => acc+(usuario.ciudad===ciudad?1:0) ,0));

  //Porcentaje de usuarios activos
  const usersActivos = getFeaturedUsers(arrayUsers, 'activos');
  const porcentaje = (usersActivos.length*100)/arrayUsers.length;

  return { edadMedia, userMayor, userMenor, numCiudad, porcentaje};
};
