import { productos } from '../../db/data.js';

const alto=40;
const medio=25;


const procesadorProductos=()=>
{ 
  /**
 * Crea un resumen de un producto especifico
 * @param {object} producto - Es un objeto que contiene un producto
 * @returns {object} - Resumen del producto { nombre, categoría ,precio,stock }
 */
  const generarResumenProducto=(producto)=>{
    const { nombre,categoría,precio,stock } = producto;
    const stockEtiquetado=stock>alto ? 'alto': stock>=medio ? 'medio': 'bajo';
    return { nombre, categoría, precio, stock:stockEtiquetado };
  };

  /**
 * Genera resúmenes para multiples productos
 * @param {Array} listaProductos - Array con productos
 * @returns {Array} -Array de productos resumidos { nombre, categoría ,precio,stock }
 */
  const generarResumenProductos=(listaProductos)=>{
    return listaProductos.map(producto=>generarResumenProducto(producto));
  };

  /**
 * Filtra productos segun diferentes criterios
 * @param {Array} productos - Array con productos
 * @param {object} filtros - Objeto con los filtros que se desean aplicar {categoria:"",rangMin:1,rangMax:2,disponibilidad:true}
 * @returns {Array} - Array de productos que cumples los filtros
 */
  const aplicarFiltros=(productos,filtros)=>{

    return productos.filter((producto)=>{
      const categoria=!filtros.categoria || producto.categoría === filtros.categoria; //True o false comprobando la categoria 

      const rango=(!filtros.rangMin || filtros.rangMin <= producto.precio ) && (!filtros.rangMax || filtros.rangMax>=producto.precio); //True o false comprobando el rango

      const disponibilidad=!filtros.disponibilidad || filtros.disponibilidad === (producto.stock>0); //True o false comprobando la disponibilidad

      return categoria && rango && disponibilidad;
    });
  };

  /**
 * Ordena productos segun diferentes criterios
 * @param {Array} productos - Array con productos
 * @param {string} criterio - Nombre del criterio pro el que se va a ordenar
 * @returns {Array} Array con productos ordenados segun el criterio
 */
  const ordenadorProductos=(productos,criterio)=>{
    return [...productos].sort((a,b)=>{
      if(typeof a[criterio] === 'string'){
        return a[criterio].localeCompare(b[criterio]);
      }else{
        return a[criterio]-b[criterio];
      }
    });
  };

  /**
 * Función de prueba para validar el correcto funcionamiento de los procesadores de productos
 * @returns {void}
 */
  const testProductos=()=>{
    console.log('================== Generar Resumen Producto ======================');
    console.log(generarResumenProducto({
      id: 105,
      nombre: 'Monitor 27" 4K',
      descripción: 'Monitor IPS 4K con 144Hz y compatibilidad HDR',
      categoría: 'Electrónica',
      precio: 329.99,
      precioAnterior: 399.99,
      stock: 20,
      valoracion: 4.8,
      numValoraciones: 156,
      etiquetas: ['pantalla', 'computación', 'gaming'],
      imagen: 'https://picsum.photos/seed/monitor/300/200.jpg',
      destacado: true,
      fechaLanzamiento: new Date('2023-04-12'),
      descuento: 18
    }));

    console.log('================== Generar Resumen Productos ======================');

    console.table(generarResumenProductos(productos));

    console.log('================== Aplicar Filtros ======================');

    console.table(aplicarFiltros(productos,{
      categoria: 'Electrónica',
      rangMin:300,
      rangMax:400,
      disponibilidad:true,
    }));

    console.log('================== Ordenar Productos ======================');

    console.table(ordenadorProductos(productos,'precio'));

  };

  return {
    generarResumenProducto,
    generarResumenProductos,
    aplicarFiltros,
    ordenadorProductos,
    testProductos
  };
};



export default procesadorProductos;





