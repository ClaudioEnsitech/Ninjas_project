function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send({ error: 'Quelque chose d\'innatendu s\'est produit !' });
  }
  
  module.exports = errorHandler;
  
  