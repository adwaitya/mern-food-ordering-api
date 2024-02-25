import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const handleValidationErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
  }
  next();
};

export const validateUserRequest = [
  body("name").isString().notEmpty().withMessage("Name must be a string"),
  body("city").isString().notEmpty().withMessage("City must be a string"),
  body("addressLine1")
    .isString()
    .notEmpty()
    .withMessage("Address Line1 must be a string"),
  body("country")
    .isString()
    .notEmpty()
    .withMessage("Country Line1 must be a string"),
  handleValidationErrors,
];
