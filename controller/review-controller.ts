import { validateIt } from "../middleware/validation";
import { ReviewDto } from "../dto/review.dto";
import { createReviewService, deleteReviewById, getReviewService, updateReviewService } from '../service/review.service';
import { success } from '../middleware/methods';


export async function createReviewController(req, res, next) {
  try {
    req.body.userId = req.user.id
    const dto = await validateIt(req.body, ReviewDto, 'create')
    const newReview = await createReviewService(dto)

    success(res, newReview)
  } catch (error) {
    next(error)
  }
}

export async function updateReviewController(req: any, res: any, next) {
  try {
    const _id = req.params.id
    const dto = await validateIt(req.body, ReviewDto, 'update')
    const updatedReview = await updateReviewService(_id, dto)
    success(res, updatedReview)
  } catch (error) {
    next()
  }
}

export async function deleteReviewController(req: any, res: any, next) {
  try {
    const _id = req.params.id
    const removedReview = await deleteReviewById(_id)
    success(res, removedReview)
  } catch (error) {
    next(error)
  }
}


export async function getProductReviewController(req, res, next) {
  try {
    const productId = req.params.id
    const reviewAggregation = await getReviewService(productId)
    success(res, reviewAggregation)
  } catch (error) {
    next(error)
  }

}



