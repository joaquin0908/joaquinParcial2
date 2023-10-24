import { Document } from "mongoose";

interface IProducts extends Document {
  nombre: string;
  descripcion: string;
  precio: string;
  imagenUrl: string;

}

export default IProducts;