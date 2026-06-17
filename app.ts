import 'dotenv/config';
import express, { Application } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import datetimeHeader from './middleware/header-datetime-utc.middleware';
import { urlValidation, handleErrors } from './exception';

// define route
import indexRouter from './route/index';

// swagger documentation
import swaggerDocs from './utility/swagger.utility';

// webhook system
import { registerWebhooks } from './src/webhook/webhook.register';

const app: Application = express();

// register webhook handlers
registerWebhooks();

// setting cors
const corsOptions: cors.CorsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'X-Content-Type-Options', 'X-XSS-Protection', 'X-Frame-Options', 'Strict-Transport-Security', 'APIKey', 'x-api-key', 'x-payload', 'timezone', 'utc-offset'],
    maxAge: 86400,
    credentials: true
};

app.use(cors(corsOptions));
app.use(logger('dev'));

app.get('/health', (_req, res) => {
    res.status(200).json({
        status: 'ok',
        service: 'sistem-kasir-backend-api',
        uptime: process.uptime(),
    });
});

// setting max size payload (set max 10mb)
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// use middleware for adding datetime UTC from req
app.use(datetimeHeader);

// swagger documentation
swaggerDocs(app, process.env.PORT || 3000);

// routing
app.use('/api', indexRouter);

// error handler
app.use(urlValidation);
app.use(handleErrors);

export default app;
