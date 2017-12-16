const fs = require('fs')
const path = require('path')

module.exports.getNonIndexJsFilesSync = (dir) => fs.readdirSync(dir)
  .filter(file => path.basename(file) !== 'index.js')
  .filter(file => path.extname(file) === '.js')
  .map(file => path.join(dir, file))

module.exports.getNonIndexJsFiles = (dir) => new Promise((res, rej) => {
  fs.readdir(dir, (err, files) => {
    if (err) rej(err)
    else {
      const nonIndexJsFiles = files
        .filter(file => path.basename(file) !== 'index.js')
        .filter(file => path.extname(file) === '.js')
        .map(file => path.join(dir, file))
      res(nonIndexJsFiles)
    }
  })
})