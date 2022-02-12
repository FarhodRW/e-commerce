
import { BaseDtoGroup } from '../dto/common.dto'
import { OrderDto } from '../dto/order.dto'
import { success } from '../middleware/methods'
import { validateIt } from '../middleware/validation'
import {
  createOrderService,
  deleteOrderByIdService,
  getAllOrdersService,
  getMonthlyIncomeSevice,
  getOrderByUserIdService,
  updateOrderService
} from '../service/order.service'
import { getProductByIdService } from '../service/product.service'


export async function createOrderController(req: any, res: any, next) {
  try {
    const data = await validateIt(req.body, OrderDto, BaseDtoGroup.CREATE)

    let sum = 0;
    for (const item of data.products) {
      const product = await getProductByIdService(item.productId);
      sum += product.price * item.quantity
    }
    data.total_price = sum;

    const order = await createOrderService(data)
    success(res, order)
  } catch (error) {
    next(error)
  }
}


export async function updateOrderController(req: any, res: any, next) {
  try {
    const _id = req.params.id
    const dto = await validateIt(req.body, OrderDto, BaseDtoGroup.CREATE)
    const updatedOrder = await updateOrderService(dto, _id)
    success(res, updateOrderController)
  } catch (err) {
    next(err)
  }
}

export async function deleteOrderController(req: any, res: any, next) {
  try {
    const _id = req.params.id
    await deleteOrderByIdService(_id)
    success(res, 'Order has been deleted')
  } catch (err) {
    next(err)
  }
}

export async function getOrderController(req: any, res: any, next) {
  try {
    const userId = req.user._id
    const orders = await getOrderByUserIdService(userId)
    success(res, orders)
  } catch (err) {
    next(err)
  }
}

export async function getAllOrders(req: any, res: any, next) {
  try {
    const orders = await getAllOrdersService();
    success(res, orders)
  } catch (err) {
    next(err)
  }
}

export async function getMonthlyIncomeController(req: any, res: any, next) {
  try {
    const income = getMonthlyIncomeSevice()
    success(res, income)
  } catch (err) {
    next()
  }
}


//done