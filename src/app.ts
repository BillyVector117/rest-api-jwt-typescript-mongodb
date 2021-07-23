import express, { Application } from "express";
import authRoutes from "./routes/auth";
import "./database";

const app: Application = express();

// Settings
app.set("PORT", 3000)
app.use(express.json())
// Routes
app.use("/api/auth",authRoutes)


export default app;