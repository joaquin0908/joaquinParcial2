import { Request, Response, NextFunction } from "express";
import User from "../models/user.models";
import IUser from "../interfaces/user.interface";
import jwt from "jsonwebtoken";
import { BadRequestException, HttpException, NotFoundException } from "../utils/http.exception";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { nombre, email, contraseña, rol, imageUrl } = req.body;

    if (await User.findOne({ email })) { throw new HttpException(400, 'El usuario ya esta registrado'); }
    
    let user: IUser = new User({
      nombre,
      email,
      contraseña,
      rol,
      imageUrl
    });

    if ((await user.guardarContraseña()) === false) {
      throw new BadRequestException("Error en el cifrado de la contraseña");
    }

    await user.save();

    // Devolver datos
    const userData = await User.findById(user._id).orFail(
      new NotFoundException("Datos de usuario no encontrados")
    );
    return res.json(userData);
  } catch (err) {
    return next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: IUser = await User.findOne({ email: req.body.email })
      .select("+contraseña")
      .orFail(new NotFoundException("Usuario no encontrado"));

    if (!user.contraseña)
      throw new HttpException(401, "Contraseña no autorizada y faltante");

    const correctPassword = await user.validarContraseña(req.body.contraseña);
    if (!correctPassword) throw new HttpException(401, "Contraseña invalida");

    // Create a Token
    const token: string = jwt.sign(
      { sub: user._id },
      process.env.JWT_SECRET || "",
      {
        expiresIn: process.env.JWT_EXPIRATION,
      }
    );

    const { contraseña, ...data } = user.toJSON();
    return res.header("auth-token", token).json({ ...data, token });
  } catch (error) {
    next(error);
  }
};