module.exports = (req, res, next) => {
  res.header('Content-Type', 'application/hal+json')
  next()
}