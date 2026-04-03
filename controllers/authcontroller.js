import { login, register } from "../services/authService.js";

export const registerUser = async (req, res) => {
  try {

    const { name, email, password, role } = req.body;

    const result = await register(name, email, password, role);

    res.status(201).json(result);

  } catch (error) {

    res.status(400).json({
      message: error.message
    });

  }
};

export const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    const result = await login(email, password);

    res.json(result);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};