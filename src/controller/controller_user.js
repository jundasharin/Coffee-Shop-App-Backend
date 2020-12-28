const bcrypt = require('bcrypt')
const helper = require('../helper/response')
const jwt = require('jsonwebtoken')
const { registerUserModel, checkEmailModel } = require('../model/model_user')

module.exports = {
  registerUser: async (request, response) => {
    try {
      const { user_name, user_email, user_password } =
          request.body
      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(user_password, salt)
      // console.log('before Encrypt = ' + user_password)
      // console.log('after encrypt = ' + encryptPassword)
      const setData = {
        user_name,
        user_email,
        user_password: encryptPassword
      }
      const result = await registerUserModel(setData)
      return helper.response(response, 200, 'Success Register User', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  loginUser: async (request, response) => {
    try {
      const { user_email, user_password } = request.body
      const checkDataUser = await checkEmailModel(user_email)
      // console.log(checkDataUser)
      if (checkDataUser.length > 0) {
        const checkPassword = bcrypt.compareSync(user_password, checkDataUser[0].user_password)
        if (checkPassword) {
          const { user_id, user_name, user_email } = checkDataUser[0]
          const payload = {
            user_id,
            user_name,
            user_email
          }
          const token = jwt.sign(payload, 'PRIVACY', { expiresIn: '1h' })
          const result = { ...payload, token }
          return helper.response(response, 200, 'Success Login!', result)
        } else {
          return helper.response(response, 400, 'Wrong Password!')
        }
      } else {
        return helper.response(response, 400, 'Email/account not Registed!')
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  }
}
