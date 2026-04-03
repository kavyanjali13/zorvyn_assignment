import Record from "../modals/record.js";

export const createRecord = async (data) => {
  return await Record.create(data);
};

export const getRecords = async (query) => {

  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;

  const filters = { isDeleted: false };

  if (query.type) filters.type = query.type;
  if (query.category) filters.category = query.category;

  if (query.startDate && query.endDate) {
    filters.date = {
      $gte: new Date(query.startDate),
      $lte: new Date(query.endDate)
    };
  }

    const sortField = query.sort || "-date";

  const totalRecords = await Record.countDocuments(filters);

  const records = await Record.find(filters)
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ date: -1 });

  return {
    page,
    limit,
    totalRecords,
    totalPages: Math.ceil(totalRecords / limit),
    records
  };
};

export const getRecordById = async (id) => {
  return await Record.findById(id);
};

export const updateRecord = async (id, data) => {
  return await Record.findByIdAndUpdate(id, data, { new: true });
};

export const deleteRecord = async (id) => {
  return await Record.findByIdAndUpdate(id, { isDeleted: true });
};