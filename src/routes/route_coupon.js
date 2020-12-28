const router = require('express').Router()
const uploadImage = require('../middleware/multer')
const { authorization } = require('../middleware/auth')
const {
  getCoupon,
  getCouponId,
  postCoupon,
  patchCoupon,
  deleteCoupon
} = require('../controller/controller_coupon')

router.get('/', authorization, getCoupon)
router.get('/:id', getCouponId)
router.post('/', uploadImage, postCoupon)
router.patch('/:id', uploadImage, patchCoupon)
router.delete('/id', deleteCoupon)

module.exports = router
