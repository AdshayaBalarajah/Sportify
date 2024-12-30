const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const exerciseRoutes = require("./routes/exerciseRoutes");
const errorHandler = require("./middleware/errorHandler");

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON payloads

// Routes
app.use("/api/exercises", exerciseRoutes);

// Error handling
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
