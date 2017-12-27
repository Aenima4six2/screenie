
module.exports.sleep = async (interval = 1000) => {
  await new Promise((res) => {
    setTimeout(() => res(), interval)
  })
}

module.exports.retryPromise = async ({ operation, tries = 5, onRetry }) => {
  if (tries <= 0) throw new Error('Tries must be greater than zero!')

  let counter = 0
  while (counter <= tries) {
    try {
      return await operation()
    } catch (err) {
      counter++
      if (counter > tries) throw err
      await module.exports.sleep()
      if (onRetry) onRetry(counter)
    }
  }
}