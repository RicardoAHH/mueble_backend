import swaggerAutogen from 'swagger-autogen';
import conf from '#config/index.js';
import { routes } from './src/routes/routes.js';
const host = conf.env === 'production' ? conf.host : `${conf.host}:${conf.port}`;
const doc = {
    info: {
        title: conf.appName,
        description: conf.appDescription,
    }, 
    host: host,
    securityDefinitions:{
        'authorization': {
            type: 'apiKey',
            name: 'token',
            in: 'cookie',
            description: 'JWT token for authentication',
        }
    },
    schemes: ['http', 'https'],
    basePath: '/api/v1',
};

const outputFile = './swagger.json';
const routesList = routes.map((route) => {
    return `src/modules/${route.name}/Router.js`;
});  

swaggerAutogen()(outputFile, routesList, doc);