import Database from "./database";
import * as express from "express";
import addMiddleware from "./middleware";
import addRoutes from "./routes";

// Port
const PORT = 5000;

// Get Database object
const database = new Database();

const app = express();

// Add Middleware
const isDevelopment = process.argv[2] === '--dev';
addMiddleware(app, isDevelopment ? 'DEVELOPMENT' : 'PRODUCTION');

// Add Routes
addRoutes(database, app);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server started at http://localhost:${PORT}`);
});