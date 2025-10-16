/**
 * Lógica principal de la aplicación
 * Este archivo puede contener la inicialización y configuración global
 */
import { analizarPatronesCompra, calcularSimilitudUsuarios } from './helpers/ejercicio-21/sistemaRecomendaciones';

// Función de inicialización
export function initializeApp() {
  analizarPatronesCompra();
  console.log(calcularSimilitudUsuarios(2,3));
  console.log('Inicializando aplicación...');
  // Aquí puedes configurar el estado inicial de tu aplicación
  // Por ejemplo: variables globales, configuraciones, etc.
}
