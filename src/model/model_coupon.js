const connection = require('../config/mysql')
const { queryHelper } = require('../helper/query')
const sql = 'SELECT * FROM coupon'

module.exports = {
  getCouponModel: (limit, offset, sort, search) => {
    const pagination = `LIMIT ${limit} OFFSET ${offset}`
    const orderBy = sort != null ? `ORDER BY ${sort}` : ''
    const searching = search != null ? `WHERE promo_name like '%${search}' OR promo_code like '${search}'` : ''
    return queryHelper(`${sql} ${orderBy} ${searching} ${pagination}`)
  },
  getCouponByIdModel: (id) => {
    return queryHelper(`${sql} WHERE coupon_id = ?`, id)
  },
  postCouponModel: (setData) => {
    return queryHelper('INSERT INTO coupon set ?', setData)
  },
  patchCouponModel: (setData, id) => {
    return queryHelper('UPDATE coupon SET ? WHERE coupon = ?', [setData, id])
  },
  getCouponCountModel: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT COUNT(*) AS total FROM coupon',
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error))
        })
    })
  },
  deleteCouponModel: (id) => {
    return queryHelper('DELETE FROM `coupon` WHERE ?', id)
  }
}
