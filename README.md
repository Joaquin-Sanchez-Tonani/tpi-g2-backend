#  Clínica Médica - Backend

API REST desarrollada con **Node.js**, **Express** y **PostgreSQL**, encargada de gestionar la lógica de negocio, autenticación y conexión con la base de datos para la aplicación **Clínica Médica UTN**.  
Este repositorio funciona junto al [frontend](https://github.com/Joaquin-Sanchez-Tonani/tpi-g2-frontend).

---

##  Funcionalidades principales

- Registro e inicio de sesión de usuarios (pacientes, médicos y administradores).  
- Gestión de turnos médicos (creación, visualización, actualización).  
- Administración de especialidades.  
- Roles con distintos permisos (Paciente, Médico, Super Admin).  
- Autenticación mediante **JWT**.  
- Conexión y persistencia de datos con **PostgreSQL** usando **Sequelize ORM**.

---

## Tecnologías utilizadas

| Categoría | Tecnología |
|------------|-------------|
| **Lenguaje principal** | [Node.js](https://nodejs.org/) |
| **Framework web** | [Express.js](https://expressjs.com/) |
| **Base de datos** | [PostgreSQL](https://www.postgresql.org/) |
| **ORM** | [Sequelize](https://sequelize.org/) |
| **Autenticación** | JSON Web Tokens (JWT) |
| **Entorno** | dotenv |
| **Control de versiones** | Git + GitHub |

---

##  Entidades principales

| Entidad | Descripción |
|----------|-------------|
| **Usuarios** | Pacientes, médicos o administradores registrados en el sistema. |
| **Especialistas** | Médicos disponibles con su matrícula y especialidad. |
| **Especialidades** | Tipos de atención médica (cardiología, pediatría, etc.). |
| **Turnos** | Citas médicas con fecha, hora y médico asignado. |

---
## Endpoints principales
 ---
| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | /auth/register | Registro de usuario |
| POST | /auth/login | Inicio de sesión |
| GET  | /specialties | Obtener todas las especialidades |
| POST | /appointments | Crear nuevo turno |
| GET  | /appointments/:id | Consultar turnos de un usuario o médico |
| POST | /specialties/new | Crear nueva especialidad *(solo admin)* |
- - -
## Instalación y configuración

### Requisitos previos
- Node.js v18+  
- PostgreSQL  
- npm o yarn  


### Pasos

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/Joaquin-Sanchez-Tonani/tpi-g2-backend.git
   cd tpi-g2-backend
   npm install
   cd ./src 
  node .\app.js
  ```
2. **crear archivo .env**
```
DB_NAME=medical_clinic
DB_USER=postgres
DB_PASSWORD=tu_contraseña
DB_HOST=localhost
DB_PORT=5432
JWT_SECRET=tu_clave_secreta
PORT=3001
```
## Equipo de desarrollo:
  **Proyecto realizado por estudiantes de la Universidad Tecnológica Nacional (UTN):**
- Maximo Hahn
- Joaquin Sanchez
- Augusto Magi
- Ingrid Grolimound
