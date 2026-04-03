import { monthlyTrends, getSummary, categorySummary, getOverview } from "../services/dashboardService.js";
import { successResponse } from "../utils/apiresponse.js";

export const getMonthlyTrends = async (req, res, next) => {
  try {

    const data = await monthlyTrends();

    const months = [
      "", "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec"
    ];

    const monthMap = {};

    data.forEach(item => {
      monthMap[item._id] = {
        month: months[item._id],
        income: item.income,
        expense: item.expense
      };
    });

    const formatted = [];

    for (let i = 1; i <= 12; i++) {
      formatted.push(
        monthMap[i] || { month: months[i], income: 0, expense: 0 }
      );
    }

    successResponse(res, formatted, "Monthly trends fetched");

  } catch (error) {
    next(error);
  }
};


export const summary = async (req, res, next) => {
  try {

    const data = await getSummary();

    successResponse(res, data, "Dashboard summary fetched");

  } catch (error) {
    next(error);
  }
};



export const getCategorySummary = async (req, res, next) => {
  try {

    const data = await categorySummary();

    successResponse(res, data, "Category summary fetched");

  } catch (error) {
    next(error);
  }
};


export const overview = async (req, res, next) => {
  try {

    const data = await getOverview();

    successResponse(res, data, "Dashboard overview fetched");

  } catch (error) {
    next(error);
  }
};