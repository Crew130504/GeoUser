
# GeoUser Frontend

GeoUser es el frontend desarrollado en Angular para registrar usuarios con ubicación geográfica y verificación de correo electrónico. Este proyecto forma parte de una aplicación más amplia con base de datos Oracle en el backend.

## Tecnologías

- Angular 17+
- Bootstrap 5
- TypeScript
- Diseño Responsivo con buenas prácticas UI/UX

## Requisitos Previos

Antes de ejecutar este proyecto, asegúrate de tener instalado lo siguiente:

- Node.js (se recomienda versión 18 o superior)
- Angular CLI

Para instalar Angular CLI:

```bash
npm install -g @angular/cli
```

## Instalación

1. Clona el repositorio:

2. Instala las dependencias:

```bash
npm install
```

## Ejecutar el proyecto en desarrollo

Para iniciar el servidor de desarrollo:

```bash
ng serve
```

Luego abre el navegador en: http://localhost:4200/

El proyecto se recargará automáticamente si se modifica algún archivo fuente.

## Estructura del proyecto

```
src/
├── app/
│   ├── components/
│   ├── pages/
│   │   ├── home/
│   │   └── register-user/
│   └── app.routes.ts
├── assets/
│   └── images/
└── styles.css
```

## Notas

- Asegúrate de que la carpeta assets/ esté bien configurada en angular.json para que se carguen correctamente las imágenes estáticas.
- El diseño está optimizado tanto para escritorio como para dispositivos móviles.
- La página register-user está en desarrollo y será estilizada con la misma paleta y estructura visual.
