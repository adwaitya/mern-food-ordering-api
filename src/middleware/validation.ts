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

export const validateRestaurantRequest = [
  body("restaurantName")
    .isString()
    .notEmpty()
    .withMessage("Restaurant Name must be a string"),
  body("city").isString().notEmpty().withMessage("City must be a string"),
  body("country").isString().notEmpty().withMessage("Country must be a string"),
  body("delivaryPrice")
    .isFloat({ min: 0 })
    .withMessage("Delivary Price must be a positive number"),
  body("estimateDeliveryTime")
    .isFloat({ min: 0 })
    .withMessage("Estimate Delivery Time must be a positive integer"),
  body("cuisines")
    .isArray()
    .withMessage("Cuisines must be a array")
    .notEmpty()
    .isEmpty()
    .withMessage("Cuisines array cannot be empty"),
  body("menuItems")
    .isArray()
    .withMessage("Menu Items must be a array")
    .notEmpty()
    .isEmpty()
    .withMessage("Menu Items array cannot be empty"),
  body("menuItems.*.name").notEmpty().withMessage("Menu item name is required"),
  body("menuItems.*.price")
    .isFloat({ min: 0 })
    .withMessage("Menu item price is required and must be a positive number"),
  handleValidationErrors,
];
