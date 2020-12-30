const router = require('express').Router()
const { authorization } = require('../middleware/auth')
const {
  getHistoryRedis,
  getHistoryByIdRedis,
  clearDataHistoryRedis
} = require('../middleware/redis')
const {
  getHistory,
  getHistoryByUserId,
  postHistory,
  deleteHistory
} = require('../controller/controller_history')

router.get('/', authorization, getHistoryRedis, getHistory)
router.get('/:id', getHistoryByIdRedis, getHistoryByUserId)
router.post('/', postHistory)
router.delete('/id', clearDataHistoryRedis, deleteHistory)

module.exports = router
