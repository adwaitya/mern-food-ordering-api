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

const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    const { name, addressLine1, country, city } = req.body;
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.name = name;
    user.addressLine1 = addressLine1;
    user.city = city;
    user.country = country;
    await user.save();
    res.send(user);
  } catch (error) {
    console.log("Failed to update user profile", error);
    res.status(500).json({ message: "Error updating  user" });
  }
};

export default {
  createCurrentUser,
  updateCurrentUser,
};
