const healthRoutes = require('../health.routes');
const exampleRoutes = require('../example.routes');

module.exports = (app) => {
  app.use('/api/v1', healthRoutes);
  app.use('/api/v1', exampleRoutes);
};
