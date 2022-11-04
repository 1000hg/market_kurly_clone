const swaggerUi = require('swagger-ui-express');
const swaggereJsdoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        info: {
            title: 'Market-Kurly API',
            version: '1.0.0',
            description: 'API with express',
        },
        host: 'localhost:8080',
        basePath: '/'
    },
    apis: ['./routes/*.js', './swagger/*']
};

const specs = swaggereJsdoc(options);
module.exports = {
    swaggerUi,
    specs
};