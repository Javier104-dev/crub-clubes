<h1 align='center'>Crud de clubes</h1>

### Introducción
Primer proyecto enfocado en la creación de un servidor API utilizando `Node.js` para almacenar y gestionar datos en formato `JSON`.

Este servidor sigue los principios de una API RESTful, lo que significa que utiliza las convenciones estándar de HTTP, como GET, POST, PUT y DELETE, para interactuar con los datos.

### Especificaciones
- Servidor: http://127.0.0.1:8080/clubes
- Versión: 1.0.0
- Autor: Javier Anibal Villca
- Repositorio GitHub: git+https://github.com/Javier104-dev/crud-clubes-backend.git

### Tecnologías utilizadas
- **Node.js v18.16.0:** Plataforma de ejecución de JavaScript del lado del servidor.
- **Express:** Framework web para Node.js, simplifica la creación de aplicaciones web y APIs.
- **ESLint:** Herramienta de linting para mantener un código JavaScript/Node.js consistente y legible.
- **Multer:** Middleware para gestionar la carga de archivos en aplicaciones web.
- **Dotenv:** Carga variables de entorno desde un archivo `.env` en la aplicación.
- **Nodemon:** Herramienta que reinicia automáticamente la aplicación Node.js cuando se detectan cambios en el código fuente.

### Características importantes
Este proyecto se centra en la creación de un servidor utilizando `Express`. Todos los datos consultados y almacenados se guardan en un archivo JSON, que actúa como una base de datos, el usuario puede comunicarse con el servidor mediante peticiones HTTP.

El proyecto sigue los principios de una `API RESTful`, lo que significa que utiliza las convenciones estándar de HTTP, como GET, POST, PUT y DELETE, para interactuar con los datos. Ejemplo: 
- La URLs para obtener datos o guardarlos es la misma `http://127.0.0.1:8080/clubes`, solo debe cambiar el tipo de método que se utilizara para cada petición (GET o POST).

<h1 align='center'>Estructura del proyecto</h1>

### Explicación de la arquitectura utilizada
El código del proyecto se diseñó siguiendo una `arquitectura de capas`, donde los roles y responsabilidades dentro de la aplicación (app) están separados. De esta forma el código se mantiene más modular, si se debe hacer algún cambio en la aplicación solamente se deberá ir y modificar la capa que sea necesaria, sin afectar a todo el código del proyecto.

Explicación de la estructura utilizada.

| Ruta                    | Explicación                                                                                                               |
| :---------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| src                     | Contiene toda nuestra aplicación                                                                                          |
| src/app.js              | Punto de entrada de nuestra aplicación                                                                                    |
| src/clubles             | Contiene la estructura de capas del módulo clubes                                                                         |
| src/clubles/controllers | Capa encargada de gestionar las solicitudes HTTP del proyecto                                                             |
| src/clubles/services    | Lógica de negocio de nuestra aplicación                                                                                   |
| src/clubles/model       | Contiene el archivo JSON y la lógica necesaria para interactuar con él.                                                   |
| src/clubles/routes      | Gestiona las rutas de acceso para cada endpoint del módulo                                                                |
| src/clubles/utilities   | Contiene funciones en común que se utilizan en todo el módulo                                                             |
| src/config              | Distribuye las variables de entorno provenientes del archivo `.env` y configura el `Middleware` para la carga de archivos |
| uploads                 | Aloja los imágenes cargadas al servidor                                                                                   |

<h1 align='center'>Métodos HTTP</h1>
