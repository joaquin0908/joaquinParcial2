import { Application } from "express";
import userRoutes from "../routes/user.routes";
import authRoutes from "../routes/auth.routes";
import productRoutes from "../routes/product.routes";

export const register = async (app: Application) => {
  app.use("/users", userRoutes);
  app.use("/auth", authRoutes);
  app.use("/products", productRoutes);
  console.log("🟢 Routes registered");
};
