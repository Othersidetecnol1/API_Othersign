const healthRoutes = require('./health.routes');

module.exports = (app) => {
  app.use(healthRoutes);
};
