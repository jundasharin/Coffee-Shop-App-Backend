const {
  getHistoryModel,
  getHistoryCountModel,
  getHistoryByUserIdModel,
  postHistoryModel,
  deleteHistoryModel
} = require('../model/model_history')
const helper = require('../helper/response')
const qs = require('querystring')
const redis = require('redis')
const client = redis.createClient()

module.exports = {
  getHistory: async (request, response) => {
    try {
      let { page, limit, sort, search } = request.query
      page = parseInt(page)
      limit = parseInt(limit)
      const totalData = await getHistoryCountModel()
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
        nextLink: nextLink && `http://localhost:3000/history?${nextLink}`,
        prevLink: prevLink && `http://localhost:3000/history?${prevLink}`
      }
      const result = await getHistoryModel(limit, offset, sort, search)
      const newData = {
        result,
        pageInfo
      }
      client.setex(`gethistory: ${JSON.stringify(request.query)}`, 3600, JSON.stringify(newData))

      return helper.response(response, 200, 'Success Get History', result, pageInfo)
      // response.status(200).send(result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  getHistoryByUserId: async (request, response) => {
    try {
      const { id } = request.params
      const result = await getHistoryByUserIdModel(id)
      if (result.length > 0) {
        client.setex(`gethistorybyid:${id}`, 3600, JSON.stringify(result))
        return helper.response(response, 200, 'Success get history by Id', result)
      } else {
        return helper.response(response, 404, `History by Id : ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  postHistory: async (request, response) => {
    try {
      const {
        history_id,
        user_id,
        discount,
        subtotal,
        paymentMethod_id
      } = request.body
      const setData = {
        history_id,
        user_id,
        discount,
        subtotal,
        paymentMethod_id,
        history_createdAt: new Date()
      }
      console.log(setData)
      const result = await postHistoryModel(setData)
      return helper.response(response, 200, 'Success insert coupon', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  deleteHistory: async (request, response) => {
    try {
      const { id } = request.params
      const result = await deleteHistoryModel(id)
      return helper.response(response, 200, `Success delete history : ${id}`, result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  }
}
