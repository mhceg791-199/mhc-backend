import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MHCEG Page API",
      version: "1.0.0",
      description: "API documentation for MHCEG Page — Canadian Home, Electrical and Supply Solutions e-commerce platform",
      contact: {
        name: "MHCEG Page by MHC",
      },
    },
    servers: [
      { url: "/api", description: "API Server" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Error: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            message: { type: "string" },
          },
        },
        User: {
          type: "object",
          properties: {
            id: { type: "string" },
            email: { type: "string" },
            name: { type: "string" },
            role: { type: "string", enum: ["user", "admin"] },
          },
        },
        Product: {
          type: "object",
          properties: {
            id: { type: "string" },
            sku: { type: "string" },
            name: { type: "string" },
            description: { type: "string" },
            category: { type: "string" },
            subcategory: { type: "string" },
            price: { type: "number" },
            originalPrice: { type: "number" },
            rating: { type: "number" },
            reviewCount: { type: "number" },
            image: { type: "string" },
            images: { type: "array", items: { type: "string" } },
            inStock: { type: "boolean" },
            inventory: { type: "number" },
          },
        },
        CartItem: {
          type: "object",
          properties: {
            productId: { type: "string" },
            sku: { type: "string" },
            name: { type: "string" },
            price: { type: "number" },
            quantity: { type: "number" },
            image: { type: "string" },
          },
        },
        Order: {
          type: "object",
          properties: {
            id: { type: "string" },
            orderNumber: { type: "string" },
            status: { type: "string", enum: ["pending", "processing", "shipped", "delivered", "cancelled"] },
            paymentStatus: { type: "string", enum: ["pending", "paid", "failed", "refunded"] },
            total: { type: "number" },
            items: { type: "array", items: { $ref: "#/components/schemas/CartItem" } },
          },
        },
        Pagination: {
          type: "object",
          properties: {
            page: { type: "number" },
            limit: { type: "number" },
            total: { type: "number" },
            pages: { type: "number" },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
