import mongoose, { mongo } from 'mongoose'
import { CollectionNames } from '../../common/common.model';


const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true, },
    img: { type: Buffer },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    size: { type: String },
    color: { type: String },
    price: { type: Number, required: true },
    avg_rating: { type: Number, default: 0 },
    isDeleted: Boolean,
    completelyDeleted: Boolean
  },
  { timestamps: true, collection: CollectionNames.PRODUCTS }
);

export const Product = mongoose.model(CollectionNames.PRODUCTS, ProductSchema);