import express from "express";
import authMiddleware from "../middleware/authmiddleware.js";
import allowRoles from "../middleware/roles.js";

import {
  getUsers,
  createUser,
  updateUserRole,
  updateUserStatus
} from "../controllers/usercontroller.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  allowRoles("admin"),
  getUsers
);

router.post(
  "/",
  authMiddleware,
  allowRoles("admin"),
  createUser
);

router.patch(
  "/:id/role",
  authMiddleware,
  allowRoles("admin"),
  updateUserRole
);

router.patch(
  "/:id/status",
  authMiddleware,
  allowRoles("admin"),
  updateUserStatus
);

export default router;