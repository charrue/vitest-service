import { startServer } from "@charrue/test-msw";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const currentDir = dirname(fileURLToPath(import.meta.url));
const swaggerFilePath = resolve(currentDir, "swagger.json");

startServer(swaggerFilePath, "http://150.158.181.150/api/mock-api", {
  "*": 0,
  "/login": 1000,
});
