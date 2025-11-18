# 🌐 Yuyariy – Plataforma de Lectura Crítica y Compara de Noticias

![Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Frontend](https://img.shields.io/badge/frontend-React%20PWA-green)
![Backend](https://img.shields.io/badge/backend-Node.js%20%7C%20Express-orange)

---

## 📖 Descripción del Proyecto
**Yuyariy** es una plataforma digital innovadora que fomenta la **lectura crítica** y ayuda a **reducir el sesgo de confirmación** en los usuarios.  

El sistema está compuesto por:  
- **Frontend** desarrollado como PWA con React.  
- **Backend** con API REST en Node.js para gestión, análisis y comparación de noticias.  

---

## ✨ Funcionalidades principales

### 📱 Frontend
- Interfaz web responsiva y accesible.  
- Visualización y comparación de noticias entre medios.  
- Integración con API backend para análisis de sesgo.  
- Diccionario contextual para términos complejos.  
- Preguntas de reflexión al final de cada noticia.  
- Sistema de alertas y notificaciones personalizadas.  
- Modo offline con opción de **“guardar para después”**.  

### ⚙️ Backend
- Gestión de usuarios y autenticación con **JWT**.  
- Obtención y almacenamiento de noticias desde múltiples fuentes.  
- Análisis de sesgo político mediante modelos de IA.  
- Comparación de coberturas de noticias sobre un mismo evento.  
- Clasificación automática de complejidad de lectura.  
- Diccionario contextual y sistema de preguntas de reflexión.  
- Soporte para alertas personalizadas y guardado de artículos.  

---

## 🛠️ Tecnologías Utilizadas

**Frontend**
- React + Vite  
- Tailwind CSS  
- React Router  
- Axios  
- PWA Support  

**Backend**
- Node.js + Express.js  
- MongoDB + Mongoose  
- JWT (autenticación)  
- Axios / Node Fetch (APIs externas)  
- CORS + Middlewares  
- Nodemon (desarrollo)  

---

## 📂 Estructura del Repositorio
```bash
YUYARIY/
├── .github/          # Workflows y configuraciones de GitHub Actions
├── config/           # Archivos de configuración global
│   └── .gitkeep
├── documents/        # Documentación del proyecto
├── src/              # Código fuente principal (frontend y backend integrados)
├── tests/            # Pruebas unitarias e integración
├── .gitignore        # Archivos y carpetas ignoradas por Git
└── README.md         # Este archivo
