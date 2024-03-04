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
  upload.single("imageFile"),
  validateRestaurantRequest,
  jwtCheck,
  jwtParse,
  RestaurantController.createRestaurant
);
router.get("/", jwtCheck, jwtParse, RestaurantController.getMyRestaurant);

export default router;
