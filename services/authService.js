
import User from "../modals/userModel.js";

import bcrypt from "bcryptjs";

import generateToken from "../utils/generateToken.js";


export const register = async (name, email, password,role) => {

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: role || "viewer"
  });

  const token = generateToken(user);

  return { user, token };
};


export const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) throw new Error("User not found");

  const match = await bcrypt.compare(password, user.password);

  if (!match) throw new Error("Invalid password");

  const token = generateToken(user);

  return { user, token };
};