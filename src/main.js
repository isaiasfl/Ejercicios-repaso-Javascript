// Punto de entrada principal de la aplicación
// import './styles/main.css';
import { initializeApp } from './app';
import './styles/tailwind.css';
import { sistemasFavoritos } from './helpers/ejercicio-15/sistemasFavoritos.js';

// Esperamos a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});
window.favs = sistemasFavoritos();