const {
  getCouponModel,
  getCouponCountModel,
  getCouponByIdModel,
  postCouponModel,
  patchCouponModel,
  deleteCouponModel
} = require('../model/model_coupon')
const helper = require('../helper/response')
const qs = require('querystring')
// const fs = require('fs')
const redis = require('redis')
const client = redis.createClient()

module.exports = {
  getCoupon: async (request, response) => {
    try {
      let { page, limit, sort, search } = request.query
      page = parseInt(page)
      limit = parseInt(limit)
      const totalData = await getCouponCountModel()
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
        nextLink: nextLink && `http://localhost:3000/coupon?${nextLink}`,
        prevLink: prevLink && `http://localhost:3000/coupon?${prevLink}`
      }
      const result = await getCouponModel(limit, offset, sort, search)
      const newData = {
        result,
        pageInfo
      }
      client.setex(
          `getPromo: ${JSON.stringify(request.query)}`, 3600, JSON.stringify(newData)
      )

      return helper.response(response, 200, 'Success Get Coupon', result, pageInfo)
      // response.status(200).send(result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  getCouponId: async (request, response) => {
    try {
      const { id } = request.params
      const result = await getCouponByIdModel(id)
      if (result.length > 0) {
        return helper.response(response, 200, 'Success get coupon by Id', result)
      } else {
        return helper.response(response, 404, `Coupon by Id : ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  postCoupon: async (request, response) => {
    try {
      const {
        coupon_name,
        coupon_discount,
        limitmax,
        code,
        desc
      } = request.body
      const setData = {
        coupon_name,
        coupon_image: request.file === undefined ? '' : request.file.filename,
        coupon_discount,
        limitmax,
        code,
        desc
      }
      console.log(setData)
      const result = await postCouponModel(setData)
      return helper.response(response, 200, 'Success insert coupon', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  patchCoupon: async (request, response) => {
    try {
      const { id } = request.params
      const {
        coupon_id,
        coupon_name,
        coupon_discount,
        coupon_limitmax,
        coupon_code,
        coupon_desc
      } = request.body
      const setData = {
        coupon_id,
        coupon_name,
        coupon_image: request.file === undefined ? '' : request.file.filename,
        coupon_discount,
        coupon_limitmax,
        coupon_code,
        coupon_desc
      }
      const checkId = await getCouponByIdModel(id)
      if (checkId.length > 0) {
        const result = await patchCouponModel(setData, id)
        return helper.response(response, 200, `Success Update Coupon id : ${id}`, result)
      } else {
        return helper.response(response, 404, `Coupon by Id : ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  deleteCoupon: async (request, response) => {
    try {
      const { id } = request.params
      const result = await deleteCouponModel(id)
      return helper.response(response, 200, `Success Delete coupon : ${id}`, result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  }
}
