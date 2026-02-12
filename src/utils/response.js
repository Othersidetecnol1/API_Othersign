function success(res, data = {}, statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    data
  });
}

function fail(res, error = 'Erro interno', statusCode = 500) {
  return res.status(statusCode).json({
    success: false,
    error
  });
}

module.exports = {
  success,
  fail
};
