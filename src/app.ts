import compression from "compression";
import cors from "cors";
import express from "express";
import { userRouter } from "./modules/user/user.route";
import { blogRouter } from "./modules/blog/blog.route";

const app = express();

// Middleware
app.use(cors()); // Enables Cross-Origin Resource Sharing
app.use(compression()); // Compresses response bodies for faster delivery
app.use(express.json()); // Parse incoming JSON requests

app.use(
  cors({
    origin: "http://localhost:5000",
    credentials: true,
  })
);

// ®️ Route
app.use("/api/v1/user", userRouter)
app.use("/api/v1/blog", blogRouter)

// Default route for testing
app.get("/", (_req, res) => {
  res.send("NextJS Portfolio Is Running.🌴 Powered by সহজ সরল প্রতারণার মঞ্চ😛");
});


// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

export default app;