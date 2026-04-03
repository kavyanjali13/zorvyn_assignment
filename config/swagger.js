
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

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },

    security: [{ bearerAuth: [] }],

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
          requestBody: {
            required: true,
            content: {
              "application/json": {
                example: {
                  name: "Anjali",
                  email: "anjali@test.com",
                  password: "123456",
                  role:"admin"
                }
              }
            }
          },
          responses: {
            201: { description: "User registered successfully" }
          }
        }
      },

      "/api/auth/login": {
        post: {
          tags: ["Auth"],
          summary: "Login user",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                example: {
                  email: "anjali@test.com",
                  password: "123456"
                }
              }
            }
          },
          responses: {
            200: { description: "Login successful" }
          }
        }
      },

      "/api/dashboard/summary": {
        get: {
          tags: ["Dashboard"],
          summary: "Get total income, expense and balance"
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
          summary: "Get records with filtering, pagination, sorting and search",
          parameters: [
            {
              name: "page",
              in: "query",
              schema: { type: "integer" },
              description: "Page number"
            },
            {
              name: "limit",
              in: "query",
              schema: { type: "integer" },
              description: "Number of records per page"
            },
            {
              name: "type",
              in: "query",
              schema: { type: "string" },
              description: "Filter by record type (income/expense)"
            },
            {
              name: "category",
              in: "query",
              schema: { type: "string" },
              description: "Filter by category"
            },
            {
              name: "search",
              in: "query",
              schema: { type: "string" },
              description: "Search records by category or notes"
            },
            {
              name: "sort",
              in: "query",
              schema: { type: "string" },
              description: "Sort by field (example: -amount, -date)"
            }
          ]
        },

        post: {
          tags: ["Records"],
          summary: "Create new record (Admin only)",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                example: {
                  amount: 2300,
                  type: "expense",
                  category: "groceries",
                  date: "2026-02-06",
                  notes: "Weekly grocery shopping"
                }
              }
            }
          }
        }
      },

      "/api/records/{id}": {
        get: {
          tags: ["Records"],
          summary: "Get record by ID",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" }
            }
          ]
        },

        patch: {
          tags: ["Records"],
          summary: "Update record",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" }
            }
          ]
        },

        delete: {
          tags: ["Records"],
          summary: "Soft delete record",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" }
            }
          ]
        }
      },

      "/api/users": {
        get: {
          tags: ["Users"],
          summary: "Get all users (Admin only)"
        }
      },

      "/api/users/{id}": {
        patch: {
          tags: ["Users"],
          summary: "Update user role/status/name/email",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" }
            }
          ]
        }
      }

    }
  },
  apis: []
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
