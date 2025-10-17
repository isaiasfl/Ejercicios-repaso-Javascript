/**
 * Lógica principal de la aplicación
 * Este archivo puede contener la inicialización y configuración global
 */
import sistemaRecomendaciones from './helpers/ejercicio-21/sistemaRecomendaciones';
// Función de inicialización
export function initializeApp() {
  console.log('Inicializando aplicación...');
  const { demostracionEjercicio21 } = sistemaRecomendaciones();
  demostracionEjercicio21();
  // Aquí puedes configurar el estado inicial de tu aplicación
  // Por ejemplo: variables globales, configuraciones, etc.
}
