"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_config_1 = __importDefault(require("../config/swagger.config"));
const swaggerSpec = (0, swagger_jsdoc_1.default)(swagger_config_1.default);
const swaggerDocs = (app, port) => {
    // Swagger page
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
    // Docs in JSON format
    app.get('/api-docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
    console.log(`📄 Swagger docs available at http://localhost:${port}/api-docs`);
};
exports.default = swaggerDocs;
//# sourceMappingURL=swagger.utility.js.map