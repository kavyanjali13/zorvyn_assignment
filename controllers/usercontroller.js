import * as userService from "../services/userService.js";
import { successResponse } from "../utils/apiresponse.js";

export const getUsers = async (req, res, next) => {
  try {

    const users = await userService.getUsers();

    successResponse(res, users, "Users fetched");

  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {

    const user = await userService.createUser(req.body);

    successResponse(res, user, "User created");

  } catch (error) {
    next(error);
  }
};

export const updateUserRole = async (req, res, next) => {
  try {

    const user = await userService.updateUserRole(
      req.params.id,
      req.body.role
    );

    successResponse(res, user, "User role updated");

  } catch (error) {
    next(error);
  }
};

export const updateUserStatus = async (req, res, next) => {
  try {

    const user = await userService.updateUserStatus(
      req.params.id,
      req.body.status
    );

    successResponse(res, user, "User status updated");

  } catch (error) {
    next(error);
  }
};