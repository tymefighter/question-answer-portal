import express from "express";
import addMiddleware from "middleware";
import addRoutes from "routes";

// Port
const PORT = 5000;

const app = express();

// Add Middleware
addMiddleware(app);

// Add Routes
addRoutes(app);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server started at http://localhost:${PORT}`);
});