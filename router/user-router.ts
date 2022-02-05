import express from 'express'
import { deleteUser, getAllUsers, getUser, getUserStats, updateUser } from '../controller/user-controller'
import { verifyToken, verifyTokenAdmin, verifyTokenAndAuthorization } from '../middleware/verifyToken'

const router = express.Router()

//updating user
router.put('/:id', verifyTokenAndAuthorization, updateUser)

//deleting user

router.delete('/:id', verifyTokenAndAuthorization, deleteUser)

//get a user
router.get('/find/:id', verifyTokenAdmin, getUser)

//get all users

router.get('/users', verifyTokenAdmin, getAllUsers)

//get user statistics
router.get('/stats', verifyTokenAdmin, getUserStats)

export = router