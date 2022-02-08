import express from 'express'
import { createProduct, deleteProduct, getProduct, getProductsByCategory, getProductsByPagingController, getProductsByQuery, imgUpload, updateProduct } from '../controller/product-controller'
import { upload } from '../middleware/upload'
import { verifyAdmin, verifyToken } from '../middleware/auth'

const router = express.Router()


//creatre a product

router.get('/', getProductsByPagingController)

router.post('/', verifyToken, verifyAdmin, createProduct)

router.put('/image/:id', verifyToken, verifyAdmin, upload.single('img'), imgUpload)


//Update a product
router.put('/:id', verifyToken, verifyAdmin, updateProduct)

//delete a product
router.delete('/:id', verifyToken, verifyAdmin, deleteProduct)

//get a user
router.get('/find/:id', getProduct)

//get sorted products
router.get('/find', getProductsByQuery)

//get products by category
router.get('/category/:id', getProductsByCategory)












export default router