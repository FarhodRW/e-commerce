import express from 'express'
import { deleteUser, getAllUsers, getUser, getUserStats, updateUser } from '../controller/user-controller'
import { verifyAdmin, verifyToken } from '../middleware/auth'

const router = express.Router()

//updating user
router.put('/:id', verifyToken, updateUser)

//deleting user

router.delete('/:id', verifyToken, deleteUser)

//get a user
router.get('/find/:id', verifyToken, verifyAdmin, getUser)

//get all users

router.get('/users', verifyToken, verifyAdmin, getAllUsers)

//get user statistics
router.get('/stats', verifyToken, verifyAdmin, getUserStats)

export = router