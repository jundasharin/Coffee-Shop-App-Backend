const {
  getProductModel,
  getProductCountModel,
  getProductByIdModel,
  postProductModel,
  patchProductModel,
  deleteProductModel
} = require('../model/model_product')
const helper = require('../helper/response')
const fs = require('fs')
const qs = require('querystring')
const redis = require('redis')
const client = redis.createClient()

module.exports = {
  getProduct: async (request, response) => {
    try {
      let { page, limit, sort, search } = request.query
      page = parseInt(page)
      limit = parseInt(limit)
      const totalData = await getProductCountModel()
      const totalPage = Math.ceil(totalData / limit)
      const offset = page * limit - limit
      const prevLink = page > 1 ? qs.stringify({ ...request.query, ...{ page: page - 1 } }) : null
      const nextLink = page < totalPage ? qs.stringify({ ...request.query, ...{ page: page + 1 } }) : null
      console.log(request.query)
      console.log(qs.stringify(request.query))

      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData,
        nextLink: nextLink && `http://${process.env.DB_HOST}:${process.env.PORT}/product?${nextLink}`,
        prevLink: prevLink && `http://${process.env.DB_HOST}:${process.env.PORT}/produuct?${prevLink}`
      }
      const result = await getProductModel(limit, offset, sort, search)
      const newData = {
        result,
        pageInfo
      }
      client.setex(`getproduct: ${JSON.stringify(request.query)}`, 3600, JSON.stringify(newData))

      return helper.response(response, 200, 'Success Get Product', result, pageInfo)
      // response.status(200).send(result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  getProductId: async (request, response) => {
    try {
      const { id } = request.params
      const result = await getProductByIdModel(id)
      if (result.length > 0) {
        client.setex(`getproductbyid:${id}`, 3600, JSON.stringify(result))
        return helper.response(response, 200, 'Success get product by Id', result)
      } else {
        return helper.response(response, 404, `Product by Id : ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  postProduct: async (request, response) => {
    try {
      const {
        product_name,
        product_price,
        category_id,
        product_desc,
        size_R,
        size_L,
        size_XL,
        small,
        medium,
        large,
        homedelivery,
        dinein,
        pickup,
        delivery_starthour,
        delivery_endhour,
        product_stock
      } = request.body
      const setData = {
        product_name,
        product_price,
        image: request.file === undefined ? '' : request.file.filename,
        category_id,
        product_desc,
        size_R,
        size_L,
        size_XL,
        small,
        medium,
        large,
        homedelivery,
        dinein,
        pickup,
        delivery_starthour,
        delivery_endhour,
        product_stock
      }
      // console.log(setData)
      const result = await postProductModel(setData)
      return helper.response(response, 200, 'Success insert product', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  patchProduct: async (request, response) => {
    try {
      const { id } = request.params
      const {
        product_name,
        product_price,
        category_id,
        product_desc,
        size_R,
        size_L,
        size_XL,
        small,
        medium,
        large,
        homedelivery,
        dinein,
        pickup,
        delivery_starthour,
        delivery_endhour,
        product_stock
      } = request.body
      const setData = {
        product_name,
        product_price,
        image: request.file === undefined ? '' : request.file.filename,
        category_id,
        product_desc,
        size_R,
        size_L,
        size_XL,
        small,
        medium,
        large,
        homedelivery,
        dinein,
        pickup,
        delivery_starthour,
        delivery_endhour,
        product_stock
      }

      const deleteImg = await getProductByIdModel(id)
      const img = deleteImg[0].image

      if (img !== '') {
        fs.unlink(`uploads/${img}`, (err) => {
          if (err) throw err
          console.log('File Deleted !')
        })
        const result = await patchProductModel(setData, id)
        console.log(result)
        return helper.response(response, 200, `Success Update product id : ${id}`, result)
      } else {
        return helper.response(response, 404, `Product by Id : ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  deleteProduct: async (request, response) => {
    try {
      const { id } = request.params
      const deleteImg = await getProductByIdModel(id)
      const img = deleteImg[0].image

      if (img !== '') {
        fs.unlink(`uploads/${img}`, (err) => {
          if (err) throw err
          console.log('File Delected !')
        })
        const result = await deleteProductModel(id)
        return helper.response(response, 200, `Success Delete product : ${id}`, result)
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  }
}
