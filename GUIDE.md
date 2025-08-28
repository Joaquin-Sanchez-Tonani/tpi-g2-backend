# 📂 Estructura del proyecto

Este backend está organizado en carpetas para mantener el código ordenado y fácil de escalar.  
A continuación se explica el rol de cada carpeta:

---

## 📁 config
Contiene la configuración general del proyecto, como la conexión a la base de datos o parámetros de entorno.  
Ejemplo: `db.js` para conectarse a MongoDB o MySQL.

---

## 📁 controllers
Son las funciones que manejan las peticiones de las rutas.  
Se encargan de recibir los datos del request y devolver la respuesta.  
Ejemplo: `userController.js` con métodos como `createUser` o `login`.

---

## 📁 routes
Define los endpoints de la API y a qué controller llaman.  
Ejemplo: en `userRoutes.js` se define `/users` y se asigna al `userController`.

---

## 📁 models
Aquí están los modelos de datos.  
Si se usa una base de datos SQL, son las tablas; si es Mongo, los esquemas de Mongoose.  
Ejemplo: `User.js` con los campos de un usuario.

---

## 📁 services
Contienen la lógica de negocio.  
Se usan para separar la parte “inteligente” del sistema de los controllers, que solo manejan requests/responses.  
Ejemplo: `paymentService.js` con la lógica de pagos.

---

## 📁 middlewares
Funciones que se ejecutan antes o después de llegar a los controllers.  
Sirven para validar, autenticar o transformar datos.  
Ejemplo: `authMiddleware.js` que verifica un token JWT.

---

## 📁 utils
Funciones de ayuda que se pueden reutilizar en cualquier parte del proyecto.  
Ejemplo: `dateFormatter.js` o `generateToken.js`.

---

## 📁 database
Scripts relacionados con la base de datos: migraciones, seeders y la conexión principal.  
Ejemplo: `index.js` para inicializar la conexión.

---

## 📁 tests
Pruebas unitarias e integrales del proyecto.  
Ejemplo: `user.test.js` para verificar que el registro de usuarios funciona correctamente.

---

## 📄 app.js / index.js
Punto de entrada de la aplicación.  
Aquí se inicializan middlewares globales, rutas y la conexión a la base de datos.

---

## 📄 .env
Archivo para variables de entorno (nunca subir al repo).  
Ejemplo: claves, credenciales y configuración sensible.

---

## 📄 package.json
Contiene la información del proyecto y las dependencias necesarias para correrlo.
