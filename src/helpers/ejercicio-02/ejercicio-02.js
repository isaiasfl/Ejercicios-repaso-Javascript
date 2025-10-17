import { productos } from '../../db/data';

const demostracionEjercicio02 = (() =>{
  return {
    /**
     * La funcion coge la BD de Productos y la organiza por categorias y por 
     * numero de productos,precio medio, stock y valoracion de cada categoria
     * @returns {Array<Object>} - la BD de productos por Categorias
     */
    analizarProductosPorCategoria: () =>{
      const agrupacionCategorias = productos.reduce((grupo,producto) =>{
        const categoria = producto.categoría;
        if(!grupo[categoria]){
          grupo[categoria] = {
            'numeroProductos' : 0,
            'precioMedio' : 0,
            'stockTotal' : 0,
            'valoracionMedia' : 0,
          };
        }

        grupo[categoria].numeroProductos+=1;
        grupo[categoria].precioMedio+= producto.precio;
        grupo[categoria].stockTotal+=producto.stock;
        grupo[categoria].valoracionMedia+=producto.valoracion;
        return grupo;
      }, {});

      const resultado = Object.entries(agrupacionCategorias).map(([categoria, grupo]) =>({
        categoria,
        numeroProductos: grupo.numeroProductos,
        precioMedio: (grupo.precioMedio / grupo.numeroProductos),
        stockTotal: grupo.stockTotal,
        valoracionMedia: (grupo.valoracionMedia  / grupo.numeroProductos)
      }));
      return resultado;
      /*
      la Variable resultado debuelve esto:
      ┌─────────┬───────────────┬─────────────────┬────────────┬────────────┬────────────────┐
      │ (index) │   categoria   │ numeroProductos │ precioMedio│ stockTotal │ valoracionMedia│
      ├─────────┼───────────────┼─────────────────┼────────────┼────────────┼────────────────┤
      │    0    │ 'Electrónica' │        5        │   371.99   │    145     │     4.44       │
      │    1    │   'Muebles'   │        2        │   219.99   │     20     │     4.65       │
      │    2    │    'Hogar'    │        1        │    39.99   │     45     │     4.1        │
      └─────────┴───────────────┴─────────────────┴────────────┴────────────┴────────────────┘

      */

    },
    /**
     * Filtra las categorías según su stock o valoración media.
     * Muestra las que tienen poco stock o alta valoración.
     * 
     * @param {number} [stock=25] - Límite de stock.
     * @param {number} [valoracion=4.3] - Límite de valoración.
     * @returns {Array<Object>} Categorías que cumplen las condiciones.
     */
    filtrarCategoria: (stock = 25, valoracion = 4.3) =>{
      return demostracionEjercicio02.analizarProductosPorCategoria().filter((categoria) => categoria.stockTotal<stock || categoria.valoracionMedia>valoracion);
      /* Lo que devulve el return
      ┌─────────┬───────────────┬─────────────────┬────────────┬────────────┬────────────────┐
      │ (index) │   categoria   │ numeroProductos │ precioMedio│ stockTotal │ valoracionMedia│
      ├─────────┼───────────────┼─────────────────┼────────────┼────────────┼────────────────┤
      │    0    │ 'Electrónica' │        5        │   371.99   │    145     │     4.44       │
      │    1    │   'Muebles'   │        2        │   219.99   │     20     │     4.65       │
      └─────────┴───────────────┴─────────────────┴────────────┴────────────┴────────────────┘
      */
    },

    /**
     * Filtra las categorías con poco stock o baja valoración media.
     * 
     * @param {number} [stockBajo=25] - Límite máximo de stock.
     * @param {number} [valoracionBaja=4.3] - Límite máximo de valoración.
     * @returns {Array<Object>} Categorías que tienen bajo stock o baja valoración.
     */
    identificarCategoria: (stockBajo = 25, valoracionBaja = 4.3) =>{
      return demostracionEjercicio02.analizarProductosPorCategoria().filter((categoria) => categoria.stockTotal < stockBajo || categoria.valoracionMedia < valoracionBaja);
      /* Lo que devulve el return
      ┌─────────┬────────────┬─────────────────┬────────────┬────────────┬────────────────┐
      │ (index) │ categoria  │ numeroProductos │ precioMedio│ stockTotal │ valoracionMedia│
      ├─────────┼────────────┼─────────────────┼────────────┼────────────┼────────────────┤
      │    0    │ 'Muebles'  │        2        │   219.99   │     20     │     4.65       │
      │    1    │  'Hogar'   │        1        │    39.99   │     45     │     4.1        │
      └─────────┴────────────┴─────────────────┴────────────┴────────────┴────────────────┘
      */
    },
    /**
     * Ordena las categorías de productos según un criterio especificado.
     * 
     * @param {string} criterio - Criterio de orden: 'productos', 'precio', 'stock' o 'valoracion'.
     * @returns {Array<Object>} - Array de categorías ordenado de mayor a menor según el criterio.
     */
    ordenarPorCriterios: (criterio) =>{
      const copia = demostracionEjercicio02.analizarProductosPorCategoria();
      switch(criterio){
      case 'productos':
        return copia.sort((a,b) => b.numeroProductos - a.numeroProductos);
      case 'precio':
        return copia.sort((a,b) => b.precioMedio - a.precioMedio);
      case 'stock':
        return copia.sort((a,b) => b.stockTotal - a.stockTotal);
      case 'valoracion':
        return copia.sort((a,b) => b.valoracionMedia -a.valoracionMedia);
      default:
        console.error('Criterio no reconocido Se usará productos');
        return copia.sort((a,b) => b.numeroProductos - a.numeroProductos);
      }

      /* Lo que devulve el return en este caso si el criterio es stock
      ┌─────────┬───────────────┬─────────────────┬────────────┬────────────┬────────────────┐
      │ (index) │   categoria   │ numeroProductos │ precioMedio│ stockTotal │ valoracionMedia│
      ├─────────┼───────────────┼─────────────────┼────────────┼────────────┼────────────────┤
      │    0    │ 'Electrónica' │        5        │   371.99   │    145     │     4.44       │
      │    1    │    'Hogar'    │        1        │    39.99   │     45     │     4.1        │
      │    2    │   'Muebles'   │        2        │   219.99   │     20     │     4.65       │
      └─────────┴───────────────┴─────────────────┴────────────┴────────────┴────────────────┘
      */
    },

    test : () =>{
      console.table(demostracionEjercicio02.analizarProductosPorCategoria());
      console.table(demostracionEjercicio02.filtrarCategoria());
      console.table(demostracionEjercicio02.identificarCategoria());
      console.table(demostracionEjercicio02.ordenarPorCriterios('stock'));
    }
  };
})();

export default demostracionEjercicio02;