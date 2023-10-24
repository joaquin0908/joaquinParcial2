import { Router } from "express";
import * as productController from "../controllers/products.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { productsValidators } from "../middlewares/validators/productValidators";
import { handleValidationErrors } from "../middlewares/validation.middleware";
import { mongoIdValidator } from "../middlewares/validators/userValidators";

const router = Router();

// OBTENER TODOS
router.get(
    "/", 
    productController.index
);
// CREAR
router.post(
    "/", 
    ...productsValidators,
    handleValidationErrors,
    authMiddleware, 
    productController.create
);
// OBTENER UNO
router.get("/:id", 
...mongoIdValidator,
handleValidationErrors,
productController.show);
// BORRAR
router.delete("/:id", 
...mongoIdValidator,
handleValidationErrors,
authMiddleware,
 productController.destroy)

export default router;