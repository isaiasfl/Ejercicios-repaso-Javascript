

/**
 * Lógica principal de la aplicación
 * Este archivo contiene la inicialización y configuración global
 */

import { tablaDatos } from './helpers/ejercicio-17/ejercicio-17.js';
import { usuarios } from './db/data.js';

// Función de inicialización
export function initializeApp() {
  console.log('🚀 Inicializando aplicación...\n');

  // Inicializamos el sistema de tablas
  const tabla = tablaDatos();

  // Ejecutamos la demostración del ejercicio 17
  tabla.demostracionEjercicio17(usuarios);
}

