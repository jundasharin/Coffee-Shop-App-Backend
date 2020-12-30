const router = require('express').Router()
const uploadImage = require('../middleware/multer')
const { authorization, isAdmin } = require('../middleware/auth')
const { getProductRedis, getproductByIdRedis, clearDataProductRedis } = require('../middleware/redis')
const {
  getProduct,
  postProduct,
  getProductId,
  patchProduct,
  deleteProduct
} = require('../controller/controller_product')

router.get('/', authorization, getProductRedis, getProduct)
router.get('/:id', authorization, getproductByIdRedis, getProductId)
router.post('/', isAdmin, clearDataProductRedis, uploadImage, postProduct)
router.patch('/:id', isAdmin, clearDataProductRedis, uploadImage, patchProduct)
router.delete('/:id', isAdmin, deleteProduct)

module.exports = router
