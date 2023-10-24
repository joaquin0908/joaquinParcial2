import cors from "cors";
import express, { Application } from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";

export const configure = async (app: Application) => {
  dotenv.config();
  app.use(morgan("dev"));
  app.use(cors());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  console.log("🟢 Middlewares configurated");
};
