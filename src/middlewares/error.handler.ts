import { HttpException } from "../utils/http.exception";
import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";

const errorHandler = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  logger.error(`Error ${status} - ${message}`);

  return res.status(status).json({
    status,
    message,
  });
};
export default errorHandler;