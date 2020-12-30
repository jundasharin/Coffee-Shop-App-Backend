const router = require('express').Router()
const { authorization } = require('../middleware/auth')
const {
  getDetailHistory,
  getDetailHistoryByHistoryId,
  postDetailHistory,
  deleteDetailHistory
} = require('../controller/controller_detailHistory')

router.get('/', authorization, getDetailHistory)
router.get('/:id', getDetailHistoryByHistoryId)
router.post('/', postDetailHistory)
router.delete('/id', deleteDetailHistory)

module.exports = router
