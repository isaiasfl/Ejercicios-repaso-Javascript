/**
 * ==============================================================================
 * Ejercicio 9: Cache de Resultados con Map (Sistema de Caching Genérico)
 * ==============================================================================
 */


//Importaciones
import { numeros } from '../../db/data.js';

//Funciones

/**
 * Función de orden superior que crea un sistema de caché.
 * Encapsula un Map y devuelve un objeto API para interactuar con el caché.
 * @returns {object} Un objeto con las funciones cacheFunction, getCache y clearCache.
 */
const crearCacheFunciones = () => {
  // Solo las funciones devueltas pueden acceder a él.
  const cache = new Map();

  /**
   * Envuelve una función para añadirle capacidades de caché (memoización).
   * @param {Function} fn - La función pura cuyos resultados se van a cachear.
   * @returns {Function} Una nueva función que utiliza el caché.
   */
  const cacheFunction = (fn) => {
    // Devuelve la nueva función "memoizada".
    return (...args) => {
      // 1. Generar una clave única a partir de los argumentos.
      // JSON.stringify es una forma sencilla de hacerlo para argumentos simples.
      const key = JSON.stringify(args);

      // 2. Comprobar si el resultado ya está en el caché.
      if (cache.has(key)) {
        // eslint-disable-next-line no-console
        console.log('Cache MISS:', key); // Cache MISS: El resultado no está en caché, se calcula por primera vez.
        return cache.get(key);
      }

      // 3. Si no esta, ejecutar la función original.
      // eslint-disable-next-line no-console
      console.log('Cache MISS:', key); // Fallo: El resultado no estaba, hay que calcularlo.
      
      const result = fn(...args); // Llama a la función original (ej: factorial) para calcular el resultado.

      // 4. Guardar el nuevo resultado en el caché.
      cache.set(key, result);

      // 5. Devolver el resultado calculado.
      return result;
    };
  };



  /**
   * Devuelve la instancia del Map del cache.
   * @returns {Map} El cache interno.
   */
  const getCache = () => cache;

  /**
   * Limpia completamente el cache.
   */
  const clearCache = () => {
    cache.clear();
    // eslint-disable-next-line no-console
    console.log('Caché limpiado.');
  };

  // Devuelve el objeto API con las funciones para interactuar con el cache.
  return {
    cacheFunction,
    getCache,
    clearCache,
  };
};


/**
 * Mide y muestra el tiempo de ejecución de una función.
 * @param {string} nombrePrueba - El nombre de la prueba a mostrar.
 * @param {Function} funcionAEjecutar - La función cuyo tiempo se medirá.
 */
const medirTiempo = (nombrePrueba, funcionAEjecutar) => {
  // eslint-disable-next-line no-console
  console.log(`\n--- ${nombrePrueba} ---`);
  const startTime = performance.now();
  const resultado = funcionAEjecutar();
  const endTime = performance.now();
  // eslint-disable-next-line no-console
  console.log(`Resultado: ${resultado}`);
  // eslint-disable-next-line no-console
  console.log(`Tiempo: ${endTime - startTime} ms.`);
};




/**
 * ============================================================================
 * APLICACIÓN Y PRUEBAS
 * ============================================================================
 */
const demostracionEjercicio09 = () => {
  // Definir  función ---
  const factorial = (n) => {
    if (typeof n !== 'number' || !Number.isInteger(n)) {
      return 'Solo se aceptan números enteros.';
    }
    if (n < 0) {
      return 'No se puede calcular el factorial de un número negativo.';
    }
    if (n === 0 || n === 1) return 1n;

    let resultado = 1n;
    for (let i = 2; i <= n; i++) {
      resultado *= BigInt(i);
    }
    return resultado;
  };

  // --- Pruebas con caché ilimitado ---

  console.log('PRUEBAS CON CACHÉ ILIMITADO');


  const cacheIlimitado = crearCacheFunciones();
  const factorialCacheado = cacheIlimitado.cacheFunction(factorial);

  medirTiempo('Factorial(20) - 1ª llamada (MISS)', () => factorialCacheado(20));
  medirTiempo('Factorial(20) - 2ª llamada (HIT)', () => factorialCacheado(20));

  // --- Pruebas con caché limitado ---

  console.log('PRUEBAS CON CACHÉ LIMITADO');

  const cacheLimitado = crearCacheFunciones({ maxSize: 3 });
  const factorialLimitado = cacheLimitado.cacheFunction(factorial);

  medirTiempo('Factorial(5)', () => factorialLimitado(5));
  medirTiempo('Factorial(6)', () => factorialLimitado(6));
  medirTiempo('Factorial(7)', () => factorialLimitado(7));

  console.log('\n--- Contenido del caché (lleno) ---');
  console.log(cacheLimitado.getCache());

  medirTiempo('Factorial(8) - Esto debería expulsar a Factorial(5)', () =>
    factorialLimitado(8)
  );

  console.log('\n--- Contenido del caché (después de expulsar) ---');
  console.log(cacheLimitado.getCache());

  medirTiempo('Factorial(5) - Debería ser MISS de nuevo', () =>
    factorialLimitado(5)
  );
};

// Exportación y ejecución
export default demostracionEjercicio09;
// eslint-disable-next-line no-console
demostracionEjercicio09();