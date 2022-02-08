import mongoose, { Types } from "mongoose";
import { CollectionNames } from "../../common/common.model";

enum ORDER_STATE {
  PENDING = 'pending',
  DONE = 'done',
  CANCELED = 'canceled',
  IN_PROGRESS = 'in_progress'
}

const OrderSchema = new mongoose.Schema(
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
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, enum: ORDER_STATE },
  },
  { timestamps: true, collection: CollectionNames.ORDERS }
);
export const Order = mongoose.model(CollectionNames.ORDERS, OrderSchema)