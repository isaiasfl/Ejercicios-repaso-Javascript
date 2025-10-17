import { pedidos } from '../../db/data.js';


/**
 * Main module for managing and analyzing orders.
 * Provides functions to calculate totals, commisions, statisticts
 * and apply filters on orders data.
 * @returns -all functions 
 */
const myModule = ()=>{

  //------ Main function ------
  /**
 * Calculates total amount of each order and returns an structured data of each
 * including de total amount of the order.
 * @returns {Array<Object>} Array of objects with order details:
   * - {number} idPedido - Unique order ID.
   * - {number} total - Total amount of the order (rounded to 2 decimals).
   * - {number} numeroProductos - Number of products in the order.
   * - {number} idUsuario - User ID who placed the order.
   * - {string} estado - Current order status.
   * - {string} fecha - Order date in local (es-ES) format.
 */
  const calcularTotalPedidos = () => {
    return pedidos
      .map(pedido => {
        const total = pedido.productos
          .reduce((acc, producto)=>{
            return acc + producto.cantidad * producto.precioUnitario;
          },0);

        return{
          idPedido: pedido.id,
          total: parseFloat(total.toFixed(2)),
          numeroProductos: pedido.productos.length,
          idUsuario: pedido.idUsuario,
          estado: pedido.estado,
          fecha: new Date(pedido.fecha).toLocaleDateString('es-ES')
        };
      });
  };



  //--------- Additional functions ------
  /**
 * Calculates commission for each order based on a given percentage.
 * @param {Array<Object>} pedidos 
 * @param {number} porcentaje 
 * @returns {Array<Object>} Array of objects containing:
   * - {number} idPedido - Order ID.
   * - {string} metodoPago - Payment method used.
   * - {number} comision - Calculated commission amount.
 */
  const calcularComisiones = (pedidos, porcentaje = 0.02) => {
    return pedidos
      .map(pedido => {
        const total = pedido.productos
          .reduce((acc, producto)=>{
            return acc + producto.cantidad * producto.precioUnitario;
          },0);

        return{
          idPedido: pedido.id,
          metodoPago: pedido.metodoPago,
          comision: parseFloat((total * porcentaje).toFixed(2))
        };
      });
  };

  /**
 * Generates monthly sales statistics based on the provided orders
 * @param {Array<Object>} pedidos -List of orders with calculated totals.
 * @returns {Object} An object where each key is a month and the value includes:
   * - {number} totalVentas - Total sales amount for that month.
   * - {number} cantidadPedidos - Number of orders in that month.
 */
  const ventasPorMes = (pedidos) => {
    const resumen = {};

    pedidos.forEach(pedido => {
      const mes = new Date(pedido.fecha).toLocaleDateString('es-ES');
      if (!resumen[mes]) resumen[mes] = { totalVentas: 0, cantidadPedidos: 0 };
      resumen[mes].totalVentas += pedido.total;
      resumen[mes].cantidadPedidos += 1;
    });

    return resumen;
  };

  /**
 * Filters orders based on a given range date.
 * @param {*} pedidos -Complete list of orders.
 * @param {*} estado -Order status to filter.
 * @param {*} fechaInicio -Start date of the range.
 * @param {*} fechaFin -End date of the range.
 * @returns {Array<Object>} Array of orders that match the given criteria.
 */
  const filtrarPedidos = (pedidos, estado, fechaInicio, fechaFin) => {
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);

    return pedidos.filter(pedido => {
      const fecha = new Date(pedido.fecha);
      return pedido.estado === estado &&
          fecha >= inicio &&
          fecha <= fin;
    
    });
  };

  /**
   * Compilation of function checks
   */
  const demostracionEjercicio04 = () => {
    console.group('Resumen de pedidos');
    const resumenPedidos = calcularTotalPedidos();
    const totalGeneral = resumenPedidos
      .reduce((acc, pedido) => acc + pedido.total, 0)
      .toFixed(2);
    console.table(resumenPedidos);
    console.log('Total de todos los pedidos:', totalGeneral, '€');
    console.groupEnd();

    console.group('Calcular comisiones por método de pago');
    console.table(calcularComisiones(pedidos));
    console.groupEnd();

    console.group('Obtener estadísticas de ventas por mes');
    console.log(ventasPorMes(resumenPedidos));
    console.groupEnd();

    console.group('Filtrar pedidos por estado y rango de fechas');
    console.table(filtrarPedidos(
      pedidos,
      'entregado',
      '2020-01-01',
      '2023-05-01'
    ));
    console.groupEnd();
  };


  //-------INICIALIZACIÓN DE LA APLICACIÓN--------
  demostracionEjercicio04();

  // Return all public functions
  return { calcularTotalPedidos, calcularComisiones, ventasPorMes, filtrarPedidos, demostracionEjercicio04 };

};


export default myModule;


