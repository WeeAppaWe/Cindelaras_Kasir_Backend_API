import fs from 'fs';
import path from 'path';
import express, { Router } from 'express';

const router: Router = express.Router();

// Get all route files in the directory (support both .route.js and .route.ts)
const routeFiles = fs.readdirSync(__dirname).filter((file) =>
    file !== 'index.ts' &&
    file !== 'index.js' &&
    (file.endsWith('.route.ts') || file.endsWith('.route.js'))
);

// Import all route files from route/ folder
routeFiles.forEach((file) => {
    const route = require(path.join(__dirname, file));
    // Handle both default exports and module.exports
    router.use('/', route.default || route);
});

export default router;
