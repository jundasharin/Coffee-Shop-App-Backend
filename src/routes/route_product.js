const router = require('express').Router()
const uploadImage = require('../middleware/multer')
const { authorization } = require('../middleware/auth')
const { getProductRedis, getproductByIdRedis, clearDataProductRedis } = require('../middleware/redis')
const {
  getProduct,
  postProduct,
  getProductId,
  patchProduct,
  deleteProduct
} = require('../controller/controller_product')

router.get('/', authorization, getProductRedis, getProduct)
router.get('/:id', getproductByIdRedis, getProductId)
router.post('/', uploadImage, postProduct)
router.patch('/:id', clearDataProductRedis, uploadImage, patchProduct)
router.delete('/:id', deleteProduct)

module.exports = router
