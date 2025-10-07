# Etapa 1: Construcción
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar archivos necesarios
COPY package*.json ./
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Compilar el proyecto (si aplica, por ejemplo con TypeScript)
RUN npm run build || echo "No build script found"

# Etapa 2: Ejecución
FROM node:20-alpine

WORKDIR /app

# Copiar solo los archivos necesarios desde la etapa anterior
COPY --from=builder /app ./

# Exponer el puerto (ajústalo si usas otro)
EXPOSE 3001

# Comando para ejecutar la app
CMD ["npm", "start"]
