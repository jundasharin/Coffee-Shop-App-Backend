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
  isAdmin: (req, res, next) => {
    let token = req.headers.authorization
    if (!token) {
      return helper.response(res, 400, 'please login first')
    } else {
      token = token.split(' ')[1]
      jwt.verify(token, 'sayang', (error, result) => {
        if (
          (error && error.name === 'JsonWebTokenError') ||
          (error && error.name === 'TokenExpiredError')
        ) {
          console.log(error)
          return helper.response(res, 400, error.message)
        } else {
          console.log(result.roleId)
          if (result.roleId !== 1) {
            return helper.response(res, 400, 'you cannot access this end point')
          } else {
            req.token = result
            next()
          }
        }
      })
    }
  }
}
