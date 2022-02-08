import mongoose from "mongoose";
import { CollectionNames } from "../../common/common.model";

const CartSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId, ref: 'Product'
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true, collection: CollectionNames.CARTS }
);

export const Cart = mongoose.model(CollectionNames.CARTS, CartSchema);