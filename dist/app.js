"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const header_datetime_utc_middleware_1 = __importDefault(require("./middleware/header-datetime-utc.middleware"));
const exception_1 = require("./exception");
// define route
const index_1 = __importDefault(require("./route/index"));
// swagger documentation
const swagger_utility_1 = __importDefault(require("./utility/swagger.utility"));
const app = (0, express_1.default)();
// setting cors
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'X-Content-Type-Options', 'X-XSS-Protection', 'X-Frame-Options', 'Strict-Transport-Security', 'APIKey', 'x-api-key', 'x-payload', 'timezone', 'utc-offset'],
    maxAge: 86400,
    credentials: true
};
app.use((0, cors_1.default)(corsOptions));
app.use((0, morgan_1.default)('dev'));
app.get('/health', (_req, res) => {
    res.status(200).json({
        status: 'ok',
        service: 'sistem-kasir-backend-api',
        uptime: process.uptime(),
    });
});
// setting max size payload (set max 10mb)
app.use(body_parser_1.default.json({ limit: '10mb' }));
app.use(body_parser_1.default.urlencoded({ extended: true, limit: '10mb' }));
// parse requests of content-type - application/json
app.use(express_1.default.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
// use middleware for adding datetime UTC from req
app.use(header_datetime_utc_middleware_1.default);
// swagger documentation
(0, swagger_utility_1.default)(app, process.env.PORT || 3000);
// routing
app.use('/api', index_1.default);
// error handler
app.use(exception_1.urlValidation);
app.use(exception_1.handleErrors);
exports.default = app;
//# sourceMappingURL=app.js.map