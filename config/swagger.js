const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Land Management API",
      version: "1.0.0",
      description: `
        🏞️ **Land Management API**
        
        A comprehensive blockchain-based API for managing land tokenization, plot transfers, and smart contract operations.
        
        ## Features:
        - 🔍 **Getter Routes**: View blockchain data (treasury, lands, plots)
        - ⚡ **Setter Routes**: Execute blockchain transactions  
        - 📊 **Plot Routes**: Advanced plot management operations
        
        ## Authentication:
        Currently open API - no authentication required.
        
        ## Base URL:
        \`http://localhost:8000\`
      `,
      contact: {
        name: "Land Management API Support",
        email: "support@landmanagement.com",
      },
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
      },
    },
    servers: [
      {
        url: "http://localhost:8000",
        description: "Development server",
      },
      {
        url: "https://api.landmanagement.com",
        description: "Production server (if deployed)",
      },
    ],
    tags: [
      {
        name: "Treasury",
        description: "Treasury wallet operations",
      },
      {
        name: "Land",
        description: "Land token information and management",
      },
      {
        name: "Plot",
        description: "Plot account operations and shareholder management",
      },
      {
        name: "Transfer",
        description: "Transfer requests and approvals",
      },
      {
        name: "Admin",
        description: "Administrative functions (contract management)",
      },
      {
        name: "Token",
        description: "Token creation and URI management",
      },
    ],
    components: {
      schemas: {
        // Success Response Schema
        ApiResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            message: {
              type: "string",
              example: "Operation completed successfully",
            },
            data: {
              type: "object",
              description: "Response data (varies by endpoint)",
            },
            timestamp: {
              type: "string",
              format: "date-time",
              example: "2024-01-15T10:30:00.000Z",
            },
          },
        },

        // Error Response Schema
        ErrorResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            error: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  example: "Operation failed",
                },
                details: {
                  type: "string",
                  example: "Detailed error description",
                },
                code: {
                  type: "string",
                  example: "CALL_EXCEPTION",
                },
                timestamp: {
                  type: "string",
                  format: "date-time",
                },
                endpoint: {
                  type: "string",
                  example: "/api/getter/get-treasury",
                },
              },
            },
          },
        },

        // Transaction Schema
        Transaction: {
          type: "object",
          properties: {
            hash: {
              type: "string",
              example: "0x1234567890abcdef1234567890abcdef12345678",
            },
            from: {
              type: "string",
              example: "0x742d35Cc6634C0532925a3b8D2DE0f87b7b82fd0",
            },
            to: {
              type: "string",
              example: "0x1B8683e1885B3ee93524cD58BC10Cf3Ed6af4298",
            },
            gasUsed: {
              type: "string",
              example: "21000",
            },
            status: {
              type: "number",
              example: 1,
            },
          },
        },

        // Ethereum Address Schema
        EthereumAddress: {
          type: "string",
          pattern: "^0x[a-fA-F0-9]{40}$",
          example: "0x742d35Cc6634C0532925a3b8D2DE0f87b7b82fd0",
          description: "Valid Ethereum address (42 characters, starts with 0x)",
        },

        // Land Info Schema
        LandInfo: {
          type: "object",
          properties: {
            tokenId: {
              type: "string",
              example: "1",
            },
            blockInfo: {
              type: "string",
              example: "Block A1",
            },
            parcelInfo: {
              type: "string",
              example: "Parcel P1",
            },
            blockParcelTokenURI: {
              type: "string",
              example: "https://example.com/token/1",
            },
            totalSupply: {
              type: "string",
              example: "1000",
            },
          },
        },

        // Plot Info Schema
        PlotInfo: {
          type: "object",
          properties: {
            plotId: {
              type: "string",
              example: "1",
            },
            plotAccount: {
              type: "string",
              example: "0x742d35Cc6634C0532925a3b8D2DE0f87b7b82fd0",
            },
            parcelIds: {
              type: "array",
              items: {
                type: "string",
              },
              example: ["101", "102", "103"],
            },
            parcelAmounts: {
              type: "array",
              items: {
                type: "string",
              },
              example: ["1000", "800", "1200"],
            },
          },
        },
      },

      // Common Parameters
      parameters: {
        TokenId: {
          name: "tokenId",
          in: "path",
          required: true,
          description: "The ID of the land token",
          schema: {
            type: "integer",
            minimum: 1,
            example: 1,
          },
        },
        PlotId: {
          name: "plotId",
          in: "path",
          required: true,
          description: "The ID of the plot",
          schema: {
            type: "integer",
            minimum: 1,
            example: 1,
          },
        },
        EthereumAddressParam: {
          name: "userAddress",
          in: "path",
          required: true,
          description: "Ethereum wallet address",
          schema: {
            $ref: "#/components/schemas/EthereumAddress",
          },
        },
      },
    },
  },
  apis: ["./routes/*.js", "./index.js"], // paths to files containing OpenAPI definitions
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
