import { ErrorRequestHandler, Response } from "express";
import { HTTPSTATUS } from "../config/http.config";
import { AppError } from "../utils/appError";
import { z, ZodError } from "zod";
import { ErrorCodeEnum } from "../enums/enum-code.enum";

const formatZodError = (res: Response, error: z.ZodError) => {
  const errors = error?.issues?.map((err) => ({
    field: err.path.join("."),
    message: err.message,
  }));
  return res.status(HTTPSTATUS.BAD_REQUEST).json({
    message: "Validation failed",
    errors: errors,
    errorCode: ErrorCodeEnum.VALIDATION_ERROR,
  });
};

export const errorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next
): any => {
  // Log detailed error information for debugging
  console.error(`Error Occurred on PATH: ${req.path}`);
  console.error('Error details:', {
    message: error.message,
    stack: error.stack,
    name: error.name,
    code: error.code
  });

  // Handle MongoDB duplicate key errors
  if (error.name === 'MongoServerError' && error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    return res.status(HTTPSTATUS.CONFLICT).json({
      message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists.`,
      errorCode: ErrorCodeEnum.DUPLICATE_ENTRY,
    });
  }

  // Handle MongoDB connection errors
  if (error.name === 'MongoNetworkError') {
    return res.status(HTTPSTATUS.SERVICE_UNAVAILABLE).json({
      message: "Database connection error. Please try again later.",
      errorCode: ErrorCodeEnum.DATABASE_ERROR,
    });
  }

  // Handle JSON syntax errors
  if (error instanceof SyntaxError && error.message.includes('JSON')) {
    return res.status(HTTPSTATUS.BAD_REQUEST).json({
      message: "Invalid JSON format. Please check your request body.",
      errorCode: ErrorCodeEnum.INVALID_JSON,
    });
  }

  // Handle validation errors
  if (error instanceof ZodError) {
    return formatZodError(res, error);
  }

  // Handle application-specific errors
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
      errorCode: error.errorCode,
    });
  }

  // Handle authentication errors from Passport
  if (error.name === 'AuthenticationError') {
    return res.status(HTTPSTATUS.UNAUTHORIZED).json({
      message: error.message || "Authentication failed",
      errorCode: ErrorCodeEnum.AUTHENTICATION_FAILED,
    });
  }

  // Default error response
  return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
    message: "Internal Server Error",
    error: error?.message || "Unknown error occurred",
    errorCode: ErrorCodeEnum.INTERNAL_SERVER_ERROR,
  });
};