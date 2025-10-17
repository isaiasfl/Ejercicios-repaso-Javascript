import { usuarios, productos, pedidos } from '../../db/data.js';

// Modulo que tiene todas las funciones
const dashboardDatos = (() => {
  /**
   * Funcion que nos muestra por consola, un resumen de los usuarios, diciendonos quienes son los que mas hobbies tienen
   * los que tienen el nivel premium y los usuarios con mas de 1000 puntos
   */
  function crearResumenUsuarios() {
    console.log('👥 Resumen de Usuarios');

    //Mostramos la informacion de todos los usuarios que nos importa, sus hobbies 
    const resumenUsuarios = usuarios.map(u => ({
      nombre: u.nombre,
      cantidadHobbies: u.hobbies.length,
      hobbies: u.hobbies.join(', '),
      nivel: u.nivel,
      puntos: u.puntos,
    }));

    console.table(resumenUsuarios);
    
    // Usuarios con más hobbies
    let maxHobbies = 0;
    let userMaxHobbies = [];
    usuarios.forEach(usuario => {
      if (usuario.hobbies.length > maxHobbies) {
        maxHobbies = usuario.hobbies.length;
        userMaxHobbies = [usuario.nombre];
      }
    });

    // Usuarios con nivel premium
    const usuariosPremium = usuarios
      .filter(usuario => usuario.nivel === 'premium')
      .map(usuario => usuario.nombre);

    // Usuarios con más de 1000 puntos
    const masMilPuntos = usuarios
      .filter(usuario => usuario.puntos >= 1000)
      .map(usuario => usuario.nombre);

    console.log('Usuarios con más hobbies:', userMaxHobbies);
    console.log('Usuarios Premium:', usuariosPremium);
    console.log('Usuarios con más de 1000 puntos:', masMilPuntos);
  }
  /**
   * Funcion que muestra por consola un resumen de productos, diciendonos cuantos productos hay por categoria
   * y el producto con mayor precio 
   */
  function crearResumenProductos() {
    console.log('📦 Resumen de Productos');

    // Contar productos por categoría
    const resumenCategorias = {};
    productos.forEach(producto => {
      resumenCategorias[producto.categoría] = (resumenCategorias[producto.categoría] || 0) + 1;
    });

    console.table(resumenCategorias);

    // Producto más caro
    const productoMasCaro = productos.reduce((max, producto) =>
      producto.precio > max.precio ? producto : max
    );

    console.log('💰 Producto más caro:', productoMasCaro.nombre, '-', productoMasCaro.precio, '€');
  }

  /**
   * Funcion que muestra por consola un resumen de los pedidos, detallandonos en que fase esta cada pedido.
   */
  function crearResumenPedidos() {
    console.log('🛒 Resumen de Pedidos');

    // Contar pedidos por estado
    const resumenEstados = {};
    pedidos.forEach(pedido => {
      resumenEstados[pedido.estado] = (resumenEstados[pedido.estado] || 0) + 1;
    });

    console.table(resumenEstados);
  }
  /**
   * Funcion la cual reinicia la consola y muestra los resúmenes actualizados de usuarios, productos y pedidos.
   */
  function actualizarDashboard() {
    console.clear();
    console.log('📊 Actualizando Dashboard de Datos...');
    crearResumenUsuarios();
    crearResumenProductos();
    crearResumenPedidos();
  }
  /**
 * 
 * @param {string} formato //Pasamos el formato en el que queremos exportar
 * Funcion a la que le pasamos un formato y convierte los datos de usuarios, productos, pedidos a ese formato
 */
  function exportarDatos(formato = 'json') {
    const datos = {
      usuarios,
      productos,
      pedidos
    };

    if (formato === 'json') {
      console.log('📤 Exportando datos en formato JSON:');
      console.log(JSON.stringify(datos));
    } else {
      console.log('⚠️ Formato no soportado:', formato);
    }
  }

  // Devolvemos las funciones
  return {
    crearResumenUsuarios,
    crearResumenProductos,
    crearResumenPedidos,
    actualizarDashboard,
    exportarDatos
  };
})(); 
/**
 * Funcion que ejecuta la aplicacion 
 */
export function demostracionEjercicio20(){
  console.log('=== 🧭 DASHBOARD DE DATOS ===');
  dashboardDatos.crearResumenUsuarios();
  dashboardDatos.crearResumenProductos();
  dashboardDatos.crearResumenPedidos();
}
export default dashboardDatos;
