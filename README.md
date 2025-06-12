# GeoUser – Registro geográfico con verificación por correo

**GeoUser** es una aplicación web construida con Angular y Node.js que permite registrar usuarios con su ubicación geográfica jerárquica (país → departamento → ciudad → área → provincia). Incluye verificación de correo electrónico mediante envío de código, y almacenamiento de datos en una base de datos Oracle 11g.

---

## 🛠️ Tecnologías

### Frontend
- Angular 17+ (Standalone)
- Bootstrap 5 (con diseño responsivo y buenas prácticas UI/UX)
- TypeScript

### Backend
- Node.js (v18+)
- Express
- oracledb (con Oracle Instant Client)
- Nodemailer (con SendGrid)

### Base de Datos
- Oracle Database 11g
- Modelo jerárquico con `TIPOUBICA`, `UBICACION`, `"USER"`

---

## 📦 Requisitos previos

- Node.js `>=18`
- Angular CLI

```bash
npm install -g @angular/cli
````

* Oracle Database 11g corriendo localmente
* Oracle Instant Client instalado y agregado al PATH
* Archivo `.env` en el backend con las siguientes variables:

```env
ORACLE_CLIENT_PATH=C:\ruta\a\instantclient
SENDGRID_API_KEY=TU_CLAVE_API
MAIL_FROM=GeoUser <tu_correo@proveedor.com>
```

---

## 📁 Estructura del proyecto

```
GeoUser/
├── Backend/
│   ├── db.js
│   ├── mailer.js
│   ├── server.js
│   ├── .env
│   └── package.json
├── src/
│   ├── app/
│   │   ├── services/
│   │   ├── pages/
│   │   │   ├── home/
│   │   │   └── register-user/
│   ├── assets/
│   └── styles.css
└── angular.json
```

---

## ▶️ Cómo ejecutar

### Backend

1. Instala las dependencias:

```bash
cd Backend
npm install
```

2. Ejecuta el servidor:

```bash
node server.js
```

El servidor escuchará en: `http://localhost:3000`

> 🔒 El archivo `db.js` usa la cadena de conexión:
> `connectString: 'localhost:1521/XE'`

### Frontend

1. Instala dependencias:

```bash
npm install
```

2. Inicia el proyecto:

```bash
ng serve
```

Abre en el navegador: `http://localhost:4200`

---

## 💡 Funcionalidades

* Formulario reactivo para registrar usuarios
* Cascada de ubicación dependiente: país → depto → ciudad → área → provincia
* Validación de correo mediante envío de código (SendGrid)
* Inserción en tabla `"USER"` de Oracle
* Manejo jerárquico de ubicaciones (`UBICA_SUP`)
* Corrección automática de caracteres UTF-8 (ñ, á, é…)

---

## 🧪 Pruebas

* Puedes insertar datos de prueba en Oracle mediante scripts `INSERT`.
* Verifica jerarquías con:

  ```sql
  SELECT * FROM "UBICACION" WHERE "UBICA_SUP" = 'cod_padre';
  ```

---

## 📝 Notas

* Asegúrate de ejecutar Oracle y que el servicio esté escuchando en `localhost:1521` con nombre `XE`.
* El usuario de BD debe llamarse `INTERFAZ` con clave `123` (o la que configures).
* Se requiere conexión estable y variable `ORACLE_CLIENT_PATH` configurada correctamente.
