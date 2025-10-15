# 🚀 Manual de Uso del Dev Container para Alumnos

---

## 👨‍💻 Autor

**Isaías Fernández Lozano**

- 🐙 GitHub: [@isaiasfl](https://github.com/isaiasfl)
- 📧 Contacto: [ifernandez@ieshlanz.es](mailto:ifernandez@ieshlanz.es)

---

## 📋 Tabla de Contenidos

- [🚀 Manual de Uso del Dev Container para Alumnos](#-manual-de-uso-del-dev-container-para-alumnos)
  - [👨‍💻 Autor](#-autor)
  - [📋 Tabla de Contenidos](#-tabla-de-contenidos)
  - [📋 ¿Qué es esto?](#-qué-es-esto)
  - [🔧 Requisitos Previos](#-requisitos-previos)
  - [🚀 Paso a Paso para Empezar](#-paso-a-paso-para-empezar)
    - [Paso 1: Descargar el Proyecto](#paso-1-descargar-el-proyecto)
    - [Paso 2: Abrir el Proyecto en Dev Container](#paso-2-abrir-el-proyecto-en-dev-container)
    - [Paso 3: Esperar la Configuración](#paso-3-esperar-la-configuración)
    - [Paso 4: Empezar a Programar](#paso-4-empezar-a-programar)
  - [📁 Estructura del Proyecto](#-estructura-del-proyecto)
  - [🎯 Comandos Importantes](#-comandos-importantes)
  - [💡 Flujo de Trabajo Diario](#-flujo-de-trabajo-diario)
    - [Cuando empiezas a programar:](#cuando-empiezas-a-programar)
    - [Cuando terminas de programar:](#cuando-terminas-de-programar)
    - [Cuando quieres seguir trabajando:](#cuando-quieres-seguir-trabajando)
  - [🔄 ¿Qué pasa detrás de cámaras?](#-qué-pasa-detrás-de-cámaras)
  - [✅ Ventajas de Trabajar Así](#-ventajas-de-trabajar-así)
  - [🐛 Problemas Comunes](#-problemas-comunes)
    - ["No me aparece el mensaje de Reopen in Container"](#no-me-aparece-el-mensaje-de-reopen-in-container)
    - ["El contenedor tarda mucho en construir"](#el-contenedor-tarda-mucho-en-construir)
    - ["El servidor no se inicia"](#el-servidor-no-se-inicia)
    - ["No puedo acceder a http://localhost:5175"](#no-puedo-acceder-a-httplocalhost5175)
  - [📤 Subir tu trabajo a GitHub](#-subir-tu-trabajo-a-github)
  - [🎉 ¡Felicidades!](#-felicidades)
  - [📚 Recursos Adicionales](#-recursos-adicionales)

---

## 📋 ¿Qué es esto?

Este es un entorno de desarrollo preconfigurado para aprender JavaScript con Vite. No necesitas instalar nada en tu ordenador, solo tener Docker y VS Code.

## 🔧 Requisitos Previos

1. **Docker Desktop** instalado y corriendo
   - Descarga desde: https://www.docker.com/products/docker-desktop/
   - Una vez instalado, asegúrate de que esté corriendo

2. **Visual Studio Code** instalado
   - Descarga desde: https://code.visualstudio.com/

3. **Extensión Dev Containers** en VS Code
   - Abre VS Code
   - Ve a Extensiones (Ctrl+Shift+X)
   - Busca "Dev Containers"
   - Instala la extensión de Microsoft

## 🚀 Paso a Paso para Empezar

### Paso 1: Descargar el Proyecto

1. Descarga el repositorio desde GitHub
2. Descomprime el archivo ZIP
3. Renombra la carpeta con el nombre de tu proyecto (ej: "mi-app-javascript")
4. Abre VS Code

### Paso 2: Abrir el Proyecto en Dev Container

1. En VS Code, ve a `Archivo > Abrir carpeta`
2. Selecciona tu carpeta renombrada
3. **VS Code detectará automáticamente el Dev Container** y mostrará un mensaje:
   - *"Reopen in Container"* (Reabrir en Contenedor)
   - Haz clic en ese botón
   - Si no aparece, abre la paleta de comandos (`Ctrl+Shift+P`), escribe `Dev Containers: Reopen in Container` y selecciónalo

### Paso 3: Esperar la Configuración

La primera vez puede tardar varios minutos. VS Code está:
- Descargando la imagen base de Node.js
- Instalando las dependencias del proyecto
- Configurando las extensiones

Verás en la esquina inferior izquierda un indicador verde que dice *"Dev Container: JavaScript + Vite"* cuando esté listo.

### Paso 4: Empezar a Programar

Una vez dentro del contenedor:

1. Abre la terminal en VS Code (`Ctrl+ñ` o `Terminal > New Terminal`)
2. Ejecuta el servidor de desarrollo:
   ```bash
   npm run dev
   ```
3. VS Code te preguntará si quieres abrir el navegador automáticamente
4. ¡Tu aplicación estará corriendo en http://localhost:5173!

## 📁 Estructura del Proyecto

```
DevContainer_hlanz/
├── .devcontainer/           # Configuración del contenedor
│   ├── Dockerfile          # Imagen Docker con Node.js y herramientas
│   └── devcontainer.json   # Configuración de VS Code y extensiones
├── src/
│   ├── assets/             # Para imágenes, fuentes, iconos...
│   ├── components/         # Componentes de UI reutilizables
│   ├── db/                 # Datos locales, JSON, mocks...
│   ├── helpers/            # Funciones utilitarias
│   ├── services/           # Llamadas a APIs, fetch...
│   ├── styles/             # CSS modular o global
│   ├── main.js             # Punto de entrada de la aplicación
│   └── app.js              # Lógica principal
├── .eslintrc.cjs           # Configuración de ESLint
├── .prettierrc             # Configuración de Prettier
├── vite.config.js          # Configuración de Vite
├── package.json            # Dependencias y scripts
├── index.html              # Archivo HTML principal
└── README.md               # Documentación para alumnos
```

## 🎯 Comandos Importantes

Dentro de la terminal del Dev Container:

```bash
# Iniciar el servidor de desarrollo
npm run dev

# Analizar el código en busca de errores
npm run lint

# Formatear el código automáticamente
npm run format

# Instalar nuevas dependencias
npm install nombre-del-paquete

# Instalar dependencias de desarrollo
npm install -D nombre-del-paquete
```

## 💡 Flujo de Trabajo Diario

### Cuando empiezas a programar:

1. Abre VS Code
2. Ve a `Archivo > Abrir carpeta reciente` y selecciona tu proyecto
3. VS Code te preguntará si quieres reabrir en contenedor
4. Haz clic en "Reopen in Container"
5. Abre la terminal y ejecuta `npm run dev`
6. ¡A programar!

### Cuando terminas de programar:

1. **Simplemente cierra VS Code** - ¡Eso es todo!
2. El contenedor se detendrá automáticamente
3. Tus cambios están guardados en tus archivos

### Cuando quieres seguir trabajando:

1. Abre VS Code
2. Abre tu proyecto
3. VS Code te preguntará si quieres reabrir en contenedor
4. ¡Listo para seguir programando!

## 🔄 ¿Qué pasa detrás de cámaras?

- **Tus archivos**: Están en tu ordenador, no dentro del contenedor
- **El servidor**: Corre dentro del contenedor
- **Las dependencias**: Se instalan dentro del contenedor, no en tu PC
- **VS Code**: Se conecta al contenedor y trabaja como si estuviera dentro

## ✅ Ventajas de Trabajar Así

1. **Cero configuración**: Todo funciona desde el primer día
2. **Entorno idéntico**: Todos los alumnos tienen el mismo entorno
3. **Sin conflictos**: Puedes tener múltiples proyectos con diferentes versiones
4. **Aislado**: Si algo falla, no afecta a tu ordenador
5. **Portable**: Funciona igual en Windows, Mac y Linux

## 🐛 Problemas Comunes

### "No me aparece el mensaje de Reopen in Container"

1. Asegúrate de que tienes la extensión Dev Containers instalada
2. Reinicia VS Code
3. Ve a `File > Preferences > Settings` y busca "dev container"
4. Asegúrate de que la opción esté activada

### "El contenedor tarda mucho en construir"

- Es normal la primera vez. La siguientes veces será mucho más rápido.
- Asegúrate de tener buena conexión a internet.

### "El servidor no se inicia"

1. Cierra la terminal y ábrela de nuevo
2. Ejecuta `npm install` para reinstalar dependencias
3. Vuelve a intentar `npm run dev`

### "No puedo acceder a http://localhost:5175"

1. Asegúrate de que el servidor esté corriendo (deberías ver "Local: http://localhost:5175/")
2. Prueba con otro navegador
3. Reinicia VS Code y vuelve a abrir el contenedor

## 📤 Subir tu trabajo a GitHub

1. Abre una terminal en VS Code
2. Ejecuta estos comandos:
   ```bash
   git add .
   git commit -m "Mi primer commit"
   git branch -M main
   git remote add origin URL_DE_TU_REPOSITORIO
   git push -u origin main
   ```
3. Cuando quieras subir cambios:
   ```bash
   git add .
   git commit -m "Descripción de tus cambios"
   git push
   ```

## 🎉 ¡Felicidades!

Ya estás listo para programar JavaScript con Vite sin preocuparte por configuraciones. ¡Solo enfócate en aprender a programar!

---

## 📚 Recursos Adicionales

- [Documentación de JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript)
- [Tutoriales de Vite](https://vitejs.dev/guide/)
- [Curso de JavaScript para principiantes](https://www.youtube.com/watch?v=W6NZfCO5SIk)