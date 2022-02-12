import express from 'express'
import {
  createOrderController,
  deleteOrderController,
  getAllOrders,
  getMonthlyIncomeController,
  getOrderController,
  updateOrderController
} from '../controller/order-controller';
import { verifyAdmin, verifyToken } from '../middleware/auth'


const router = express.Router()


//create a cart

router.post("/", verifyToken, createOrderController);

//UPDATE
router.put("/:id", verifyToken, verifyAdmin, updateOrderController);

//DELETE
router.delete("/:id", verifyToken, verifyAdmin, deleteOrderController);

//GET USER ORDERS
router.get("/find/:userId", verifyToken, getOrderController);

// //GET ALL

router.get("/", verifyToken, verifyAdmin, getAllOrders);

// GET MONTHLY INCOME

router.get("/income", verifyToken, verifyAdmin, getMonthlyIncomeController);



export default router