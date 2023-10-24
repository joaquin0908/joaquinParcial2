import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import {authLoginValidators,authSingupValidators} from "../middlewares/validators/userValidators";
import { handleValidationErrors } from "../middlewares/validation.middleware";

const router = Router();

// REGISTRAR
router.post(
  "/signup",
  ...authSingupValidators,
  handleValidationErrors,
  authController.signup
);
// INICIAR SESION
router.post(
  "/login",
  ...authLoginValidators,
  handleValidationErrors,
  authController.login
);

export default router;