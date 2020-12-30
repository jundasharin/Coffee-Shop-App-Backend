const connection = require('../config/mysql')
const { queryHelper } = require('../helper/query')
const sql = 'SELECT detailhistory.detailHistory_id, detailhistory.history_id, history.user_id, product.product_name, product.product_price, detailhistory.orderqty FROM ((detailhistory INNER JOIN history ON detailhistory.detailHistory_id = history.history_id) INNER JOIN product ON detailhistory.product_id = product.product_id)'

module.exports = {
  getDetailHistoryModel: (limit, offset, sort, search) => {
    const pagination = `LIMIT ${limit} OFFSET ${offset}`
    const orderBy = sort != null ? `ORDER BY ${sort}` : ''
    const searching = search != null ? `WHERE detailhistory.user_id LIKE '${search} OR product.product_name '%${search}%` : ' '
    return queryHelper(`${sql} ${orderBy} ${searching} ${pagination}`)
  },
  getDetailHistoryByHistoryIdModel: (id) => {
    return queryHelper(`${sql} WHERE history_id = ?`, id)
  },
  postDetailHistoryModel: (setData) => {
    return queryHelper('INSERT INTO history set ?', setData)
  },
  getDetailHistoryCountModel: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT COUNT(*) AS total FROM history',
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error))
        })
    })
  },
  deleteDetailHistoryModel: (id) => {
    return queryHelper('DELETE FROM detailhistory WHERE ?', id)
  }
}
