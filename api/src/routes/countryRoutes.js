const { Router } = require('express');
const { getCountries, getCountryByQuery, getCountryByID } = require('../controllers/countryControllers')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const countryRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

countryRouter.get('/', getCountries)

countryRouter.get('/name', getCountryByQuery)

countryRouter.get('/:idPais', getCountryByID)

module.exports = countryRouter;
