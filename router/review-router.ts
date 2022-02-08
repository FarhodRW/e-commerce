import express from 'express'
import { createReviewController, getProductReview } from '../controller/review-controller'
import { verifyToken } from '../middleware/auth'

const router = express.Router()


router.post('/', verifyToken, createReviewController)

router.get('/:id', getProductReview)