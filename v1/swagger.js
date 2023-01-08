const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Basic Meta Informations about our API
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Task manager API",
            version: "1.0.0",
            description:
                "This is a simple task manager API application made with Express and documented with Swagger",
            // license: {
            //     name: "MIT",
            //     url: "https://spdx.org/licenses/MIT.html",
            // },
            contact: {
                name: "Lucas Gabriel Ojeda",
                url: "https://lucasgabrielojeda.netlify.app/",
                email: "ojedalucasgabriel2@gmail.com",
            },
        },
        servers: [
            {
                url: "https://task-manager-zchz.onrender.com/api",
            },
            {
                url: "http://localhost:8080/api",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "apiKey",
                    name: "x-token",
                    scheme: "bearer",
                    in: "header",
                },
            },
        },
        security: [
            {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                },
            },
        ],
    },
    apis: [
        "./routes/auth.routes.js",
        "./routes/task.routes.js",
    ],
};

// Docs in JSON format
const swaggerSpec = swaggerJSDoc(options);

// Function to setup our docs
const swaggerDocs = (app, port) => {
    // Route-Handler to visit our docs
    app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    // Make our docs in JSON format available
    app.get("/api/v1/docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });
    console.log(
        "\x1b[36m",
        `Swagger docs are available on /api/v1/docs`
    );
};

module.exports = { swaggerDocs };