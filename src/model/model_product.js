const connection = require('../config/mysql')
const { queryHelper } = require('../helper/query')
const sql = 'SELECT * FROM product JOIN category ON product.category_id = category.category_id'

module.exports = {
  getProductModel: (limit, offset, sort, search) => {
    const pagination = `LIMIT ${limit} OFFSET ${offset}`
    const orderBy = sort != null ? `ORDER BY ${sort}` : ''
    const searching = search != null ? `WHERE product_name LIKE '%${search}%' OR category.category_name LIKE '%${search}%'` : ' '
    return queryHelper(`${sql} ${orderBy} ${searching} ${pagination}`)
  },
  getProductByIdModel: (id) => {
    return queryHelper('SELECT * FROM product WHERE product_id = ?', id)
  },
  postProductModel: (setData) => {
    return queryHelper('INSERT INTO product SET ?', setData)
  },
  patchProductModel: (setData, id) => {
    return queryHelper('UPDATE product SET ? WHERE product_id = ?', [setData, id])
  },
  deleteProductModel: (id) => {
    return queryHelper('DELETE FROM `product` WHERE ?', id)
  },
  getProductCountModel: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT COUNT(*) AS total FROM product',
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error))
        })
    })
  }
}
