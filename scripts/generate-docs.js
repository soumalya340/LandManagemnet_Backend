const fs = require("fs");
const path = require("path");
const swaggerJsdoc = require("swagger-jsdoc");

// Import swagger configuration
const { specs } = require("../config/swagger");

// Generate the swagger JSON
const swaggerDocument = specs;

// Create the HTML template
const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Land Management API Documentation</title>
    <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui-bundle.css" />
    <link rel="icon" type="image/png" href="https://swagger.io/favicon.ico" sizes="32x32" />
    <style>
        html {
            box-sizing: border-box;
            overflow: -moz-scrollbars-vertical;
            overflow-y: scroll;
        }
        *, *:before, *:after {
            box-sizing: inherit;
        }
        body {
            margin:0;
            background: #fafafa;
        }
        .swagger-ui .topbar { display: none }
        .swagger-ui .info { margin: 20px 0; }
        .swagger-ui .info .title { color: #3b4151; font-size: 36px; }
        .swagger-ui .scheme-container { background: #4990e2; padding: 15px 0; }
    </style>
</head>
<body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui-bundle.js"></script>
    <script src="https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui-standalone-preset.js"></script>
    <script>
        window.onload = function() {
            // Update the servers based on GitHub Pages URL
            const swaggerDocument = ${JSON.stringify(swaggerDocument, null, 2)};
            
            // Update servers for GitHub Pages deployment
            const githubPagesUrl = window.location.origin;
            swaggerDocument.servers = [
                {
                    url: "https://your-backend-api-url.vercel.app", // Replace with your actual backend URL
                    description: "Production API Server"
                },
                {
                    url: "http://localhost:8000",
                    description: "Development server"
                }
            ];

            const ui = SwaggerUIBundle({
                spec: swaggerDocument,
                dom_id: '#swagger-ui',
                deepLinking: true,
                presets: [
                    SwaggerUIBundle.presets.apis,
                    SwaggerUIStandalonePreset
                ],
                plugins: [
                    SwaggerUIBundle.plugins.DownloadUrl
                ],
                layout: "StandaloneLayout",
                validatorUrl: null,
                supportedSubmitMethods: ['get', 'post', 'put', 'delete', 'patch'],
                onComplete: function() {
                    console.log("Swagger UI loaded successfully");
                },
                onFailure: function(data) {
                    console.error("Failed to load Swagger UI", data);
                }
            });
        };
    </script>
</body>
</html>
`;

// Create docs directory if it doesn't exist
const docsDir = path.join(__dirname, "../docs");
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

// Write the HTML file
const outputPath = path.join(docsDir, "index.html");
fs.writeFileSync(outputPath, htmlTemplate);

// Also create a swagger.json file
const jsonPath = path.join(docsDir, "swagger.json");
fs.writeFileSync(jsonPath, JSON.stringify(swaggerDocument, null, 2));

console.log("✅ Static documentation generated successfully!");
console.log(`📁 Documentation files created in: ${docsDir}`);
console.log(`🌐 index.html: ${outputPath}`);
console.log(`📄 swagger.json: ${jsonPath}`);
console.log("");
console.log("📋 Next steps:");
console.log("1. Update the backend API URL in the generated HTML file");
console.log("2. Commit the docs/ folder to your repository");
console.log("3. Enable GitHub Pages to serve from the docs/ folder");
console.log(
  "4. Your documentation will be available at: https://username.github.io/repository-name/"
);
