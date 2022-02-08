import express from 'express'
import { createCart, deleteCart, getAllCarts, getCart, updateCart } from '../controller/cart-controller'
import { verifyAdmin, verifyToken } from '../middleware/auth'


const router = express.Router()


//create a cart

router.post('/', verifyToken, createCart)


//Update a cart
router.put('/:id', verifyToken, updateCart)

//delete a cart
router.delete('/:id', verifyToken, deleteCart)

//get a cart
router.get('/find/:UserId', getCart)

//Get all products(ONLLY admin)
router.get('/carts', verifyToken, verifyAdmin, getAllCarts)



export default router