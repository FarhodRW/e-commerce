import mongoose, { mongo, Types } from "mongoose";
import { CollectionNames } from "../../common/common.model";

export enum ORDER_STATE {
  PENDING = 'pending',
  DONE = 'done',
  CANCELED = 'canceled',
  IN_PROGRESS = 'in_progress'
}

const OrderProductsSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: CollectionNames.PRODUCTS
  },
  quantity: {
    type: Number,
    default: 1,
  },
})

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: CollectionNames.USERS },
    address: { type: Object, required: true },
    state: { type: String, enum: ORDER_STATE, default: ORDER_STATE.PENDING },
    total_price: { type: Number, default: 0 },
    products: [OrderProductsSchema]
  },
  { timestamps: true, collection: CollectionNames.ORDERS }
);
export const Order = mongoose.model(CollectionNames.ORDERS, OrderSchema)