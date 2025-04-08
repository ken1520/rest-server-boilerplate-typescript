import cors from "cors";
import express from "express";
import type { Express, Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import logger from "#config/logger.ts";
import {
  responseFormatter,
  errorHandler,
  notFoundHandler,
} from "#middlewares/response.ts";
import router from "./router.ts";

const app: Express = express();

// Request context middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  // Generate unique request ID for tracking
  req.traceId = uuidv4();
  logger.defaultMeta = { traceId: req.traceId };

  // Create child logger with request context
  req.logger = logger.child({
    traceId: req.traceId,
    endpoint: req.originalUrl,
  });

  next();
});

app.use(responseFormatter());

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();

  // Immediate request log
  req.logger.info("Request started", {
    type: "request",
    ip: req.ip,
    method: req.method,
    url: req.originalUrl,
    query: req.query,
    headers: req.headers,
    body: req.body,
  });

  // Response finish handler
  res.on("finish", () => {
    const duration = Date.now() - startTime;

    // Response log
    req.logger.info("Request completed", {
      type: "response",
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      contentLength: res.get("content-length") || "0",
      userAgent: req.get("user-agent"),
    });
  });

  next();
});

// Middleware to parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to enable CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Allow only the client app to access if you have one
    methods: ["GET"], // Add more methods if needed
  }),
);

// Set up routes
app.use(router);

// Handle 404
app.use(notFoundHandler());

// Handle unexpected errors
app.use(errorHandler());

export default app;
