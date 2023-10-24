import { Request, Response, NextFunction } from "express";
import User from "../models/user.models";
import IUser from "../interfaces/user.interface";
import { NotFoundException } from "../utils/http.exception";

export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { nombre, email, contraseña, rol } = req.body;

    const user: IUser = new User({
      nombre,
      email,
      contraseña,
      rol,
    });

    await user.save();

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).orFail(
      new NotFoundException("Usuario no encontrado")
    );
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const destroy = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).orFail(
      new NotFoundException("Usuario no encontrado")
    );
    await user.deleteOne();
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
