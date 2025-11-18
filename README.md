# 🌐 Yuyariy – Plataforma de Lectura Crítica y Comparación de Noticias

<div style="display: grid; grid-template-columns: 300px 1fr; gap: 30px; align-items: start;">

<!-- ÍNDICE LATERAL -->
<div style="position: sticky; top: 20px;">

## 📑 **ÍNDICE**

### **🚀 Inicio Rápido**
- [Descripción](#descripción)
- [Características](#características-principales)
- [Demo](#demo-rápida)

### **🛠️ Desarrollo**
- [Tecnologías](#tecnologías-utilizadas)
- [Instalación](#instalación)
- [Configuración](#configuración)

### **📚 Guías**
- [Estructura](#estructura-del-proyecto)
- [API](#api-rest)
- [Contribución](#contribución)

### **🔧 Soporte**
- [FAQ](#preguntas-frecuentes)
- [Soporte](#soporte)
- [Licencia](#licencia)

<br>
<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #007acc;">
<small>**💡 Tip:** Usa Ctrl+F para buscar en esta página</small>
</div>

</div>

<!-- CONTENIDO PRINCIPAL -->
<div>

![Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Frontend](https://img.shields.io/badge/frontend-React%20PWA-green)
![Backend](https://img.shields.io/badge/backend-Node.js%20%7C%20Express-orange)

## 📖 Descripción del Proyecto <a name="descripción"></a>

**Yuyariy** es una plataforma digital innovadora que fomenta la **lectura crítica** y ayuda a **reducir el sesgo de confirmación** en los usuarios.  

### 🎯 **Objetivos Clave**
- 🔍 **Comparación objetiva** de coberturas noticiosas
- 🧠 **Fomento del pensamiento crítico** mediante herramientas interactivas
- 📊 **Análisis de sesgos** mediante modelos de IA
- 🌐 **Accesibilidad** multiplataforma

**Arquitectura del Sistema:**
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend       │    │  Base de Datos  │
│   React PWA     │◄──►│   Node.js API    │◄──►│   MongoDB       │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

---

## ✨ Características Principales <a name="características-principales"></a>

### 📱 **Frontend**
- **🎨 Interfaz Adaptativa** - Diseño responsivo para todos los dispositivos
- **🔍 Comparador de Noticias** - Vista side-by-side de diferentes coberturas
- **📚 Diccionario Contextual** - Explicación de términos complejos en tiempo real
- **❓ Preguntas de Reflexión** - Cuestionarios críticos post-lectura
- **🔔 Sistema de Alertas** - Notificaciones personalizadas por temas
- **📴 Modo Offline** - Funcionalidad PWA completa

### ⚙️ **Backend**
- **🔐 Autenticación JWT** - Sistema seguro de usuarios
- **📰 Agregador de Noticias** - Múltiples fuentes en tiempo real
- **🤖 Análisis de IA** - Detección de sesgos y polarización
- **📊 Comparación Automática** - Algoritmos de matching de noticias
- **📈 Analytics** - Seguimiento de métricas de lectura

---

## 🎬 Demo Rápida <a name="demo-rápida"></a>

```bash
# Clonar y ejecutar demo
git clone https://github.com/yuyariy/platform.git
cd yuyariy
npm install && npm run dev
```

**Características de la demo:**
- ✅ Comparación de 2 noticias en tiempo real
- ✅ Análisis de sesgo automático
- ✅ Interfaz completamente funcional
- ✅ Datos de ejemplo incluidos

---

## 🛠️ Tecnologías Utilizadas <a name="tecnologías-utilizadas"></a>

### **Frontend**
```yaml
Framework: React 18 + Vite
Lenguaje: TypeScript
Estilos: Tailwind CSS
Routing: React Router v6
Estado: Redux Toolkit
PWA: Workbox
```

### **Backend**
```yaml
Runtime: Node.js 18+
Framework: Express.js
Base de Datos: MongoDB
Autenticación: JWT
APIs: REST
```

### **DevOps**
```yaml
Contenedores: Docker
CI/CD: GitHub Actions
Hosting: Vercel / Railway
Monitoring: Sentry
```

---

## 🚀 Instalación <a name="instalación"></a>

### **Prerrequisitos**
```bash
Node.js >= 18.0.0
MongoDB >= 5.0
npm >= 8.0
```

### **Instalación Paso a Paso**
```bash
# 1. Clonar repositorio
git clone https://github.com/yuyariy/platform.git
cd yuyariy

# 2. Instalar dependencias
npm run setup

# 3. Configurar entorno
cp .env.example .env
# Editar .env con tus configuraciones

# 4. Iniciar aplicación
npm run dev
```

**La aplicación estará disponible en:**
- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- API Docs: http://localhost:3001/api-docs

---

## ⚙️ Configuración <a name="configuración"></a>

### **Variables de Entorno Esenciales**
```env
# Backend
NODE_ENV=development
PORT=3001
MONGODB_URI=mongodb://localhost:27017/yuyariy
JWT_SECRET=tu_jwt_secret_super_seguro

# Frontend
VITE_API_URL=http://localhost:3001
VITE_APP_NAME=Yuyariy

# APIs Externas (Opcional)
NEWS_API_KEY=tu_clave_opcional
OPENAI_API_KEY=tu_clave_opcional
```

### **Comandos Útiles**
```bash
# Desarrollo
npm run dev              # Desarrollo completo
npm run dev:frontend     # Solo frontend
npm run dev:backend      # Solo backend

# Producción
npm run build           # Build de producción
npm start              # Iniciar producción

# Utilidades
npm run test           # Ejecutar tests
npm run lint           # Linter de código
```

---

## 📁 Estructura del Proyecto <a name="estructura-del-proyecto"></a>

```
yuyariy/
├── 🚀 apps/
│   ├── frontend/                 # Aplicación React PWA
│   │   ├── src/
│   │   │   ├── components/      # Componentes reutilizables
│   │   │   ├── pages/          # Páginas de la aplicación
│   │   │   ├── hooks/          # Custom React hooks
│   │   │   └── utils/          # Utilidades frontend
│   │   └── public/             # Assets estáticos
│   │
│   └── backend/                # API Node.js
│       ├── src/
│       │   ├── controllers/    # Lógica de endpoints
│       │   ├── models/         # Modelos de base de datos
│       │   ├── routes/         # Definición de rutas
│       │   ├── middleware/     # Middlewares personalizados
│       │   └── config/         # Configuraciones
│       └── tests/              # Tests del backend
│
├── 📦 packages/                # Paquetes compartidos
│   ├── ui/                    # Componentes UI compartidos
│   ├── utils/                 # Utilidades comunes
│   └── types/                 # Tipos TypeScript
│
└── 📚 docs/                   # Documentación
    ├── api/                   # Documentación API
    └── guides/                # Guías de usuario
```

---

## 🔌 API REST <a name="api-rest"></a>

### **Endpoints Principales**

#### 🔐 Autenticación
```http
POST   /api/auth/register     # Registrar usuario
POST   /api/auth/login        # Iniciar sesión
GET    /api/auth/me           # Obtener perfil
POST   /api/auth/refresh      # Refresh token
```

#### 📰 Noticias
```http
GET    /api/articles          # Listar noticias
GET    /api/articles/:id      # Obtener noticia específica
GET    /api/articles/compare  # Comparar noticias
POST   /api/articles/analyze  # Analizar sesgo
```

#### 👤 Usuario
```http
GET    /api/user/preferences  # Obtener preferencias
PUT    /api/user/preferences  # Actualizar preferencias
GET    /api/user/history      # Historial de lectura
```

### **Ejemplo de Uso API**
```javascript
// Comparar dos noticias
const response = await fetch('/api/articles/compare?article1=123&article2=456', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});

const comparisonData = await response.json();
console.log(comparisonData.similarityScore);
```

---

## 🤝 Contribución <a name="contribución"></a>

¡Las contribuciones son bienvenidas! Sigue estos pasos:

### **Proceso de Contribución**
1. **Fork** el proyecto
2. **Crea una rama** para tu feature:
   ```bash
   git checkout -b feature/nueva-caracteristica
   ```
3. **Commit** tus cambios:
   ```bash
   git commit -m 'feat: añadir nueva característica'
   ```
4. **Push** a la rama:
   ```bash
   git push origin feature/nueva-caracteristica
   ```
5. **Abre un Pull Request**

### **Guías de Estilo**
- 📝 Usa commits convencionales
- 🎨 Sigue el ESLint configurado
- ✅ Añade tests para nuevas features
- 📚 Actualiza la documentación

---

## ❓ Preguntas Frecuentes <a name="preguntas-frecuentes"></a>

### **🤔 ¿Cómo funciona el análisis de sesgo?**
Usamos modelos de ML para analizar el lenguaje y detectar patrones de sesgo político en el contenido.

### **🔒 ¿Es segura mi data?**
Sí, implementamos JWT, encryption y seguimos mejores prácticas de seguridad OWASP.

### **📱 ¿Funciona offline?**
Sí, es una PWA que funciona parcialmente sin conexión.

### **🌍 ¿Qué fuentes de noticias soportan?**
Actualmente soportamos +50 fuentes en español e inglés.

---

## 🆘 Soporte <a name="soporte"></a>

### **Canales de Ayuda**
- 📧 **Email**: soporte@yuyariy.com
- 💬 **Discord**: [Unirse al servidor](https://discord.gg/yuyariy)
- 🐛 **Issues**: [GitHub Issues](https://github.com/yuyariy/platform/issues)
- 📚 **Documentación**: [docs.yuyariy.com](https://docs.yuyariy.com)

### **Comunidad**
- 🌐 **Sitio Web**: https://yuyariy.com
- 🐦 **Twitter**: [@yuyariy_app](https://twitter.com/yuyariy_app)
- 💼 **LinkedIn**: [Yuyariy](https://linkedin.com/company/yuyariy)

---

## 📄 Licencia <a name="licencia"></a>

Este proyecto está bajo la **Licencia MIT** - ver el archivo [LICENSE](LICENSE) para más detalles.

```
MIT License
Copyright (c) 2024 Yuyariy
```

**Permisos:**
- ✅ Uso comercial
- ✅ Modificación
- ✅ Distribución
- ✅ Uso privado

**Condiciones:**
- 📝 Incluir licencia y copyright original

---

<div align="center">

### **🌟 ¡Gracias por usar Yuyariy!**

*Fomentando el pensamiento crítico a través de la comparación objetiva de noticias*

[**⭐ Danos una estrella en GitHub**] • [**🐛 Reportar un bug**] • [**💡 Sugerir una feature**]

</div>

</div>
</div>

<style>
/* Estilos para mejor visualización en GitHub */
@media (min-width: 768px) {
  .markdown-body {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 30px;
  }
}
</style>
