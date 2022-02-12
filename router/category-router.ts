import express from 'express'

import { createCategoryController, deleteCategoryByIdController, getCategoryByIdController, updateCategoryController } from '../controller/category-controller'
import { verifyAdmin, verifyToken } from '../middleware/auth'


const router = express.Router()


//create a cart

router.post('/', verifyToken, verifyAdmin, createCategoryController)


//Update a cart
router.put('/:id', verifyToken, verifyAdmin, updateCategoryController)

// //delete a cart
router.delete('/:id', verifyToken, verifyAdmin, deleteCategoryByIdController)

// //get a cart
router.get('/find/:id', getCategoryByIdController)





export default router