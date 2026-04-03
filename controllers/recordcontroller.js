import * as recordService from "../services/recordService.js";
import { successResponse } from "../utils/apiresponse.js";

export const createRecord = async (req, res, next) => {
  try {

    const record = await recordService.createRecord({
      ...req.body,
      userId: req.user.id
    });

    successResponse(res, record, "Record created");

  } catch (error) {
    next(error);
  }
};

export const getRecords = async (req, res, next) => {
  try {

    const records = await recordService.getRecords(req.query);

    successResponse(res, records, "Records fetched");

  } catch (error) {
    next(error);
  }
};

export const getRecordById = async (req, res, next) => {
  try {

    const record = await recordService.getRecordById(req.params.id);

    successResponse(res, record, "Record fetched");

  } catch (error) {
    next(error);
  }
};

export const updateRecord = async (req, res, next) => {
  try {

    const record = await recordService.updateRecord(
      req.params.id,
      req.body
    );

    successResponse(res, record, "Record updated");

  } catch (error) {
    next(error);
  }
};

export const deleteRecord = async (req, res, next) => {
  try {

    await recordService.deleteRecord(req.params.id);

    successResponse(res, null, "Record deleted");

  } catch (error) {
    next(error);
  }
};