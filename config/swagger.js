// import swaggerJsdoc from "swagger-jsdoc";

// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Expense Tracker API",
//       version: "1.0.0",
//       description: "API documentation"
//     },
//     servers: [
//       {
//         url: "http://localhost:5000/api"
//       }
//     ]
//   },
//   apis: ["./routes/*.js"]
// };

// const swaggerSpec = swaggerJsdoc(options);

// export default swaggerSpec;
import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Expense Tracker API",
      version: "1.0.0",
      description: "API documentation for Expense Tracker backend"
    },
    servers: [
      {
        url: "https://zorvyn-assignment-c46n.onrender.com"
      }
    ],
    tags: [
      { name: "Auth", description: "Authentication APIs" },
      { name: "Dashboard", description: "Dashboard analytics APIs" },
      { name: "Records", description: "Financial records APIs" },
      { name: "Users", description: "User management APIs" }
    ],
    paths: {

      "/api/auth/register": {
        post: {
          tags: ["Auth"],
          summary: "Register new user",
          responses: {
            201: { description: "User registered successfully" }
          }
        }
      },

      "/api/auth/login": {
        post: {
          tags: ["Auth"],
          summary: "Login user",
          responses: {
            200: { description: "Login successful" }
          }
        }
      },

      "/api/dashboard/summary": {
        get: {
          tags: ["Dashboard"],
          summary: "Get income, expense and balance"
        }
      },

      "/api/dashboard/category-summary": {
        get: {
          tags: ["Dashboard"],
          summary: "Get spending grouped by category"
        }
      },

      "/api/dashboard/monthly-trends": {
        get: {
          tags: ["Dashboard"],
          summary: "Get income vs expense monthly trends"
        }
      },

      "/api/dashboard/overview": {
        get: {
          tags: ["Dashboard"],
          summary: "Get complete dashboard overview"
        }
      },

      "/api/records": {
        get: {
          tags: ["Records"],
          summary: "Get all records (supports pagination, filtering, sorting)"
        },
        post: {
          tags: ["Records"],
          summary: "Create new record (Admin only)"
        }
      },

      "/api/records/{id}": {
        get: {
          tags: ["Records"],
          summary: "Get record by ID"
        },
        patch: {
          tags: ["Records"],
          summary: "Update record"
        },
        delete: {
          tags: ["Records"],
          summary: "Soft delete record"
        }
      },

      "/api/users": {
        get: {
          tags: ["Users"],
          summary: "Get all users (Admin only)"
        },
        post: {
          tags: ["Users"],
          summary: "Create user (Admin only)"
        }
      },

      "/api/users/{id}/role": {
        patch: {
          tags: ["Users"],
          summary: "Update user role"
        }
      },

      "/api/users/{id}/status": {
        patch: {
          tags: ["Users"],
          summary: "Update user status"
        }
      }

    }
  },
  apis: []
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
