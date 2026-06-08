const fs = require('node:fs');
const path = require('node:path');

const clientPath = path.join(process.cwd(), 'dist', 'src', 'generated', 'prisma', 'client.js');

if (!fs.existsSync(clientPath)) {
  console.warn(`[patch-prisma-cjs] Skipped. File not found: ${clientPath}`);
  process.exit(0);
}

let source = fs.readFileSync(clientPath, 'utf8');
const original = source;

source = source.replace('const node_url_1 = require("node:url");\r\n', '');
source = source.replace('const node_url_1 = require("node:url");\n', '');
source = source.replace(
  "globalThis['__dirname'] = path.dirname((0, node_url_1.fileURLToPath)(import.meta.url));",
  "globalThis['__dirname'] = __dirname;"
);

if (source !== original) {
  fs.writeFileSync(clientPath, source);
  console.log('[patch-prisma-cjs] Patched Prisma client CommonJS output');
} else {
  console.log('[patch-prisma-cjs] No patch needed');
}
