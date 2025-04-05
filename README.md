
# 🚍 STGI-UCI - Sistema de Gestión del Transporte Interno UCI

STGIUC es una plataforma digital diseñada para optimizar y gestionar el transporte interno dentro de la Universidad de Ciencias Informáticas (UCI). Este sistema centraliza la administración de rutas, vehículos, conductores y solicitudes de transporte, mejorando la eficiencia y la experiencia de la comunidad universitaria.

🎯 Objetivos

✔ Automatizar la gestión de transporte interno.

✔ Optimizar rutas para reducir tiempos de espera y consumo de combustible.

✔ Facilitar la solicitud de servicios para estudiantes, profesores y trabajadores.

## 🛠Tech Stack

**Client:** Vue, TailwindCSS, Nuxt, Nuxtui

**Server:** NestJS, Postgres

## 📦Correr Localmente

Clonar el projecto

```bash
  git clone https://github.com/Angel-Mario/frontend-sgti
```

Ir al directorio del projecto

```bash
  cd frontend-sgti
```

Instalar dependencias

```bash
  bun install
```

Correr el servidor

```bash
  bun dev
```

Abrir el navegador en <http://localhost:3000>

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`VUE_APP_API_URL`
<http://localhost:3003/api>

`VUE_APP_DEFAULT_PAGE_SIZE`
10
