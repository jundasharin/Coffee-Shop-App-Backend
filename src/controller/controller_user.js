const bcrypt = require('bcrypt')
const helper = require('../helper/response')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const {
  registerUserModel,
  checkEmailModel,
  patchUserModel,
  deleteUserModel,
  getUserbyIdModel
} = require('../model/model_user')
const redis = require('redis')
const client = redis.createClient()

module.exports = {
  registerUser: async (request, response) => {
    try {
      const {
        user_name,
        user_email,
        user_password,
        mobileNumber,
        deliveryAddress,
        displayName,
        firstName,
        lastName,
        birthDate,
        gender_id
      } = request.body
      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(user_password, salt)

      const setData = {
        user_name,
        user_email,
        user_password: encryptPassword,
        mobileNumber,
        deliveryAddress,
        displayName,
        firstName,
        lastName,
        birthDate,
        gender_id,
        image: request.file === undefined ? '' : request.file.filename
      }
      const result = await registerUserModel(setData)
      return helper.response(response, 200, 'Success Register User', result)
    } catch (error) {
      console.log(error)
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
  },
  getUserId: async (request, response) => {
    try {
      const { id } = request.params
      const result = await getUserbyIdModel(id)
      if (result.length > 0) {
        client.setex(`getuserbyid:${id}`, 3600, JSON.stringify(result))
        return helper.response(response, 200, 'Success get user by Id', result)
      } else {
        return helper.response(response, 404, `User by Id : ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  patchUser: async (request, response) => {
    try {
      const { id } = request.params
      const {
        user_name,
        user_email,
        user_password,
        mobileNumber,
        deliveryAddress,
        displayName,
        firstName,
        lastName,
        birthDate,
        gender_id
      } = request.body
      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(user_password, salt)

      const setData = {
        user_name,
        user_email,
        user_password: encryptPassword,
        mobileNumber,
        deliveryAddress,
        displayName,
        firstName,
        lastName,
        birthDate,
        gender_id,
        image: request.file === undefined ? '' : request.file.filename
      }

      const deleteImg = await getUserbyIdModel(id)
      const img = deleteImg[0].image

      if (img !== '') {
        fs.unlink(`uploads/${img}`, (err) => {
          if (err) throw err
          console.log('File Deleted !')
        })

        const result = await patchUserModel(setData, id)
        console.log(result)

        return helper.response(response, 200, `Success Update product id : ${id}`, result)
      } else {
        return helper.response(response, 404, `Product by Id : ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  deleteUser: async (request, response) => {
    try {
      const { id } = request.params
      const deleteImg = await getUserbyIdModel(id)
      const img = deleteImg[0].image

      fs.unlink(`uploads/${img}`, (err) => {
        if (err) throw err
        console.log('File Deleted !')
      })
      const result = await deleteUserModel(id)
      return helper.response(response, 200, `data user id : ${id} deleted`, result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  }
}
