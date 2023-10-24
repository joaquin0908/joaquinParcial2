import { Request, Response, NextFunction } from "express";
import User from "../models/products.models";
import IProducts from "../interfaces/products.interface";
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
    const {  nombre, descripcion, precio, imagenUrl} = req.body;

    const Producto: IProducts = new User({
      
      nombre,
      descripcion,
      precio,
      imagenUrl,
    });

    await Producto.save();

    return res.status(200).json(Producto);
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
      new NotFoundException("Usario no encontrado")
    );
    await user.deleteOne();
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
