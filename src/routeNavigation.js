const router = require('express').Router()
const product = require('./routes/route_product')
const category = require('./routes/route_category')
const coupon = require('./routes/route_coupon')
const user = require('./routes/route_user')

router.use('/product', product)
router.use('/category', category)
router.use('/coupon', coupon)
router.use('/user', user)

module.exports = router
