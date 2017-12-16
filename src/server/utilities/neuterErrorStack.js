const neuterErrorStack = (error) => {
  for (let prop in error) {
    if (prop === 'stack') {
      delete error[prop]
    } else if (typeof error[prop] === 'object') {
      neuterErrorStack(error[prop])
    }
  }

  return error
}

module.exports = neuterErrorStack
