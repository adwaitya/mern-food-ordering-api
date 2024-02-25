import express from "express";
import UserController from "../controllers/UserController";


const router = express.Router();

router.post("/", UserController.createCurrentUser);

export default router;