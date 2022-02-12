import express from 'express'
import { deleteUserController, getAllUsersController, getUserController, getUserStatsController, updateUserController } from '../controller/user-controller'
import { verifyAdmin, verifyToken } from '../middleware/auth'

const router = express.Router()

//updating user
router.put('/', verifyToken, updateUserController)

//deleting user

router.delete('/delete', verifyToken, deleteUserController)

// get a user
router.get('/me', verifyToken, verifyAdmin, getUserController)

//get all users

router.get('/', verifyToken, verifyAdmin, getAllUsersController)

//get user statistics
router.get('/stats', verifyToken, verifyAdmin, getUserStatsController)

export = router