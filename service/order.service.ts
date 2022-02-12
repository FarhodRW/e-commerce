import { UserDefinedError } from "../db/common/common.error";
import { OrderError } from "../db/model/oder/order.error";
import { Order } from "../db/model/oder/order.model";
import { OrderDto } from "../dto/order.dto";

export async function createOrderService(dto: OrderDto) {

  try {
    const order = new Order(dto);
    await order.save()
    return order
  } catch (error: any) {
    throw UserDefinedError.UnknownError(error);
  }
}

export async function updateOrderService(dto: OrderDto, _id) {
  console.log(dto)
  const updatedOrder = await Order.findByIdAndUpdate(_id,
    {
      $set: dto
    }, { new: true }
  )
  return updatedOrder
}

export async function deleteOrderByIdService(_id: OrderDto) {

  const deletedOrder = await Order.findByIdAndDelete(_id)
  if (deletedOrder) { throw OrderError.NotFound(_id) }
  return deletedOrder
}

export async function getOrderByUserIdService(_id) {
  const userOrder = await Order.findOne({ userId: _id })
  if (!userOrder) { throw OrderError.NotFound(_id) }
  return userOrder
}

export async function getAllOrdersService() {
  const allOrders = await Order.find()
  if (!allOrders) { throw OrderError.NotFound() }
  return allOrders
}

export async function getMonthlyIncomeSevice() {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));


  const income = await Order.aggregate([
    { $match: { createdAt: { $gte: previousMonth } } },
    {
      $project: {
        month: { $month: "$createdAt" },
        sales: "$amount",
      },
    },
    {
      $group: {
        _id: "$month",
        total: { $sum: "$sales" },
      },
    },
  ]);

  return income

}