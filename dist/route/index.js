"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Get all route files in the directory (support both .route.js and .route.ts)
const routeFiles = fs_1.default.readdirSync(__dirname).filter((file) => file !== 'index.ts' &&
    file !== 'index.js' &&
    (file.endsWith('.route.ts') || file.endsWith('.route.js')));
// Import all route files from route/ folder
routeFiles.forEach((file) => {
    const route = require(path_1.default.join(__dirname, file));
    // Handle both default exports and module.exports
    router.use('/', route.default || route);
});
exports.default = router;
//# sourceMappingURL=index.js.map