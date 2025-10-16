import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

// Configuración de Vite para el proyecto
export default defineConfig({
  // Plugins de Vite
  plugins: [tailwindcss()],
  // Directorio raíz de los archivos del proyecto
  root: '.',

  // Directorio de salida para los archivos compilados
  build: {
    outDir: 'dist',
    // Genera source maps para facilitar la depuración
    sourcemap: true,
  },

  // Configuración del servidor de desarrollo
  server: {
    // Puerto en el que se ejecutará el servidor de desarrollo
    port: 5173,
    // Abre automáticamente el navegador al iniciar el servidor
    open: false,
    // Permite acceder al servidor desde otros dispositivos en la misma red
    host: '0.0.0.0',
    // Habilita hot reload en contenedores Docker
    watch: {
      usePolling: true,
    },
  },

  // Configuración de las rutas de los archivos
  resolve: {
    // Alias para facilitar las importaciones
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@helpers': '/src/helpers',
      '@services': '/src/services',
      '@styles': '/src/styles',
      '@assets': '/src/assets',
    },
  },
});
