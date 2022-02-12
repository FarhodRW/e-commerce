import express from 'express'
import {
  createProductController,
  deleteProductController,
  getProductController,
  getProductsByPagingController,
  imgUpload,
  updateProductController
} from '../controller/product-controller'
import { upload } from '../middleware/upload'
import { verifyAdmin, verifyToken } from '../middleware/auth'

const router = express.Router()


//creatre a product

router.get('/', getProductsByPagingController)

router.post('/', verifyToken, verifyAdmin, createProductController)

router.put('/image/:id', verifyToken, verifyAdmin, upload.single('img'), imgUpload)


//Update a product
router.put('/:id', verifyToken, verifyAdmin, updateProductController)

//delete a product
router.delete('/:id', verifyToken, verifyAdmin, deleteProductController)

//get a user
router.get('/find/:id', getProductController)













export default router