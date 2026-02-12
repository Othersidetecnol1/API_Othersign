const { success } = require('../utils/response');

function example(req, res) {
  return success(res, {
    message: 'Contrato de API ativo'
  });
}

module.exports = {
  example
};
