const { queryHelper } = require('../helper/query')

module.exports = {
  registerUserModel: (setData) => {
    return queryHelper('INSERT INTO user SET ?', setData)
  },
  checkEmailModel: (email) => {
    return queryHelper('SELECT * FROM user WHERE user_email = ?', email)
  },
  getUserbyIdModel: (id) => {
    return queryHelper('SELECT * FROM user WHERE user_id = ?', id)
  },
  patchUserModel: (setData, id) => {
    return queryHelper('UPDATE user SET ? WHERE user_id = ?', [setData, id])
  },
  deleteUserModel: (id) => {
    return queryHelper('DELETE FROM user WHERE user_id =?', id)
  }
}
