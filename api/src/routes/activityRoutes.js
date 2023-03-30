const { Router } = require('express');
const { getActivities, postActivities } = require('../controllers/activityControllers');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const activityRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

activityRouter.get('/', getActivities);

activityRouter.post('/', postActivities)

module.exports = activityRouter;
