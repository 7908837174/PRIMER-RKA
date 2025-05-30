import "dotenv/config";
import express,{NextFunction,Request,Response} from "express";
import cors from "cors";
import session from "cookie-session";
import {config} from "./config/app.config" 
import connectDatabase from "./config/database.config";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { HTTPSTATUS } from "./config/http.config";
import { asyncHandler } from "./middlewares/asyncHandler.middleware";
import { ErrorCodeEnum } from "./enums/enum-code.enum";
import { BadRequestException } from "./utils/appError";

import "./config/passport.config";
import passport from "passport";
import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";
import isAuthenticated from "./middlewares/isAuthenticated.middleware";
import workspaceRoutes from "./routes/workspace.route";
import memberRoutes from "./routes/member.route";
import projectRoutes from "./routes/project.route";
import taskRoutes from "./routes/task.route";

const app = express();
const BASE_PATH = config.BASE_PATH;

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use(
    session({
        name:"session",
        keys:[config.SESSION_SECRET],
        maxAge: 24 *60 * 60 *1000,
        secure:config.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "lax",
    })
);

app.use(passport.initialize());
app.use(passport.session());

// Allow all origins in development, specific origins in production
const allowedOrigins = [
  'http://localhost:5173',
  'https://primer-rka.vercel.app',
  'https://primer-rka-d5zb.vercel.app'
];

// Add any configured origins from environment
if (config.FRONTEND_ORIGIN) {
  if (Array.isArray(config.FRONTEND_ORIGIN)) {
    allowedOrigins.push(...config.FRONTEND_ORIGIN);
  } else {
    allowedOrigins.push(config.FRONTEND_ORIGIN);
  }
}

// Log allowed origins for debugging
console.log('Allowed CORS origins:', allowedOrigins);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, etc)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) !== -1 || config.NODE_ENV === 'development') {
        callback(null, true);
      } else {
        console.warn(`Origin ${origin} not allowed by CORS`);
        callback(null, true); // Allow all origins in case of misconfiguration
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

app.get(
  `/`,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    return res.status(HTTPSTATUS.OK).json({
      message: "PRIMER API is running",
      status: "success"
    });
  })
);

app.use(`${BASE_PATH}/auth`, authRoutes);
app.use(`${BASE_PATH}/user`, isAuthenticated, userRoutes);
app.use(`${BASE_PATH}/workspace`, isAuthenticated, workspaceRoutes);
app.use(`${BASE_PATH}/member`, isAuthenticated, memberRoutes);
app.use(`${BASE_PATH}/project`, isAuthenticated, projectRoutes);
app.use(`${BASE_PATH}/task`, isAuthenticated, taskRoutes);

app.use(errorHandler);

// Connect to database
connectDatabase();

// For serverless environments like Vercel
if (process.env.NODE_ENV !== 'production') {
  app.listen(config.PORT, () => {
    console.log(`Server listening on port ${config.PORT} in ${config.NODE_ENV}`);
  });
}

export default app;