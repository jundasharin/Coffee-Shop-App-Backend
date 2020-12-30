const {
  getDetailHistoryModel,
  getDetailHistoryByHistoryIdModel,
  getDetailHistoryCountModel,
  postDetailHistoryModel,
  deleteDetailHistoryModel
} = require('../model/model_detailHistory')
const helper = require('../helper/response')
const qs = require('querystring')
const redis = require('redis')
const client = redis.createClient()

module.exports = {
  getDetailHistory: async (request, response) => {
    try {
      let { page, limit, sort, search } = request.query
      page = parseInt(page)
      limit = parseInt(limit)
      const totalData = await getDetailHistoryCountModel()
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
        nextLink: nextLink && `http://localhost:3000/detailhistory?${nextLink}`,
        prevLink: prevLink && `http://localhost:3000/detailhistory?${prevLink}`
      }
      const result = await getDetailHistoryModel(limit, offset, sort, search)
      const newData = {
        result,
        pageInfo
      }
      client.setex(`getdetailhistory: ${JSON.stringify(request.query)}`, 3600, JSON.stringify(newData))

      return helper.response(response, 200, 'Success Get Detail History', result, pageInfo)
      // response.status(200).send(result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  getDetailHistoryByHistoryId: async (request, response) => {
    try {
      const { id } = request.params
      const result = await getDetailHistoryByHistoryIdModel(id)
      if (result.length > 0) {
        client.setex(`gethistorybyid:${id}`, 3600, JSON.stringify(result))
        return helper.response(response, 200, 'Success get detail history by Id', result)
      } else {
        return helper.response(response, 404, `Detail History by Id : ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  postDetailHistory: async (request, response) => {
    try {
      const {
        history_id,
        product_id,
        orderqty,
        size_R,
        size_L,
        size_XL,
        small,
        medium,
        large,
        homedelivery,
        dinein,
        pickup,
        orderTotal
      } = request.body
      const setData = {
        history_id,
        product_id,
        orderqty,
        size_R,
        size_L,
        size_XL,
        small,
        medium,
        large,
        homedelivery,
        dinein,
        pickup,
        orderTotal
      }
      const result = await postDetailHistoryModel(setData)
      return helper.response(response, 200, 'Success insert detail history', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  deleteDetailHistory: async (request, response) => {
    try {
      const { id } = request.params
      const result = await deleteDetailHistoryModel(id)
      return helper.response(response, 200, `Success delete detail history : ${id}`, result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  }
}
