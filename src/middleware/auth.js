const jwt = require('jsonwebtoken')
const helper = require('../helper/response')

module.exports = {
  authorization: (request, response, next) => {
    let token = request.headers.authorization
    // proses 1 check apakah header dimaksukan
    if (token) {
      token = token.split(' ')[1]
      jwt.verify(token, 'PRIVACY', (error, result) => {
        if (
          (error && error.name === 'JsonWebTokenError') || (error && error.name === 'TokenExpiredToken')
        ) {
          console.log(error)
          return helper.response(response, 400, error.message)
        } else {
          console.log(result)
          request.token = result
          next()
        }
      })
    } else {
      return helper.response(response, 400, 'Please Login First!')
    }
  },
  isAdmin: (request, response, next) => {
    console.log('middleware isAdmin')
    console.log(request.decodeToken)
    next()
  }
}
