# Imagen base con Node.js actualizado para compatibilidad con Vite
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:22

# Establecemos el directorio de trabajo
WORKDIR /app

# Instalamos herramientas adicionales
RUN apt-get update && apt-get install -y \
    git \
    curl \
    nano \
    sudo \
    && rm -rf /var/lib/apt/lists/*

# Instalamos Vite globalmente
RUN npm install -g vite@latest

# Dar permisos sobre /app al usuario con UID 1000 (sea cual sea)
RUN chown -R 1000:1000 /app

# Configuración para el entorno de desarrollo
ENV NODE_ENV=development

# Cambiar al usuario con UID 1000
USER 1000