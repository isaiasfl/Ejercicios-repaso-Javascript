import { pedidos } from '../../db/data.js';

//[x] 1. calcular el total de cada pedido
//[] 2. sumar los totales de todos los productos de cada pedido
//[x] 3. devuelva un array de objetos:
/**
 * {
  * idPedido: número,
  * total: número,
  * númeroProductos: número,
  * idUsuario: número
  * estado: string,
  * fecha: Date
 * }
 */



export const calcularTotalPedidos = () => {
  //calcular el total de cada pedido
  return pedidos.map(pedido => {
    const total = pedido.productos.reduce((acc, producto)=>{
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



console.group('Resumen de pedidos');
const resumenPedidos = calcularTotalPedidos();
const totalGeneral = resumenPedidos.reduce((acc, pedido) => acc + pedido.total, 0).toFixed(2);
console.table(resumenPedidos);
console.log('Total de todos los pedidos');
console.log(totalGeneral);
console.groupEnd();
