# Etapa 1: Build de la app
FROM node:20-alpine AS builder

WORKDIR /app

# Instalar PNPM
RUN npm install -g pnpm

# Copiar dependencias e instalar
COPY pnpm-lock.yaml ./
COPY package.json ./
RUN pnpm install

# Copiar el resto del código
COPY . .

# Compilar el frontend
RUN pnpm run build

# Etapa 2: Servir la app
FROM node:20-alpine

WORKDIR /app

# Instalar PNPM
RUN npm install -g pnpm

# Copiar el build del frontend
COPY --from=builder /app ./

# Exponer el puerto de Next.js
EXPOSE 3000

# Iniciar la app (modo producción)
CMD ["pnpm", "start"]