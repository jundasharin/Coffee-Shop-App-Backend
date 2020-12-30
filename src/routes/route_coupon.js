const router = require('express').Router()
const uploadImage = require('../middleware/multer')
const { authorization, isAdmin } = require('../middleware/auth')
const { getCouponByIdRedis, getCouponRedis, clearDataCouponRedis } = require('../middleware/redis')
const {
  getCoupon,
  getCouponId,
  postCoupon,
  patchCoupon,
  deleteCoupon
} = require('../controller/controller_coupon')

router.get('/', authorization, getCouponRedis, getCoupon)
router.get('/:id', authorization, getCouponByIdRedis, getCouponId)
router.post('/', isAdmin, uploadImage, postCoupon)
router.patch('/:id', isAdmin, clearDataCouponRedis, uploadImage, patchCoupon)
router.delete('/id', isAdmin, clearDataCouponRedis, deleteCoupon)

module.exports = router
