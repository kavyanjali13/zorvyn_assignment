import express from "express";

import authMiddleware from "../middleware/authmiddleware.js";
import allowRoles from "../middleware/roles.js";

import {
  createRecord,
  getRecords,
  getRecordById,
  updateRecord,
  deleteRecord
} from "../controllers/recordcontroller.js";

const router = express.Router();

/*
Admin can create financial records
*/
router.post(
  "/",
  authMiddleware,
  allowRoles("admin"),
  createRecord
);

/*
Admin + Analyst can view records
*/
router.get(
  "/",
  authMiddleware,
  allowRoles("admin", "analyst"),
  getRecords
);

/*
View specific record
*/
router.get(
  "/:id",
  authMiddleware,
  allowRoles("admin", "analyst"),
  getRecordById
);

/*
Only admin can update
*/
router.patch(
  "/:id",
  authMiddleware,
  allowRoles("admin"),
  updateRecord
);

/*
Soft delete
*/
router.delete(
  "/:id",
  authMiddleware,
  allowRoles("admin"),
  deleteRecord
);

export default router;