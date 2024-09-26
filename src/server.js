const express = require('express');
const connectToMongo = require('./config/database');
const errorHandler = require('./middleware/errorHandler');
const jutsuScrollRoutes = require('./routes/jutsuScrollRoutes');
const ninjaRoutes = require('./routes/ninjasRoutes');
const empruntRoutes = require('./routes/empruntsRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const app = express();
const port = 3000;

const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'API Ninja Library',
        version: '1.0.0',
        description: 'Documentation de l\'API pour gérer une bibliothèque de jutsu',
      },
      servers: [
        {
          url: 'http://localhost:3000',
        },
      ],
    },
    apis: ['./src/routes/*.js'],
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use(express.json());

connectToMongo().then(db => {
  app.locals.db = db;

  app.use('/api/v1/jutsuScrolls', jutsuScrollRoutes);
  app.use('/api/v1/ninjas', ninjaRoutes);
  app.use('/api/v1/emprunts', empruntRoutes);

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  app.use(errorHandler);

  app.listen(port, () => console.log(`Serveur en écoute sur le port ${port}`));
});
