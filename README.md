# 🚀 DevContainer JavaScript + Vite + Tailwind CSS

Este proyecto proporciona un entorno de desarrollo completo con **DevContainer** para aplicaciones **JavaScript** utilizando **Vite** como herramienta de construcción y **Tailwind CSS** para estilos.

---

## 👨‍💻 Autor

**Isaías Fernández Lozano**

- 🐙 GitHub: [@isaiasfl](https://github.com/isaiasfl)
- 📧 Contacto: [ifernandez@ieshlanz.es](mailto:ifernandez@ieshlanz.es)

---

## 📋 Tabla de Contenidos

- [¿Qué es un DevContainer?](#-qué-es-un-devcontainer)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Requisitos Previos](#-requisitos-previos)
- [Configuración Inicial](#️-configuración-inicial)
- [Ejecutar el Proyecto](#️-ejecutar-el-proyecto)
- [Scripts Disponibles](#-scripts-disponibles)
- [Extensiones Incluidas](#-extensiones-incluidas)
- [Configuración de Puertos](#-configuración-de-puertos)
- [Características](#-características)
- [Solución de Problemas](#-solución-de-problemas)
- [Recursos Adicionales](#-recursos-adicionales)
- [Autor](#-autor)
- [Licencia](#-licencia)

---

## 🌟 ¿Qué es un DevContainer?

Un **DevContainer** (Contenedor de Desarrollo) es un entorno de desarrollo aislado que contiene todas las herramientas, configuraciones y dependencias necesarias para trabajar en un proyecto.

### Ventajas:

✅ **Consistencia**: Todos los desarrolladores tienen el mismo entorno  
✅ **Reproducibilidad**: Funciona igual en cualquier máquina  
✅ **Aislamiento**: No interfiere con otras instalaciones locales  
✅ **Portabilidad**: Fácil de compartir y configurar

---

## 📁 Estructura del Proyecto

```
DevContainer_hlanz/
├── .devcontainer/              # Configuración del contenedor
│   ├── Dockerfile              # Instrucciones para construir la imagen
│   └── devcontainer.json       # Configuración de VS Code
├── public/                     # Archivos estáticos
├── src/
│   ├── assets/                 # Imágenes, fuentes, iconos
│   ├── components/             # Componentes reutilizables
│   ├── db/                     # Datos locales, JSON, mocks
│   ├── helpers/                # Funciones utilitarias
│   ├── services/               # Llamadas a APIs
│   ├── styles/                 # CSS modular o global
│   ├── main.js                 # Punto de entrada
│   └── app.js                  # Lógica principal
├── .eslintrc.cjs               # Configuración de ESLint
├── .prettierrc                 # Configuración de Prettier
├── vite.config.js              # Configuración de Vite
├── package.json                # Dependencias y scripts
└── index.html                  # HTML principal
```

---

## 🔧 Requisitos Previos

Antes de comenzar, necesitas tener instalado:

1. **[Visual Studio Code](https://code.visualstudio.com/)** - Editor de código
2. **[Docker Desktop](https://www.docker.com/products/docker-desktop)** - Para ejecutar contenedores
3. **[Extensión Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)** para VS Code

---

## 🛠️ Configuración Inicial

### Paso 1: Clonar el Proyecto

```bash
git clone <URL_DEL_REPOSITORIO>
cd DevContainer-JavaScript-Vite-Tailwind
```

### Paso 2: Abrir en VS Code

```bash
code .
```

### Paso 3: Abrir en DevContainer

1. VS Code detectará la configuración del DevContainer
2. Aparecerá un mensaje: **"Reopen in Container"**
3. Haz clic en el botón
4. Espera a que se construya el contenedor (puede tardar varios minutos la primera vez)

> **Nota**: En la esquina inferior izquierda verás **"Dev Container: JavaScript + Vite"** cuando esté listo.

---

## 🏃‍♂️ Ejecutar el Proyecto

Una vez dentro del DevContainer:

```bash
npm run dev
```

El servidor de desarrollo estará disponible en:

🌐 **http://localhost:5175**

> **Importante**: El puerto por defecto es **5175** (mapeado desde el puerto interno 5173 del contenedor).

---

## 📝 Scripts Disponibles

| Script       | Comando           | Descripción                           |
| ------------ | ----------------- | ------------------------------------- |
| Desarrollo   | `npm run dev`     | Inicia el servidor de desarrollo      |
| Producción   | `npm run build`   | Construye el proyecto para producción |
| Vista previa | `npm run preview` | Previsualiza la versión de producción |
| Análisis     | `npm run lint`    | Ejecuta ESLint                        |
| Formato      | `npm run format`  | Formatea el código con Prettier       |

---

## 🎨 Extensiones Incluidas

Este DevContainer viene preconfigurado con las siguientes extensiones:

### 🔧 Desarrollo

- **ESLint** - Análisis de código y detección de errores
- **Prettier** - Formateo automático de código
- **Error Lens** - Muestra errores directamente en el código

### 🎯 Productividad

- **Auto Rename Tag** - Renombra etiquetas HTML automáticamente
- **Bracket Pair Colorizer 2** - Colorea pares de corchetes
- **Path Intellisense** - Autocompletado de rutas

### 🌐 Web

- **HTML CSS Support** - Soporte mejorado para CSS en HTML
- **Tailwind CSS IntelliSense** - Autocompletado para Tailwind
- **Live Server** - Servidor con recarga automática

### 🔀 Git

- **GitLens** - Funcionalidades avanzadas de Git

### 🔤 Otros

- **Spanish Language Pack** - Interfaz en español
- **ES7+ Snippets** - Fragmentos de código React/Redux
- **REST Client** - Cliente HTTP integrado

---

## 🔌 Configuración de Puertos

### Puerto por Defecto

El proyecto usa el puerto **5175** en tu máquina local, que mapea al puerto **5173** del contenedor.

### Cambiar el Puerto

Para usar un puerto diferente, modifica el archivo `.devcontainer/devcontainer.json`:

```json
{
  "appPort": ["TU_PUERTO:5173"],
  "forwardPorts": [5173]
}
```

Por ejemplo, para usar el puerto **3000**:

```json
{
  "appPort": ["3000:5173"],
  "forwardPorts": [5173]
}
```

Después, **reconstruye el contenedor**:

1. Presiona `Ctrl+Shift+P`
2. Selecciona **"Dev Containers: Rebuild Container"**

---

## 🎯 Características

### 🎨 Tailwind CSS v4

El proyecto incluye Tailwind CSS 4 preconfigurado:

```javascript
// Ya integrado en vite.config.js
import tailwindcss from '@tailwindcss/vite';
```

### ⚙️ Configuración de ESLint

- ✅ Punto y coma obligatorio
- ✅ Comillas simples
- ✅ Indentación de 2 espacios
- ✅ Prevención de variables no utilizadas
- ✅ Uso de `===` en lugar de `==`

### 🎨 Configuración de Prettier

- 2 espacios de indentación
- Comillas simples
- Punto y coma al final
- Límite de 80 caracteres por línea

### 🔗 Alias de Importación

Vite está configurado con alias para importaciones más limpias:

```javascript
import { utils } from '@/helpers/utils.js';
import { api } from '@services/api.js';
import Button from '@components/Button.js';
import styles from '@styles/main.css';
import logo from '@assets/logo.png';
```

### 🐳 Configuración Docker

El DevContainer incluye:

- Node.js 22
- Git, curl, nano
- Vite instalado globalmente
- Usuario `node` con permisos configurados
- Hot reload habilitado para desarrollo

---

## 🐛 Solución de Problemas

### El contenedor no se construye

1. ✅ Verifica que Docker Desktop esté ejecutándose
2. ✅ Asegúrate de tener espacio en disco suficiente
3. ✅ Reinicia Docker Desktop
4. ✅ Ejecuta: `Dev Containers: Rebuild Container`

### Las extensiones no se instalan

1. Cierra y reabre VS Code
2. Presiona `Ctrl+Shift+P`
3. Ejecuta: `Dev Containers: Rebuild Container`

### El servidor no se inicia

1. Verifica que el puerto 5175 no esté en uso
2. Ejecuta `npm install` dentro del contenedor
3. Revisa los logs en la terminal

### No puedo acceder a localhost:5175

1. Verifica que el servidor esté corriendo con `npm run dev`
2. Comprueba la configuración de puertos en `devcontainer.json`
3. Asegúrate de que `host: '0.0.0.0'` esté en `vite.config.js`

### Errores de permisos

Si encuentras errores de permisos al instalar dependencias, el DevContainer ejecutará automáticamente:

```bash
sudo chown -R node:node /workspaces/DevContainer_hlanz
```

---

## 📖 Recursos Adicionales

- 📚 [Documentación de Vite](https://vitejs.dev/)
- 🐳 [Documentación de Dev Containers](https://code.visualstudio.com/docs/devcontainers/containers)
- 🎨 [Tailwind CSS v4 Docs](https://tailwindcss.com/)
- 📖 [MDN Web Docs - JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript)
- 🔧 [ESLint Configuration](https://eslint.org/docs/latest/)

---

## 🤝 Contribuir

¿Quieres mejorar este proyecto?

1. 🍴 Haz un fork del repositorio
2. 🌿 Crea una rama para tus cambios: `git checkout -b feature/mejora`
3. 💾 Realiza tus cambios y haz commit: `git commit -m 'Añade nueva característica'`
4. 📤 Sube los cambios: `git push origin feature/mejora`
5. 🔀 Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la **Licencia MIT**. Consulta el archivo `LICENSE` para más información.

---

<div align="center">

### ⭐ Si este proyecto te ha sido útil, considera darle una estrella en GitHub ⭐

**Hecho con ❤️ para la comunidad de desarrollo**

</div>
