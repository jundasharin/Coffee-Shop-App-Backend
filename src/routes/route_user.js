const router = require('express').Router()
const uploadImage = require('../middleware/multer')
const { getUserByIdRedis, clearDataUserRedis } = require('../middleware/redis')
const {
  registerUser,
  loginUser,
  getUserId,
  patchUser,
  deleteUser
} = require('../controller/controller_user')

router.post('/register', uploadImage, registerUser)
router.post('/login', loginUser)
router.get('/:id', getUserByIdRedis, getUserId)
router.patch('/:id', clearDataUserRedis, uploadImage, patchUser)
router.delete('/:id', clearDataUserRedis, deleteUser)

module.exports = router
