# 🚀 Funbase API Template

Este repositorio fue creado para ayudar a los desarrolladores a crear una API RESTful utilizando **Express**, **Sequelize** y **Swagger**. El objetivo es proporcionar una base sólida y fácil de usar para nuevos desarrolladores que deseen crear una API desde cero.

## ✅ Requisitos previos

- 🟢 **Node.js**
- 🟢 **npm** o **yarn**
- 🟢 **MySQL**
- 🟢 **Postman** o cualquier cliente HTTP para probar la API
- 🟢 Conocimientos básicos de **JavaScript** y **Node.js**

## ⚙️ Instalación

```bash
npx create-fb-api <nombre-del-proyecto>
cd <nombre-del-proyecto>
```

Las dependencias se instalarán automáticamente. Si no lo hacen, puedes instalarlas manualmente ejecutando:

```bash
npm install
```

También puedes clonar el repositorio directamente y luego instalar las dependencias:

```bash
git clone https://github.com/tu-usuario/funbase-api-template.git
cd funbase-api-template
```

## 🗂️ Estructura del proyecto

```
📂 funbase-api-template
├── 📂 src
│   ├── 📂 config
│   │   └── 📄 index.js
│   ├── 📂 database
│   │   ├── 📂 migrations
│   │   │   └── 📄 index.js
│   │   └── 📄 sequelize.js
│   ├── 📂 middlewares
│   │   ├── 📄 authMiddleware.js
│   │   └── 📄 errorMiddleware.js
│   ├── 📂 modules
│   │   ├── 📂 Auth
│   │   │   ├── 📄 controller.js
│   │   │   └── 📄 routes.js
│   │   ├── 📂 Users
│   │   │   ├── 📄 controller.js
│   │   │   ├── 📄 routes.js
│   │   │   └── 📄 model.js
│   ├── 📂 routes
│   │   ├── 📄 index.js
│   │   └── 📄 routes.js
│   ├── 📂 utils
│   │   ├── 📂 helpers
│   │   │    └── 📄 routeHelper.js
│   │   └── 📄 index.js
│   └── 📄 app.js
├── 📄 .env.example
├── 📄 .gitignore
├── 📄 package-lock.json
├── 📄 package.json
└── 📄 README.md
└── 📄 swagger.js
```

### 📝 Descripción de la estructura del proyecto

- `swagger.js`: Contiene la configuración de **Swagger** para la generación automática de la documentación de la API.
- Los métodos que requieren un `body` (como crear o actualizar) deben estructurar el `body` de manera específica con todos los elementos necesarios. Esto permite que **Swagger Autogen** capture correctamente los datos y los incluya en la documentación.

## 🛠️ Configuración de la base de datos

Para configurar la base de datos, sigue estos pasos:

1. 🗄️ Crea una base de datos en **MySQL** con el nombre que desees.
2. 📄 Copia el archivo `.env.example` y renómbralo a `.env`.
3. ✏️ Abre el archivo `.env` y configura las variables de entorno para la conexión a la base de datos. Asegúrate de que los valores coincidan con los de tu base de datos.

```bash
DB_HOST=localhost
DB_PORT=3306
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=nombre_de_la_base_de_datos
DB_DIALECT=mysql
JWT_SECRET=tu_secreto_jwt
JWT_EXPIRES_IN=1d
```

4. 💾 Guarda los cambios y cierra el archivo.
5. 🖥️ Abre una terminal y navega hasta la carpeta del proyecto.

## 📦 Dependencias

- `express`: Framework web para **Node.js**.
- `sequelize`: ORM para **Node.js** que soporta varios dialectos de bases de datos.
- `mysql2`: Driver para **MySQL** y **MariaDB**.
- `dotenv`: Carga variables de entorno desde un archivo `.env`.
- `jsonwebtoken`: Implementación de **JSON Web Tokens**.
- `bcrypt`: Librería para encriptar contraseñas.
- `cors`: Middleware para habilitar **CORS**.
- `joi`: Librería para validar objetos **JavaScript**.
- `swagger-autogen`: Generador automático de documentación **Swagger**.
- `swagger-ui-express`: Sirve la documentación de **Swagger** en una interfaz web.
- `fb-modules`: Librería para crear módulos de API RESTful.

Entre todas las dependencias, **`fb-modules`** y **`swagger-autogen`** son las más importantes. **`fb-modules`** permite crear módulos de API RESTful de manera sencilla y rápida, mientras que **`swagger-autogen`** facilita la generación automática de la documentación de la API.

Puedes aprender más sobre cómo utilizar **`fb-modules`** en el repositorio oficial: [fb-modules](https://github.com/jorgesosa-funval/fb-modules).

## 📖 Documentación con Swagger

La documentación de la API se genera automáticamente utilizando **Swagger**. Para acceder a la documentación, inicia el servidor y navega a `http://localhost:3000/api/v1/docs`.

### ⚠️ Notas importantes:

- Asegúrate de que los métodos que requieren un `body` (como crear o actualizar) incluyan un esquema detallado en el controlador. Esto permite que **`swagger-autogen`** sepa cuáles son los campos dentro del `body` y los capture correctamente para incluirlos en la documentación.

Ejemplo de un esquema en el controlador:

```javascript
export const store = async (req, res, next) => {
    try {
        //#swagger.tags = ['Users']
        //#swagger.description = 'Crea un nuevo usuario.'

        const { name, lastname, email, password } = req.body; // esta línea es importante para que swagger-autogen capture los datos del body. Otra opcion es utilizar las opciones de swagger-autogen para definir el body.
        
        if (!name || !lastname || !email || !password) {
            throw { status: 400, message: "Missing fields" };
        }

        const existingUser = await Users.findOne({ where: { email: req.body.email } });

        if (existingUser) {
            throw { status: 400, message: "Email already exists" };
        }

        req.body.password = await hash(req.body.password, 10);

        await Users.create(req.body, {
            validate: true,
        });

        res.status(201).json({
            status: "ok",
            message: "User created successfully"
        });

    } catch (error) {
        next(error);
    }
};
```

## ▶️ Iniciar el servidor

Para iniciar el servidor, ejecuta el siguiente comando en la terminal:

```bash
npm run dev
```

Esto iniciará el servidor en modo desarrollo. Puedes acceder a la API en `http://localhost:3000`.
El puerto se puede cambiar en el archivo `.env`.

```bash
PORT=3000
``` 

Este proyecto es de código abierto y está bajo la licencia **MIT**. Si tienes alguna pregunta o sugerencia, no dudes en abrir un **issue** o enviar un **pull request**. ¡Gracias por usar este template!  
🎉 ¡Feliz codificación! 🎉
