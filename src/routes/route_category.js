const router = require('express').Router()
const {
  getCategory
} = require('../controller/controller_category')

router.get('/', getCategory)

module.exports = router
