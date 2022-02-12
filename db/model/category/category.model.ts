import mongoose, { Types } from "mongoose";
import { CollectionNames } from "../../common/common.model";


const CategorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true }
  },
  { timestamps: true, collection: CollectionNames.CATEGORIES }
);
export const Category = mongoose.model(CollectionNames.CATEGORIES, CategorySchema)