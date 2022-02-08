import mongoose, { mongo } from 'mongoose'
import { CollectionNames } from '../../common/common.model';


const ReviewSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    comment: { type: String },
    rating: { type: Number, max: 5, min: 1, default: 0 }

  },
  { timestamps: true, collection: CollectionNames.REVIEWS }
);

export const Review = mongoose.model(CollectionNames.REVIEWS, ReviewSchema);