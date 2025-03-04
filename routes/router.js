import express from 'express'
const router = express.Router()
import { getUsers,getSingleUser, authenticateToken, register} from '../controller/routerController.js'
import {login} from '../controller/authController.js'


router.get('/users', getUsers)
router.post('/register', register)
router.get('/login', login)
router.get('/protected-route', authenticateToken, getSingleUser)

export default router