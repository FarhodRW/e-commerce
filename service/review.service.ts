import { UserDefinedError } from "../db/common/common.error";
import { Order } from "../db/model/oder/order.model";
import { Review } from "../db/model/review/review.model";
import { OrderDto } from "../dto/order.dto";
import { ReviewDto } from "../dto/review.dto";
import mongoose from 'mongoose'
import { ReviewError } from "../db/model/review/review.error";

export async function createReviewService(dto: ReviewDto) {

  try {
    const review = new Review(dto);
    await review.save()
    return review
  } catch (error: any) {
    throw UserDefinedError.UnknownError(error);
  }
}

export async function updateReviewService(_id, dto: ReviewDto) {
  const updatedReview = await Review.findByIdAndUpdate(_id,
    {
      $set: dto
    }, { new: true }
  )
  return updatedReview
}

export async function deleteReviewByIdService(_id) {
  const removedReview = await Review.findByIdAndDelete(_id)
  return removedReview
}

export async function getReviewService(productId) {
  try {
    let reviewAggregation = await Review.aggregate([
      //stage1
      {
        $match: { productId: new mongoose.Types.ObjectId(productId) }
      },
      //stage2
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'author'
        }
      },
      {
        $unwind: {
          path: '$author',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          author: {
            _id: 1,
            name: 1
          },
          rating: 1,
          comment: 1
        }
      }

    ])
    return reviewAggregation
  }
  catch (error) {
    throw ReviewError.NotFound(productId)
  }
}