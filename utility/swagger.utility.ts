import { Application } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from '../config/swagger.config';

const swaggerSpec = swaggerJsdoc(swaggerOptions);

const swaggerDocs = (app: Application, port: string | number): void => {
    // Swagger page
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Docs in JSON format
    app.get('/api-docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    console.log(`📄 Swagger docs available at http://localhost:${port}/api-docs`);
};

export default swaggerDocs;
