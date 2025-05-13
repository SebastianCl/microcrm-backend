# Usa una imagen oficial de Node.js como imagen base (versión slim basada en Debian)
FROM node:20-slim

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia package.json y package-lock.json (si existe)
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos de la aplicación al directorio de trabajo
COPY . .

# Expone el puerto en el que la aplicación se ejecuta (asegúrate de que coincida con tu variable de entorno PORT)
EXPOSE 3000

# Comando para iniciar la aplicación
CMD [ "node", "src/index.js" ]