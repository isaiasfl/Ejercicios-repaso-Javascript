const historialBusquedas = (() => {
  const STORAGE_KEY = 'historialBusquedas'; // Clave única para almacenar el historial en localStorage

  return {

    /**
     * @description Genera 60 búsquedas aleatorias con fechas aleatorias (años 2020-2024)
     * y las guarda en localStorage.
     */
    cargarHistorial: () => {
      const arrayBusquedas = [];

      for (let i = 0; i < 60; i++) {
        const busqueda = {
          id: i,
          termino: `Busqueda ${i + 1}`,
          fecha: new Date(
            2020 + Math.floor(Math.random() * 5),  // Año entre 2020 y 2024
            Math.floor(Math.random() * 12),        // Mes 0-11
            1 + Math.floor(Math.random() * 28),    // Día 1-28
            Math.floor(Math.random() * 24),        // Hora 0-23
            Math.floor(Math.random() * 60)         // Minuto 0-59
          ).toISOString(),
          favorito: false
        };
        arrayBusquedas.push(busqueda);
      }

      // Guardamos el historial en localStorage con manejo de errores
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(arrayBusquedas));
      } catch (error) {
        console.error('Error al guardar el historial en localStorage:', error);
      }
    },

    /**
     * @description Muestra el historial actual por consola.
     */
    mostrarHistorial: () => {
      console.log(historialBusquedas.obtenerHistorial());
    },

    /**
     * @description Agrega una nueva búsqueda al historial con el término dado.
     * @param {String} termino - Término de la búsqueda.
     */
    agregarBusqueda: (termino) => {
      const historial = historialBusquedas.obtenerHistorial();
      const maxId = historial.length > 0 ? Math.max(...historial.map(b => b.id)) : 0;

      const busqueda = {
        id: maxId + 1,
        termino: `${termino}`,
        fecha: new Date().toISOString(),
        favorito: false
      };

      // Intentamos guardar el nuevo historial en localStorage
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...historial, busqueda]));
      } catch (error) {
        console.error('Error al agregar una búsqueda al localStorage:', error);
      }

      historialBusquedas.mostrarHistorial();
    },

    /**
     * @description Devuelve el historial ordenado por fecha (más recientes primero),
     * limitado a los 50 últimos resultados.
     */
    obtenerHistorial: () => {
      const historial = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
      const historialOrdenado = historial.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
      return historialOrdenado.slice(0, 50);
    },

    /**
     * @description Elimina una búsqueda por su ID.
     * @param {Number} id - ID de la búsqueda a eliminar.
     */
    eliminarBusqueda: (id) => {
      const historial = historialBusquedas.obtenerHistorial();
      const nuevoHistorial = historial.filter(b => b.id !== id);

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nuevoHistorial));
      } catch (error) {
        console.error(`Error al eliminar la búsqueda con ID ${id}:`, error);
      }

      historialBusquedas.mostrarHistorial();
    },

    /**
     * @description Limpia completamente el historial (borra del localStorage).
     */
    limpiarHistorial: () => {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (error) {
        console.error('Error al limpiar el historial del localStorage:', error);
      }

      historialBusquedas.mostrarHistorial();
    },

    /**
     * @description Busca un término en el historial e imprime coincidencias por consola.
     * @param {String} termino - Término o parte del término a buscar.
     */
    buscarEnHistorial: (termino) => {
      const historial = historialBusquedas.obtenerHistorial();
      console.log(
        historial.filter(b => b.termino.toLowerCase().includes(termino.toLowerCase()))
      );
    },

    /**
     * @description Marca o desmarca una búsqueda como favorita según su ID.
     * @param {Number} id - ID de la búsqueda a modificar.
     */
    marcarFavorito: (id) => {
      const historial = historialBusquedas.obtenerHistorial();

      const actualizado = historial.map(b =>
        b.id === id ? { ...b, favorito: !b.favorito } : b
      );

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(actualizado));
      } catch (error) {
        console.error(`Error al marcar como favorito la búsqueda con ID ${id}:`, error);
      }

      historialBusquedas.mostrarHistorial();
    },

    /**
     * @description Calcula las analíticas del historial (Top 5 términos más buscados).
     * Devuelve un array con los términos más frecuentes y su última fecha.
     */
    obtenerAnaliticas: () => {
      const historial = historialBusquedas.obtenerHistorial();
      const conteo = {};

      historial.forEach(b => {
        const termino = b.termino.toLowerCase();

        if (!conteo[termino]) {
          conteo[termino] = { count: 0, ultimaFecha: b.fecha };
        }

        conteo[termino].count++;
        if (new Date(b.fecha) > new Date(conteo[termino].ultimaFecha)) {
          conteo[termino].ultimaFecha = b.fecha;
        }
      });
      // En caso de empate se usara la busqueda mas reciente
      const top = Object.entries(conteo)
        .sort((a, b) => {
          if (b[1].count === a[1].count) {
            return new Date(b[1].ultimaFecha) - new Date(a[1].ultimaFecha);
          }
          return b[1].count - a[1].count;
        })
        .slice(0, 5)
        .map(([termino, data]) => ({
          termino,
          vecesBuscado: data.count,
          ultimaFecha: data.ultimaFecha
        }));

      console.log(top);
      return top;
    },

    /**
     * @description Agrupa búsquedas cuyo término contenga el texto indicado.
     * @param {String} termino - Subcadena a buscar dentro de los términos.
     */
    agrupar: (termino) => {
      const historial = historialBusquedas.obtenerHistorial();
      const historialAgrupado = historial.filter(busqueda =>
        busqueda.termino.toLowerCase().includes(termino.toLowerCase())
      );
      console.log(historialAgrupado);
    },

    /**
     * @description Función de prueba que ejecuta todo el flujo del módulo.
     */
    test: () => {
      historialBusquedas.cargarHistorial();
      historialBusquedas.agregarBusqueda('Nueva');
      historialBusquedas.buscarEnHistorial('Nueva');
      historialBusquedas.agrupar('sq');
      historialBusquedas.eliminarBusqueda(59);
      historialBusquedas.obtenerAnaliticas();
      historialBusquedas.limpiarHistorial();
    }
  };
})();

export default historialBusquedas;
