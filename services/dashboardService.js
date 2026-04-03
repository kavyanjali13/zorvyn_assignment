import Record from "../modals/record.js";

export const monthlyTrends = async () => {

  return Record.aggregate([

  {
    $match: { isDeleted: false }
  },

  {
    $group: {
      _id: {
        month: { $month: "$date" },
        type: "$type"
      },
      total: { $sum: "$amount" }
    }
  },

  {
    $group: {
      _id: "$_id.month",
      income: {
        $sum: {
          $cond: [{ $eq: ["$_id.type", "income"] }, "$total", 0]
        }
      },
      expense: {
        $sum: {
          $cond: [{ $eq: ["$_id.type", "expense"] }, "$total", 0]
        }
      }
    }
  },

  {
    $sort: { _id: 1 }
  }

]);
}
export const getSummary = async () => {

  const result = await Record.aggregate([

    {
      $match: { isDeleted: false }
    },

    {
      $group: {
        _id: null,

        totalIncome: {
          $sum: {
            $cond: [
              { $eq: ["$type", "income"] },
              "$amount",
              0
            ]
          }
        },

        totalExpense: {
          $sum: {
            $cond: [
              { $eq: ["$type", "expense"] },
              "$amount",
              0
            ]
          }
        }

      }
    }

  ]);

  const data = result[0] || { totalIncome: 0, totalExpense: 0 };

  return {
    totalIncome: data.totalIncome,
    totalExpense: data.totalExpense,
    netBalance: data.totalIncome - data.totalExpense
  };
};

export const categorySummary = async () => {

  const data = await Record.aggregate([

    {
      $match: {
        type: "expense",
        isDeleted: false
      }
    },

    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" }
      }
    },

    {
      $sort: { total: -1 }
    }

  ]);

  return data.map(item => ({
    category: item._id,
    total: item.total
  }));
};

export const getOverview = async () => {

  const summary = await Record.aggregate([
    {
      $match: { isDeleted: false }
    },
    {
      $group: {
        _id: null,
        totalIncome: {
          $sum: {
            $cond: [{ $eq: ["$type", "income"] }, "$amount", 0]
          }
        },
        totalExpense: {
          $sum: {
            $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0]
          }
        }
      }
    }
  ]);

  const summaryData = summary[0] || { totalIncome: 0, totalExpense: 0 };

  const categories = await Record.aggregate([
    {
      $match: { type: "expense", isDeleted: false }
    },
    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" }
      }
    },
    {
      $sort: { total: -1 }
    }
  ]);

  const monthly = await Record.aggregate([
    {
      $match: { isDeleted: false }
    },
    {
      $group: {
        _id: {
          month: { $month: "$date" },
          type: "$type"
        },
        total: { $sum: "$amount" }
      }
    },
    {
      $group: {
        _id: "$_id.month",
        income: {
          $sum: {
            $cond: [{ $eq: ["$_id.type", "income"] }, "$total", 0]
          }
        },
        expense: {
          $sum: {
            $cond: [{ $eq: ["$_id.type", "expense"] }, "$total", 0]
          }
        }
      }
    },
    {
      $sort: { _id: 1 }
    }
  ]);

  return {
    summary: {
      totalIncome: summaryData.totalIncome,
      totalExpense: summaryData.totalExpense,
      netBalance: summaryData.totalIncome - summaryData.totalExpense
    },

    categorySummary: categories.map(c => ({
      category: c._id,
      total: c.total
    })),

    monthlyTrends: monthly
  };
};