# 🌐 **Yuyariy – Plataforma de Lectura Crítica y Comparación de Noticias**

<p align="center">
  <img src="https://img.shields.io/badge/status-active-success.svg" />
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" />
  <img src="https://img.shields.io/badge/frontend-React%20PWA-green" />
  <img src="https://img.shields.io/badge/backend-Node.js%20|%20Express-orange" />
</p>

---

## 🔗 **📚 Documentación del Proyecto**
> Haz clic para acceder directamente

- 📜 **[Project Charter](https://docs.google.com/document/d/1fetiym4DaCeZJaXpc2FXTH_ScR8xobvNSGpG_GZkfN4/edit?usp=drive_link)**  
- 👥 **[Registro de Interesados](https://docs.google.com/document/d/1uSKaTId3K_ozNpNVGsbmFfjvk2IftWXFt62am4vE8ik/edit?usp=drive_link)**  
- 📝 **[Backlogs y Cronograma](https://docs.google.com/document/d/1BAQpXMP0R_1gbLk4rU80y2wvy8kx-WPm5R8XC0MsyYs/edit?usp=drive_link)**  
- 📊 **[Diagrama de Gantt](https://docs.google.com/document/d/1EsvkKkEXIblbFFjkYBFWUhE3OUAs1QMOlpfowsEcG0M/edit?usp=drive_link)**  
- 💰 **[Presupuesto](https://docs.google.com/document/d/1tElIcitd460KqO0iqEVKcNJSsdblnngeq0AwW_aiFj8/edit?usp=drive_link)**  
- ⚠️ **[Riesgos y Oportunidades](https://docs.google.com/document/d/1sABJGCHp7-Jd-Lgwpir-6uXpI9tcbBQpvLwJisHBh2Y/edit?usp=drive_link)**  
- 🌍 **[Página Web (PWA)](https://yuyariy-frontend.vercel.app/)**

---

# 📖 **Descripción General**

**Yuyariy** es una plataforma digital diseñada para mejorar la **lectura crítica**, combatir el **sesgo de confirmación** y fomentar un consumo responsable de noticias.

La plataforma analiza noticias de diferentes medios, presenta comparaciones objetivas e integra herramientas educativas como diccionarios contextuales y preguntas de reflexión.

---

# 🚀 **Componentes del Sistema**

- **Frontend:** React + Vite (PWA)  
- **Backend:** Node.js + Express + MongoDB  
- **Servicios IA:** Clasificación de sesgo y complejidad de lectura  

---

# ✨ **Funcionalidades Principales**

## 📱 **Frontend (PWA)**  
- Interfaz responsiva y accesible  
- Comparación de noticias por medio  
- Análisis de sesgo integrado  
- Diccionario contextual automático  
- Preguntas de reflexión  
- Notificaciones inteligentes  
- Modo offline + lectura guardada  
- Navegación con React Router  

## ⚙️ **Backend**  
- API REST para noticias, usuarios y análisis  
- Autenticación con JWT  
- Clasificación de sesgo política  
- Comparación entre artículos  
- Análisis de complejidad  
- Generación de preguntas de reflexión  
- Guardado de artículos  
- Integración con APIs externas  

---

# 🛠️ **Tecnologías Utilizadas**

## 🎨 Frontend  
- React + Vite  
- Tailwind CSS  
- Axios  
- React Router  
- Workbox (PWA)

## 🧩 Backend  
- Node.js + Express  
- MongoDB + Mongoose  
- JWT + Bcrypt  
- Axios / Fetch  
- CORS  
- Nodemon  

---

# 📂 **Estructura del Repositorio**

```bash
YUYARIY/
├── .github/              # Automatizaciones CI/CD
│   └── workflows/
├── config/               # Configuración del proyecto
│   └── .gitkeep
├── documents/            # Documentación
├── src/
│   ├── backend/          # API Node.js
│   ├── frontend/         # React PWA
│   └── shared/           # Código compartido
├── tests/                # Pruebas
└── .gitignore
