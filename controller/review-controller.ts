import { Types } from "mongoose";
import mongoose from 'mongoose'
import { Review } from "../db/model/review/review.model"


export async function createReviewController(req, res) {

  req.body.userId = req.user.id
  const newReview = new Review(req.body)
  const savedReview = await newReview.save()
  res.status(201).send(savedReview)

}

export async function getProductReview(req, res) {
  let reviewAggregation = await Review.aggregate([
    //stage1
    {
      $match: { productId: new mongoose.Types.ObjectId(req.params.id) }
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
  res.send(reviewAggregation)
}



