const connection = require('../config/mysql')

module.exports = {
  queryHelper: (...argument) => {
    return new Promise((resolve, reject) => {
      connection.query(...argument, (error, result) => {
        if (!error) {
          resolve(result)
          // console.log(...argument)
        } else {
          // console.log(error)
          reject(new Error(error))
        }
      })
    })
  }
}
