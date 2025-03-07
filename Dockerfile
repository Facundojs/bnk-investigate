FROM node:16-alpine

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de dependencias y los instala
COPY package*.json ./
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Expone el puerto en el que corre la app
EXPOSE 3000

# Ejecuta la aplicación en modo desarrollo usando nodemon
CMD ["npm", "run", "dev"]
