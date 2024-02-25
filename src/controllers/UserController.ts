import { Request, Response } from "express";
import User from "../models/user";

const createCurrentUser = async (req: Request, res: Response) => {
  // 1. if the user exits
  // 2. create the user if it does not exits
  // 3. retrun the user object
  try {
    const { auth0Id } = req.body;
    const exitingUser = await User.findOne({ auth0Id });
    if (exitingUser) {
      return res.status(200).send();
    }
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser.toObject());
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ message: "Error creating user" });
  }
};

export default {
  createCurrentUser,
};
