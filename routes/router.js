const express = require('express')
const router = express.Router()
const { getUsers,getSingleUser, authenticateToken, register} = require('../controller/routerController')
const {login} = require('../authServer')


router.get('/users', getUsers)
router.post('/register', register)
router.get('/login', login)
router.get('/protected-route', authenticateToken, getSingleUser)
module.exports = router