import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Swagger configuration
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",   
        info: {
            title: "E-commerce-Store API",
            version: "1.0.0",
            description: "API documentation for e-commerce App",
        },
        servers: [
            {
                url: "http://localhost:5000",   
                description: "Development server",
            },
        ],
    },
    apis: ["./routes/api/*.js"]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
// console.log(JSON.stringify(swaggerSpec, null, 2));  

export default (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
