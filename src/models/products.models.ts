import { model, Schema } from "mongoose";
import IProducts from "../interfaces/products.interface";

const ProductSchema = new Schema<IProducts>(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
    },
    descripcion: {
      type: String,
      unique: true,
      required: [true, "La descripcion es obligatoria"],
      lowercase: true,
      trim: true,
    },
    precio: {
      type: String,
      required: [true, "El precio es obligatorio"],
      select: false,
    },
    imagenUrl: {
      type: String,
     
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);


export default model<IProducts>("Product", ProductSchema);