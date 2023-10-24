import User from "../models/user.models";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { HttpException, UnauthorizedException } from "../utils/http.exception";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers.authorization)
      throw new UnauthorizedException("Missing authorization header.");

    req.token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(req.token, process.env.JWT_SECRET || "") as any;
    if (!decoded) throw new UnauthorizedException("Unauthorized.");

    const userFound = await User.findById(decoded.sub);
    if (!userFound) throw new UnauthorizedException("Unauthorized.");
    req.user = userFound;
    next();
  } catch (error) {
    return next(error);
  }
};