import express from "express";
import RestaurantController from "../controllers/RestaurantController";
import multer from "multer";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateRestaurantRequest } from "../middleware/validation";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5mb
  },
});
// /api/resturant
router.post(
  "/",
  validateRestaurantRequest,
  jwtCheck,
  jwtParse,
  upload.single("imageFile"),
  RestaurantController.createRestaurant
);

export default router;
