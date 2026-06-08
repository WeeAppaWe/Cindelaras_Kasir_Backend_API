import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import { defineConfig } from "prisma/config";

// Load and expand environment variables (enables ${VAR} interpolation)
dotenvExpand.expand(dotenv.config());

export default defineConfig({
    schema: "../prisma/schema.prisma",
    migrations: {
        path: "../prisma/migrations",
    },
    datasource: {
        url: process.env["DATABASE_URL"]
    },
});
