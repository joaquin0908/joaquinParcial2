import { check, ValidationChain } from "express-validator";

export const productsValidators: Array<ValidationChain> = [
  check("nombre")
    .isLength({ min: 3, max: 20})
    .withMessage("El nombre debe tener entre 3 y 20 caracteres"),
    check('descripcion')
      .isLength({ min: 10 })
      .withMessage('La descripción debe tener al menos 10 caracteres'),
    check('precio')
      .isNumeric()
      .withMessage('El precio debe ser un número')
      .custom((value) => value >= 0)
      .withMessage('El precio no puede ser negativo'),
    check('imageUrl')
      .isURL()
      .withMessage('La URL de la imagen no es válida'),
];
export const mongoIdValidator: Array<ValidationChain> =[
  check("id")
  .isMongoId()
  .withMessage("El ID proporcionado no es válido para MongoDB.")]; 