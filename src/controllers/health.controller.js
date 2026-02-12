const { success } = require('../utils/response');

function healthCheck(req, res) {
  return success(res, {
    service: 'API',
    status: 'ok',
    timestamp: new Date().toISOString()
  });
}

module.exports = {
  healthCheck
};
