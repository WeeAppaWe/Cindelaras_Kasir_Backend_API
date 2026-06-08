"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerOptions = void 0;
exports.swaggerOptions = {
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
exports.default = exports.swaggerOptions;
//# sourceMappingURL=swagger.config.js.map