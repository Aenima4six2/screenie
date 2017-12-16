module.exports.notFound = (req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
}

module.exports.error = (err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
}

module.exports.requestRejectionHandler = (handler) =>
  async (req, res, next) => {
    try {
      return await handler(req, res, next)
    } catch (err) {
      next(err)
    }
  }

module.exports.cors = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
}

module.exports.hal = (req, res, next) => {
  res.header('Content-Type', 'application/hal+json')
  next()
}
  