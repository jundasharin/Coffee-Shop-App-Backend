const connection = require('../config/mysql')
const { queryHelper } = require('../helper/query')
const sql = 'SELECT * FROM history JOIN paymentmethod ON paymentmethod.paymentMethod_id = history.paymentMethod_id'

module.exports = {
  getHistoryModel: (limit, offset, sort, search) => {
    const pagination = `LIMIT ${limit} OFFSET ${offset}`
    const orderBy = sort != null ? `ORDER BY ${sort}` : ''
    const searching = search != null ? `WHERE paymentmethod.info LIKE '%${search}%' OR history_createdAt='${search}'` : ' '
    return queryHelper(`${sql} ${orderBy} ${searching} ${pagination}`)
  },
  getHistoryByUserIdModel: (id) => {
    return queryHelper(`${sql} WHERE user_id = ?`, id)
  },
  postHistoryModel: (setData) => {
    return queryHelper('INSERT INTO history set ?', setData)
  },
  getHistoryCountModel: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT COUNT(*) AS total FROM history',
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error))
        })
    })
  },
  deleteHistoryModel: (id) => {
    return queryHelper('DELETE FROM history WHERE ?', id)
  }
}
