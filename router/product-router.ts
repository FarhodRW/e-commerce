import express from 'express'
import { createProduct, deleteProduct, getProduct, getSortedProducts, imgUpload, updateProduct } from '../controller/product-controller'
import { upload } from '../middleware/upload'
import { verifyTokenAdmin } from '../middleware/verifyToken'

const router = express.Router()


//creatre a product

router.post('/', verifyTokenAdmin, createProduct)

router.put('/image/:id', verifyTokenAdmin, upload.single('img'), imgUpload)


//Update a product
router.put('/:id', verifyTokenAdmin, updateProduct)

//delete a product
router.delete('/:id', verifyTokenAdmin, deleteProduct)

//get a user
router.get('/find/:id', getProduct)

//get sorted products
router.get('/find', getSortedProducts)











export default router