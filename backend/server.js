// server.js
import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

// Import routes
import authRoutes from "./routes/auth.routes.js";
import paymentsRoutes from "./routes/payment.routes.js";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/payments", paymentsRoutes);

// Root Route
app.get("/", (req, res) => {
  res.status(200).json({ 
    message: "BookStore API is running",
    version: "1.0.0",
    endpoints: {
      auth: "/api/auth",
      payments: "/api/payments"
    }
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});