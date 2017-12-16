const convertErrorToObject = (err) => {
  const errorObject = {}
  Object.getOwnPropertyNames(err || errorObject).forEach((key) => {
    const target = err[key]
    if (target instanceof Error) {
      errorObject[key] = convertErrorToObject(target)
    } else if (!key.startsWith('_')) {
      errorObject[key] = target
    }
  })
  return errorObject
}

module.exports = convertErrorToObject
