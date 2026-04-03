import User from "../modals/userModel.js";
import bcrypt from "bcryptjs";

export const getUsers = async () => {
  return await User.find().select("-password");
};

export const createUser = async (data) => {

  const { name, email, password, role } = data;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role
  });

  return user;
};

export const updateUserRole = async (id, role) => {
  return await User.findByIdAndUpdate(
    id,
    { role },
    { new: true }
  ).select("-password");
};

export const updateUserStatus = async (id, status) => {
  return await User.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  ).select("-password");
};