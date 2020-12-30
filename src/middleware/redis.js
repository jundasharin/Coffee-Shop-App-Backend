const redis = require('redis')
const client = redis.createClient()
const helper = require('../helper/response')

module.exports = {
  getproductByIdRedis: (request, response, next) => {
    const { id } = request.params
    client.get(`getproductbyid:${id}`, (error, result) => {
      if (!error && result != null) {
        console.log('data ada didalam redis')
        return helper.response(response, 200, 'Success get product by ID', JSON.parse(result))
      } else {
        console.log('data not found')
        next()
      }
    })
  },
  getProductRedis: (request, response, next) => {
    client.get(`getproduct: ${JSON.stringify(request.query)}`, (error, result) => {
      if (!error && result != null) {
        const newResult = JSON.parse(result)
        return helper.response(response, 200, 'Success get product', newResult.result, newResult.pageInfo)
      } else {
        next()
      }
    })
  },
  clearDataProductRedis: (request, response, next) => {
    client.keys('getproduct*', (_error, result) => {
      console.log(result)
      if (result.length > 0) {
        result.forEach((value) => {
          client.del(value)
        })
      }
      next()
    })
  },
  getCouponByIdRedis: (request, response, next) => {
    const { id } = request.params
    client.get(`getcouponbyid:${id}`, (error, result) => {
      if (!error && result != null) {
        console.log('data ada didalam redis')
        return helper.response(response, 200, 'Success get coupon by ID', JSON.parse(result))
      } else {
        console.log('data not found')
        next()
      }
    })
  },
  getCouponRedis: (request, response, next) => {
    client.get(`getcoupon: ${JSON.stringify(request.query)}`, (error, result) => {
      if (!error && result != null) {
        const newResult = JSON.parse(result)
        return helper.response(response, 200, 'Success get coupon', newResult.result, newResult.pageInfo)
      } else {
        next()
      }
    })
  },
  clearDataCouponRedis: (request, response, next) => {
    client.keys('getcoupon*', (_error, result) => {
      console.log(result)
      if (result.length > 0) {
        result.forEach((value) => {
          client.del(value)
        })
      }
      next()
    })
  },
  getHistoryByIdRedis: (request, response, next) => {
    const { id } = request.params
    client.get(`gethistorybyid:${id}`, (error, result) => {
      if (!error && result != null) {
        console.log('data ada didalam redis')
        return helper.response(response, 200, 'Success get history by ID', JSON.parse(result))
      } else {
        console.log('data not found')
        next()
      }
    })
  },
  getHistoryRedis: (request, response, next) => {
    client.get(`gethistory: ${JSON.stringify(request.query)}`, (error, result) => {
      if (!error && result != null) {
        const newResult = JSON.parse(result)
        return helper.response(response, 200, 'Success get history', newResult.result, newResult.pageInfo)
      } else {
        next()
      }
    })
  },
  clearDataHistoryRedis: (request, response, next) => {
    client.keys('gethistory*', (_error, result) => {
      console.log(result)
      if (result.length > 0) {
        result.forEach((value) => {
          client.del(value)
        })
      }
      next()
    })
  },
  getUserByIdRedis: (request, response, next) => {
    const { id } = request.params
    client.get(`getuserbyid:${id}`, (error, result) => {
      if (!error && result != null) {
        console.log('data ada didalam redis')
        return helper.response(response, 200, 'Success get user by ID', JSON.parse(result))
      } else {
        console.log('data not found')
        next()
      }
    })
  },
  clearDataUserRedis: (request, response, next) => {
    client.keys('getuser*', (_error, result) => {
      console.log(result)
      if (result.length > 0) {
        result.forEach((value) => {
          client.del(value)
        })
      }
      next()
    })
  }
}
