console.log('[startup] Loading Sistem Kasir Backend API');
console.log(`[startup] NODE_ENV=${process.env.NODE_ENV || ''}`);
console.log(`[startup] PORT=${process.env.PORT || '3000'}`);

try {
    require('./dist/bin/www.js');
} catch (error) {
    console.error('[startup] Failed to load dist/bin/www.js');
    console.error(error);
    process.exit(1);
}
