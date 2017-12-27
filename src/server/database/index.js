const config = require('config')
const mongoConfig = config.get('mongodb')
const mongoUri = mongoConfig.connectionUri
const connectionOptions = { useMongoClient: true, config: { autoIndex: false } }
const path = require('path')
const getNonIndexJsFiles = require('../utilities/fsUtils').getNonIndexJsFiles
const mongoose = require('mongoose')
const logger = require('../logging').create('database')
const utils = require('../utilities/asyncUtils')

mongoose.Promise = global.Promise

module.exports.getCurrentConnection = () => mongoose.connection

module.exports.getModel = (name) => mongoose.model(name)

module.exports.connect = async (tries = 1000) => utils.retryPromise({
  operation: connect, tries, onRetry: (counter) => {
    logger.error(`Retrying operation! Attempt [${counter}] of [${tries}].`)
  }
})

async function connect() {
  logger.info(`Connecting to mongo at ${mongoUri}`)
  try {
    await mongoose.connect(mongoUri, connectionOptions)
  } catch (err) {
    logger.error('Unable to connect to mongo ->', err)
    throw err
  }

  logger.info('Creating Mongoose Models from schema')
  let models
  try {
    models = await createModelsFromSchema()
  } catch (err) {
    logger.error('Unable to create Mongoose Models from schema ->', err)
    throw err
  }

  logger.info('Creating indexes from Models')
  try {
    await createIndexesFromModels(models)
  } catch (err) {
    logger.error('Unable to create to indexes from Models ->', err)
    throw err
  }
}

async function createModelsFromSchema() {
  const dir = path.join(__dirname, 'schema')
  const files = await getNonIndexJsFiles(dir)
  return files.map(file => {
    const target = require(file)

    if (!target.isSql) {
      const instance = mongoose.model(target.name, target.schema)
      return { instance, schema: target.schema, name: target.name }
    }
  }).filter(v => !!v)
}


async function createIndexesFromModels(models) {
  await Promise.all(models.map(model => {
    model.instance.on('index', (error) => {
      if (error) logger.error(`Error creating index on ${model.name} ->`, error)
      else logger.info(`Created index on [${model.name}]`)
    })
    return model.instance.ensureIndexes()
  }))
}
