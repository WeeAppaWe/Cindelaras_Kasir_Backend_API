import swaggerJsdoc from 'swagger-jsdoc';

export const swaggerOptions: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Sistem Kasir API',
            version: '1.0.0',
            description: 'API documentation for Sistem Kasir Backend',
        },
        servers: [
            {
                url: '/api',
                description: 'API Server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
                apiKeyAuth: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'x-api-key',
                },
            },
        },
    },
    apis: ['./doc/**/*.doc.ts', './src/**/*.doc.js', './src/**/*.doc.ts', './route/*.ts'],
};

export default swaggerOptions;
