import express from 'express'
import {
  createReviewController,
  deleteReviewController,
  getProductReviewController,
  updateReviewController
} from '../controller/review-controller'
import { verifyAdmin, verifyToken } from '../middleware/auth'

const router = express.Router()


router.post('/', verifyToken, createReviewController)

router.get('/:id', getProductReviewController)

router.put('/:id', verifyToken, updateReviewController)

router.delete('/:id', verifyToken || verifyAdmin, deleteReviewController)