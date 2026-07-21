# 🚀 Impulsa – Plataforma de Voluntariado

Impulsa es una plataforma web que conecta voluntarios con organizaciones, facilitando la búsqueda y gestión de oportunidades de voluntariado de forma simple y personalizada.

Proyecto capstone desarrollado por **Maria Jesus Badilla** (frontend) y **Matias Gonzalez** (backend).

---

## 📋 Tabla de contenidos

- [Descripción](#-descripción)
- [Funcionalidades](#-funcionalidades)
- [Tecnologías](#️-tecnologías)
- [Arquitectura](#️-arquitectura)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Endpoints principales](#-endpoints-principales)
- [Instalación y uso local](#-instalación-y-uso-local)
- [Equipo](#-equipo)

---

## 📌 Descripción

El objetivo del proyecto es reducir la brecha entre personas que desean ayudar y organizaciones que necesitan apoyo. La plataforma permite a los usuarios registrarse como voluntarios u organizaciones, publicar y postular a actividades de voluntariado, recibir recomendaciones personalizadas, generar diplomas de participación, y gestionar pagos/donaciones.

---

## 🧩 Funcionalidades

- Registro y login diferenciado para **voluntarios** y **organizaciones** (JWT + cookies)
- Creación, edición y eliminación de perfiles (con foto)
- Publicación, edición y eliminación de actividades de voluntariado (con carga de imágenes)
- Postulación de voluntarios a actividades, y gestión de postulantes por parte de la organización
- Sistema de recomendaciones de actividades según intereses del voluntario
- Chatbot de asistencia (integrado con la API de OpenAI, con manejo de hilos de conversación)
- Generación de diplomas de participación en PDF
- Sistema de reportes (creación, revisión y resolución)
- Integración de pagos/donaciones con **Mercado Pago** (orden, webhook, estados de éxito/fallo/pendiente)
- Envío de notificaciones por correo (Nodemailer)
- Panel de administración de reportes

---

## ⚙️ Tecnologías

**Frontend** (`impulsa/`)
- React 18 + React Router DOM
- Material UI (MUI) y React Bootstrap para componentes de interfaz
- Axios para llamadas a la API
- JWT-decode + js-cookie para manejo de sesión
- Markdown-to-jsx (para renderizar respuestas del chatbot)

**Backend**
- Node.js + Express
- PostgreSQL (vía `pg`)
- Autenticación con JWT (`jsonwebtoken`) y hash de contraseñas con `bcrypt`
- Multer para carga de archivos/imágenes
- OpenAI API para el chatbot
- Mercado Pago SDK para pagos
- PDFKit para generación de diplomas
- Nodemailer para envío de correos
- Morgan para logging de requests
- dotenv para variables de entorno

---

## 🏗️ Arquitectura

```
Frontend (React, puerto 3000)
        │  axios (REST)
        ▼
Backend (Express, puerto 4000)
        │
        ├── PostgreSQL (pg)
        ├── OpenAI API (chatbot)
        ├── Mercado Pago (pagos)
        ├── Nodemailer (emails)
        └── PDFKit (diplomas)
```

El backend expone la API REST en el puerto `4000` y tiene CORS configurado para aceptar peticiones desde el frontend en `http://localhost:3000`.

---

## 📁 Estructura del proyecto

Este repositorio está dividido en dos ramas principales:

- **`RamaMajo`** → Frontend (React)
- **`RamaMatias`** → Backend (Node.js/Express)

### Frontend (`impulsa/src/`)
```
src/
├── components/       # Navbar, Footer, BotonChatbot, ProtectedRoutes
└── pages/
    ├── HomePage/     # Landing page (Header, Carrusel, Destacados, Nosotros)
    ├── Login/
    ├── Registro/
    ├── Perfil/       # Perfil de voluntario, recomendaciones, postulaciones
    ├── Actividades/  # Detalle y listado de actividades
    ├── Organizacion/ # Registro, login, perfil y gestión de actividades
    └── Admin/        # Reportes
```

### Backend (`src/`)
```
src/
├── controllers/       # Lógica de negocio por recurso
├── routes/            # Definición de endpoints por recurso
├── middlewares/        # AuthMiddleware (JWT)
├── services/           # email.services.js, diploma.services.js
├── uploads/             # Archivos e imágenes subidas
├── db.js                # Conexión a PostgreSQL (pool)
├── config.js             # Configuración central (env vars + cliente OpenAI)
└── index.js               # Punto de entrada del servidor Express
```

---

## 🔌 Endpoints principales

| Recurso | Endpoints |
|---|---|
| **Voluntarios** | `GET/POST/PUT/DELETE /voluntarios`, `POST /voluntarios/login`, `GET /voluntario/actividades`, `POST /voluntario/recomendacion` |
| **Organizaciones** | `GET/POST/PUT/DELETE /organizaciones`, `POST /organizaciones/login`, `GET /organizaciones/perfil` |
| **Actividades** | `GET/POST/PUT/DELETE /actividades`, `GET /actividades/recomendacion`, `GET /actividades/random`, `POST /postular` |
| **Reportes** | `GET /verReportes`, `POST /crearReporte/:actividadId`, `DELETE /borrarReporte/:id`, `POST /reporte/decidir` |
| **Diplomas** | `GET /diploma/:voluntarioId/:actividadId`, `POST /diploma/habilitar` |
| **Pagos** | `POST /createOrder`, `POST /webhook`, `POST /success` \| `/failure` \| `/pending` |
| **Chatbot** | `POST /thread`, `POST /message` |

> La mayoría de las rutas de escritura/edición están protegidas por middleware de autenticación (`authVoluntarioMiddleware` / `authOrganizacionMiddleware`).

---

## 🛠️ Instalación y uso local

### Requisitos previos
- [Node.js](https://nodejs.org/) v18+
- [PostgreSQL](https://www.postgresql.org/) corriendo localmente
- Una API key de [OpenAI](https://platform.openai.com/) (para el chatbot)
- Credenciales de [Mercado Pago](https://www.mercadopago.com/developers) (para pagos)

### Backend

```bash
git clone -b RamaMatias https://github.com/shafiuwu/Capstone.git backend
cd backend
npm install
```

Crea un archivo `.env` en la raíz del backend con tus propias credenciales (**nunca subas este archivo a GitHub**):

```
user = <usuario_postgres>
password = <password_postgres>
host = localhost
port = 5432
database = ImpulsaDB

SECRET_TOKEN_KEY = <clave_secreta_para_jwt>

SECRET_CHATGPT_KEY = <tu_api_key_de_openai>
ASSISTANT_ID = <id_de_tu_assistant_de_openai>
```

Levanta el servidor:
```bash
npm run dev
```
El backend correrá en `http://localhost:4000`.

### Frontend

```bash
git clone -b RamaMajo https://github.com/shafiuwu/Capstone.git frontend
cd frontend/impulsa
npm install
npm start
```
El frontend correrá en `http://localhost:3000` y se conectará automáticamente al backend en el puerto `4000`.

---


