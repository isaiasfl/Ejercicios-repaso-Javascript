module.exports = {
  // Entorno en el que se ejecutará el código
  env: {
    browser: true,      // Navegador web
    es2021: true,       // Características de ES2021
    node: true          // Node.js
  },
  
  // Configuración heredada de ESLint recomendada
  extends: [
    'eslint:recommended'
  ],
  
  // Parser que se utilizará para analizar el código
  parserOptions: {
    ecmaVersion: 'latest',  // Última versión de ECMAScript
    sourceType: 'module'    // Módulos ES
  },
  
  // Reglas personalizadas de ESLint
  rules: {
    // Forzar el uso de punto y coma al final de las sentencias
    'semi': ['error', 'always'],
    
    // Forzar el uso de comillas simples
    'quotes': ['error', 'single'],
    
    // Forzar el uso de 2 espacios para indentación
    'indent': ['error', 2],
    
    // Evitar variables no utilizadas
    'no-unused-vars': 'warn',
    
    // Forzar el uso de === en lugar de ==
    'eqeqeq': 'error',
    
    // Evitar console.log en producción (advertencia)
    'no-console': 'warn'
  }
}