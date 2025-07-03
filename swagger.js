// swagger.js
import { writeFileSync } from 'fs'; // Importamos writeFileSync para escribir archivos
import conf from '#config/index.js'; // Asegúrate de que esta ruta sea correcta

const host = conf.env === 'production' ? conf.host : `${conf.host}:${conf.port}`;

const doc = {
    swagger: '2.0', // Es crucial especificar la versión de Swagger/OpenAPI
    info: {
        title: conf.appName,
        description: conf.appDescription,
        version: '1.0.0', // Versión de tu API
    },
    host: host,
    basePath: '/api/v1',
    schemes: ['http', 'https'],
    securityDefinitions: {
        'authorization': {
            type: 'apiKey',
            name: 'token',
            in: 'cookie',
            description: 'JWT token for authentication',
        }
    },
    tags: [ // Definición de tags para agrupar en la UI
        { name: 'Auth', description: 'Operaciones de autenticación de usuarios.' },
        { name: 'Users', description: 'Gestión de usuarios.' },
        { name: 'Products', description: 'Operaciones de gestión de productos.' },
        { name: 'Categories', description: 'Gestión de categorías de productos.' },
        { name: 'Roles', description: 'Gestión de roles de usuario.' },
        { name: 'Quotes', description: 'Gestión de cotizaciones.' },
    ],
    // --- SECCIÓN DE RUTAS (PATHS) ---
    paths: {
        // AUTH MODULE
        '/auth/login': {
            post: {
                summary: 'Iniciar sesión de usuario',
                tags: ['Auth'],
                parameters: [{
                    in: 'body',
                    name: 'body',
                    required: true,
                    schema: {
                        type: 'object',
                        properties: {
                            email: { type: 'string', example: 'test@example.com' },
                            password: { type: 'string', example: 'password123' },
                        },
                        required: ['email', 'password']
                    }
                }],
                responses: {
                    200: { description: 'Login exitoso.' },
                    400: { description: 'Credenciales inválidas.' }
                }
            }
        },
        '/auth/register': {
            post: {
                summary: 'Registrar nuevo usuario',
                tags: ['Auth'],
                parameters: [{
                    in: 'body',
                    name: 'body',
                    required: true,
                    schema: {
                        type: 'object',
                        properties: {
                            name: { type: 'string', example: 'Juan' },
                            lastname: { type: 'string', example: 'Pérez' },
                            email: { type: 'string', example: 'juan.perez@example.com' },
                            password: { type: 'string', example: 'securepassword' },
                        },
                        required: ['name', 'lastname', 'email', 'password']
                    }
                }],
                responses: {
                    201: { description: 'Usuario registrado exitosamente.' },
                    400: { description: 'Datos inválidos.' }
                }
            }
        },
        '/auth/logout': {
            get: {
                summary: 'Cerrar sesión de usuario',
                tags: ['Auth'],
                responses: {
                    200: { description: 'Sesión cerrada.' }
                }
            }
        },
        // PRODUCTS MODULE
        '/products': {
            get: {
                summary: 'Obtener todos los productos',
                tags: ['Products'],
                responses: {
                    200: {
                        description: 'Lista de productos.',
                        schema: { type: 'array', items: { '$ref': '#/definitions/Product' } }
                    },
                    500: { description: 'Error del servidor.' }
                }
            },
            post: {
                summary: 'Crear un nuevo producto',
                tags: ['Products'],
                parameters: [{
                    in: 'body',
                    name: 'body',
                    required: true,
                    schema: { '$ref': '#/definitions/ProductCreate' }
                }],
                responses: {
                    201: { description: 'Producto creado exitosamente.' },
                    400: { description: 'Datos inválidos.' }
                }
            }
        },
        '/products/{id}': {
            get: {
                summary: 'Obtener un producto por ID',
                tags: ['Products'],
                parameters: [{
                    in: 'path',
                    name: 'id',
                    required: true,
                    type: 'string',
                    description: 'ID del producto.'
                }],
                responses: {
                    200: { description: 'Producto encontrado.', schema: { '$ref': '#/definitions/Product' } },
                    404: { description: 'Producto no encontrado.' }
                }
            },
            put: {
                summary: 'Actualizar un producto por ID',
                tags: ['Products'],
                parameters: [
                    { in: 'path', name: 'id', required: true, type: 'string', description: 'ID del producto.' },
                    { in: 'body', name: 'body', required: true, schema: { '$ref': '#/definitions/ProductUpdate' } }
                ],
                responses: {
                    200: { description: 'Producto actualizado.' },
                    400: { description: 'Datos inválidos.' },
                    404: { description: 'Producto no encontrado.' }
                }
            },
            delete: {
                summary: 'Eliminar un producto por ID',
                tags: ['Products'],
                parameters: [{
                    in: 'path',
                    name: 'id',
                    required: true,
                    type: 'string',
                    description: 'ID del producto.'
                }],
                responses: {
                    204: { description: 'Producto eliminado.' },
                    404: { description: 'Producto no encontrado.' }
                }
            }
        },
        // USERS MODULE (EJEMPLO, COMPLETA TUS RUTAS DE USERS)
        '/users/profile': {
            get: {
                summary: 'Obtener perfil del usuario autenticado',
                tags: ['Users'],
                security: [{ authorization: [] }], // Si esta ruta requiere auth
                responses: {
                    200: { description: 'Perfil del usuario.' },
                    401: { description: 'No autorizado.' }
                }
            }
        },
        '/users/change-password': {
            patch: {
                summary: 'Cambiar contraseña de usuario',
                tags: ['Users'],
                security: [{ authorization: [] }],
                parameters: [{
                    in: 'body',
                    name: 'body',
                    required: true,
                    schema: {
                        type: 'object',
                        properties: {
                            oldPassword: { type: 'string', example: 'oldpassword' },
                            newPassword: { type: 'string', example: 'newsecurepassword' },
                        },
                        required: ['oldPassword', 'newPassword']
                    }
                }],
                responses: {
                    200: { description: 'Contraseña cambiada exitosamente.' },
                    400: { description: 'Datos inválidos o contraseña incorrecta.' }
                }
            }
        },
        '/users/{id}': {
            get: {
                summary: 'Obtener un usuario por ID',
                tags: ['Users'],
                parameters: [{
                    in: 'path',
                    name: 'id',
                    required: true,
                    type: 'string',
                    description: 'ID del usuario.'
                }],
                responses: {
                    200: { description: 'Usuario encontrado.' },
                    404: { description: 'Usuario no encontrado.' }
                }
            },
            put: {
                summary: 'Actualizar un usuario por ID',
                tags: ['Users'],
                parameters: [{
                    in: 'path',
                    name: 'id',
                    required: true,
                    type: 'string',
                    description: 'ID del usuario.'
                }],
                responses: {
                    200: { description: 'Usuario actualizado.' },
                    400: { description: 'Datos inválidos.' },
                    404: { description: 'Usuario no encontrado.' }
                }
            },
            delete: {
                summary: 'Eliminar (desactivar) un usuario por ID',
                tags: ['Users'],
                parameters: [{
                    in: 'path',
                    name: 'id',
                    required: true,
                    type: 'string',
                    description: 'ID del usuario.'
                }],
                responses: {
                    204: { description: 'Usuario desactivado.' },
                    404: { description: 'Usuario no encontrado.' }
                }
            }
        },
        '/users/{id}/restore': {
            patch: {
                summary: 'Restaurar un usuario por ID',
                tags: ['Users'],
                parameters: [{
                    in: 'path',
                    name: 'id',
                    required: true,
                    type: 'string',
                    description: 'ID del usuario a restaurar.'
                }],
                responses: {
                    200: { description: 'Usuario restaurado.' },
                    404: { description: 'Usuario no encontrado.' }
                }
            }
        },

        // ROLES MODULE
        '/roles': {
            get: {
                summary: 'Obtener todos los roles',
                tags: ['Roles'],
                responses: {
                    200: { description: 'Lista de roles.' }
                }
            },
            post: {
                summary: 'Crear un nuevo rol',
                tags: ['Roles'],
                parameters: [{
                    in: 'body',
                    name: 'body',
                    required: true,
                    schema: {
                        type: 'object',
                        properties: {
                            name: { type: 'string', example: 'admin' },
                            description: { type: 'string', example: 'Administrador del sistema.' },
                        },
                        required: ['name']
                    }
                }],
                responses: {
                    201: { description: 'Rol creado.' }
                }
            }
        },
        '/roles/{id}': {
            get: {
                summary: 'Obtener un rol por ID',
                tags: ['Roles'],
                parameters: [{
                    in: 'path',
                    name: 'id',
                    required: true,
                    type: 'string',
                    description: 'ID del rol.'
                }],
                responses: {
                    200: { description: 'Rol encontrado.' },
                    404: { description: 'Rol no encontrado.' }
                }
            },
            put: {
                summary: 'Actualizar un rol por ID',
                tags: ['Roles'],
                parameters: [{
                    in: 'path',
                    name: 'id',
                    required: true,
                    type: 'string',
                    description: 'ID del rol.'
                }, {
                    in: 'body',
                    name: 'body',
                    required: true,
                    schema: {
                        type: 'object',
                        properties: {
                            name: { type: 'string', example: 'editor' },
                            description: { type: 'string', example: 'Editor de contenido.' }
                        },
                        required: ['name']
                    }
                }],
                responses: {
                    200: { description: 'Rol actualizado.' },
                    400: { description: 'Datos inválidos.' },
                    404: { description: 'Rol no encontrado.' }
                }
            },
            delete: {
                summary: 'Eliminar un rol por ID',
                tags: ['Roles'],
                parameters: [{
                    in: 'path',
                    name: 'id',
                    required: true,
                    type: 'string',
                    description: 'ID del rol.'
                }],
                responses: {
                    204: { description: 'Rol eliminado.' },
                    404: { description: 'Rol no encontrado.' }
                }
            }
        },

        // CATEGORIES MODULE
        '/categories': {
            get: {
                summary: 'Obtener todas las categorías',
                tags: ['Categories'],
                responses: {
                    200: { description: 'Lista de categorías.' }
                }
            },
            post: {
                summary: 'Crear una nueva categoría',
                tags: ['Categories'],
                parameters: [{
                    in: 'body',
                    name: 'body',
                    required: true,
                    schema: {
                        type: 'object',
                        properties: {
                            name: { type: 'string', example: 'Electrónica' },
                            description: { type: 'string', example: 'Productos electrónicos de consumo.' },
                        },
                        required: ['name']
                    }
                }],
                responses: {
                    201: { description: 'Categoría creada.' }
                }
            }
        },
        '/categories/{id}': {
            get: {
                summary: 'Obtener una categoría por ID',
                tags: ['Categories'],
                parameters: [{
                    in: 'path',
                    name: 'id',
                    required: true,
                    type: 'string',
                    description: 'ID de la categoría.'
                }],
                responses: {
                    200: { description: 'Categoría encontrada.' },
                    404: { description: 'Categoría no encontrada.' }
                }
            },
            put: {
                summary: 'Actualizar una categoría por ID',
                tags: ['Categories'],
                parameters: [{
                    in: 'path',
                    name: 'id',
                    required: true,
                    type: 'string',
                    description: 'ID de la categoría.'
                }, {
                    in: 'body',
                    name: 'body',
                    required: true,
                    schema: {
                        type: 'object',
                        properties: {
                            name: { type: 'string', example: 'Hogar y Cocina' },
                            description: { type: 'string', example: 'Artículos para el hogar y la cocina.' }
                        },
                        required: ['name']
                    }
                }],
                responses: {
                    200: { description: 'Categoría actualizada.' },
                    400: { description: 'Datos inválidos.' },
                    404: { description: 'Categoría no encontrada.' }
                }
            },
            delete: {
                summary: 'Eliminar una categoría por ID',
                tags: ['Categories'],
                parameters: [{
                    in: 'path',
                    name: 'id',
                    required: true,
                    type: 'string',
                    description: 'ID de la categoría.'
                }],
                responses: {
                    204: { description: 'Categoría eliminada.' },
                    404: { description: 'Categoría no encontrada.' }
                }
            }
        },
        // Quotes MODULE
        '/quotes': {
            get: {
                summary: 'Obtener todas las cotizaciones',
                tags: ['Quotes'],
                responses: {
                    200: {
                        description: 'Lista de cotizaciones.',
                        schema: { type: 'array', items: { '$ref': '#/definitions/Quote' } }
                    },
                    500: { description: 'Error del servidor.' }
                }
            },
            post: {
                summary: 'Crear una nueva cotización',
                tags: ['Quotes'],
                parameters: [{
                    in: 'body',
                    name: 'body',
                    required: true,
                    schema: { '$ref': '#/definitions/QuoteCreate' }
                }],
                responses: {
                    201: { description: 'Cotización creada exitosamente.' },
                    400: { description: 'Datos inválidos.' }
                }
            }
        },
        '/quotes/{id}': {
            get: {
                summary: 'Obtener una cotización por ID',
                tags: ['Quotes'],
                parameters: [{
                    in: 'path',
                    name: 'id',
                    required: true,
                    type: 'integer', // El ID es BIGINT, que se mapea a integer en OpenAPI
                    format: 'int64', // Para BIGINT, se recomienda int64
                    description: 'ID de la cotización.'
                }],
                responses: {
                    200: { description: 'Cotización encontrada.', schema: { '$ref': '#/definitions/Quote' } },
                    404: { description: 'Cotización no encontrada.' }
                }
            },
            put: {
                summary: 'Actualizar una cotización por ID',
                tags: ['Quotes'],
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        type: 'integer',
                        format: 'int64',
                        description: 'ID de la cotización.'
                    },
                    {
                        in: 'body',
                        name: 'body',
                        required: true,
                        schema: { '$ref': '#/definitions/QuoteUpdate' }
                    }
                ],
                responses: {
                    200: { description: 'Cotización actualizada.' },
                    400: { description: 'Datos inválidos.' },
                    404: { description: 'Cotización no encontrada.' }
                }
            },
            delete: {
                summary: 'Eliminar una cotización por ID',
                tags: ['Quotes'],
                parameters: [{
                    in: 'path',
                    name: 'id',
                    required: true,
                    type: 'integer',
                    format: 'int64',
                    description: 'ID de la cotización.'
                }],
                responses: {
                    204: { description: 'Cotización eliminada.' },
                    404: { description: 'Cotización no encontrada.' }
                }
            }
        },
    },
    // --- SECCIÓN DE DEFINICIONES (MODELS) ---
    definitions: {
        Product: {
            type: 'object',
            properties: {
                id: { type: 'string', format: 'uuid', example: '550e8400-e29b-41d4-a716-446655440000' },
                name: { type: 'string', example: 'Mesa de Centro' },
                description: { type: 'string', example: 'Mesa elegante para sala de estar.' },
                price: { type: 'number', format: 'float', example: 250.00 },
            },
            example: {
                id: '550e8400-e29b-41d4-a716-446655440000',
                name: 'Mesa de Centro Clásica',
                description: 'Mesa de madera maciza para sala.',
                price: 250.00
            }
        },
        ProductCreate: {
            type: 'object',
            required: ['name', 'price'],
            properties: {
                name: { type: 'string', example: 'Silla Ergonómica' },
                description: { type: 'string', example: 'Silla para oficina con soporte lumbar.' },
                price: { type: 'number', format: 'float', example: 120.00 }
            },
            example: {
                name: 'Silla de Oficina',
                description: 'Silla cómoda para largas horas de trabajo.',
                price: 120.00
            }
        },
        ProductUpdate: {
            type: 'object',
            properties: {
                name: { type: 'string', example: 'Silla Ergonómica Pro' },
                description: { type: 'string', example: 'Versión mejorada de la silla ergonómica.' },
                price: { type: 'number', format: 'float', example: 150.00 }
            },
            example: {
                price: 150.00
            }
        },
        User: {
            type: 'object',
            properties: {
                id: { type: 'string', format: 'uuid' },
                name: { type: 'string' },
                email: { type: 'string', format: 'email' },
            }
        },
        Role: {
            type: 'object',
            properties: {
                id: { type: 'string', format: 'uuid' },
                name: { type: 'string' },
                description: { type: 'string' },
            }
        },
        Category: {
            type: 'object',
            properties: {
                id: { type: 'string', format: 'uuid' },
                name: { type: 'string' },
                description: { type: 'string' },
            }
        },
        Quote: {
            type: 'object',
            properties: {
                id: { type: 'integer', format: 'int64', example: 101 }, // bigint se mapea a integer/int64
                name: { type: 'string', example: 'Juan Pérez' },
                email: { type: 'string', format: 'email', example: 'juan.perez@example.com' },
                phone: { type: 'string', example: '+525512345678' },
                message: { type: 'string', example: 'Me gustaría una cotización para muebles de sala.' },
                status: { type: 'string', enum: ['pending', 'approved', 'rejected'], example: 'pending' },
                created_at: { type: 'string', format: 'date-time', example: '2025-07-01T10:00:00Z' },
                updated_at: { type: 'string', format: 'date-time', example: '2025-07-01T10:00:00Z' }
            },
            required: ['id', 'name', 'email', 'status'] // Los campos requeridos en la respuesta (el id es generado)
        },
        QuoteCreate: {
            type: 'object',
            properties: {
                name: { type: 'string', example: 'María García' },
                email: { type: 'string', format: 'email', example: 'maria.garcia@example.com' },
                phone: { type: 'string', example: '+525587654321', nullable: true },
                message: { type: 'string', example: 'Necesito una cotización para un juego de comedor y sillas.', nullable: true }
                // El status es 'pending' por defecto y no se envía en el create
            },
            required: ['name', 'email']
        },
        QuoteUpdate: {
            type: 'object',
            properties: {
                name: { type: 'string', example: 'María Elena García' },
                email: { type: 'string', format: 'email', example: 'maria.elena.garcia@example.com' },
                phone: { type: 'string', example: '+525599887766' },
                message: { type: 'string', example: 'Cotización actualizada para comedor y buffet.' },
                status: { type: 'string', enum: ['pending', 'approved', 'rejected'], example: 'approved' }
            }
            // No se especifica 'required' para el update, ya que todos los campos suelen ser opcionales
        },

    }
};

const outputFile = './swagger.json';

// Escribimos el objeto 'doc' directamente en el archivo
try {
    writeFileSync(outputFile, JSON.stringify(doc, null, 2), 'utf8');
    console.log(`Swagger JSON documentation generated successfully at ${outputFile}`);
} catch (error) {
    console.error('Error generating Swagger JSON:', error);
}

// Ya no necesitamos llamar a swaggerAutogen() porque estamos escribiendo el archivo directamente.
// Si swaggerAutogen se sigue ejecutando por alguna razón, podrías desinstalarlo o asegurarte
// de que el script npm no lo ejecute.