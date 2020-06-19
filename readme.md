### API Resto

Esta es una API pensada para un delivery de comidas de un restaurante. La misma permite registrar nuevos clientes y que los mismos puedan hacer pedidos. También cuenta con un usuario Administrador el cual puede editar el estado de los pedidos, las comidas y los usuarios mismos.

## Comenzar!

Estas son las instrucciones para poder clonar el repositorio y luego configurarlo para poder usarlo en su máquina local.

### Prerequisitos

Tener instalado Node.js. Link: https://nodejs.org/en/
Tener instalado Postman, para poder hacer las peticiones HTTP. Link: https://www.postman.com/
Tener instalado un IDE, se recomienda VCode: https://code.visualstudio.com/download
Disponer de un gestor de Base de Datos MySQL como XAMPP, WAMMP, o cualquier otro, para poder crear una BD con MySQL.

### Descarga del repositorio

Clone y copiar la URL del repositorio de Github. Link:

Abrir la carpeta en la cual se desea descargar el repositorio con el IDE elegido, y luego en la terminal del IDE ejecutar el comando "git clone repo url", siendo url la url copiada desde el repositorio en Github.
Una vez finalizado, ejecutar el comando "npm install" para que se instalen todas las dependencias necesarias para que el proyecto funcione correctamente.

### Crear la base de datos. Iniciar los servidores

En la carpeta del repositorio ubicar el archivo "bd.sql" el cual se encuentra en la subcarpeta "bd". Copiar todo su contenido y ejecutarlo en el gestor de base de datos para crear la base de datos en su local. Luego iniciar el servidor de MySql.

Ubicar el archivo index.js en la carpeta config del proyecto, en el cual se deben editar el usuario, contraseña y puerto de la base de datos creada en su local, de lo contrario no podrá conectarse. Una vez editado este archivo iniciar también el proyecto con el corrando "npm start" desde la terminal del IDE.

### Peticiones HTTP

#### Registro de Usuarios: Post User

http://localhost:3000/users

Aclaraciones:
Role_id solo acepta valores 1 y 2, siendo 1 rol de administrador, y 2, usuario sin dicho rol.
Province_id solo acepta valores entre 1 y 3, siendo 1 Cordoba, 2 Santa Fe y 3 Buenos Aires.

#### Login: Get Login

http://localhost:3000/login

Esta ruta devuelve un objeto con un token:

{
"message": "Logged in successfully.",
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo1LCJuYW1lIjoiQWd1c3RpbmEiLCJsYXN0bmFtZSI6IlJvZHJpZ3VleiIsImVtYWlsIjoiYWd1czEyMzQ1NkBob3RtYWlsLmNvbSIsInJvbGVfaWQiOjIsImlhdCI6MTU4NTkzNDA5NH0.P91vvhKmZ7-YyZuLw7EDomHV8X8QverrAJNs1JMQHM8"
}

Dicho token debe enviarse en TODOS los demás endpoints de la API. Se lo envía desde el header con los valores:
"Authorization: bearer token",
siendo token el token que nos devolvió el login.

#### Usuarios ya disponibles

Usuarios de ejemplo ya disponibles en la api para testeo:

Usuario con rol de administrador:
{
"username": "admin",
"password": "Ad1023MinN"
}

Usuario sin rol de administrador:
{
"username": "agustiina",
"password": "408583922"
}

#### Rutas disponibles:

#### Rutas que no requieren autenticacion:

- Get Login
- Post Users.
- Get Products

#### Rutas que pueden acceder todos los usuarios registrados:

- Post Order

#### Rutas que pueden acceder usuarios con rol de administrador:

- Get Users
- Get User by ID
- Put User
- Delete User

- Get Product by ID
- Post Product
- Put Product
- Delete Product

- Get Orders
- Get Order by ID
- Update Order by ID (para editar el estado del pedido únicamente)
- Delete Order by ID

Para consultar el detalle de cada ruta visitar la documentacion de la API, en la cual se puede encontrar toda la información de cada una, ya sea los parámetros, ejemplos de objetos a enviar en el body y qué devuelve cada una.

Link: https://app.swaggerhub.com/apis/anagaetan/restoAPI/1#/default/
