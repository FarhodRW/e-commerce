import express from 'express'
import { createOrder, deleteOrder, getAllOrders, getMonthlyIncome, getOrder, updateOrder } from '../controller/order-controller';
import { verifyAdmin, verifyToken } from '../middleware/auth'


const router = express.Router()


//create a cart

router.post("/", verifyToken, createOrder);

//UPDATE
router.put("/:id", verifyToken, verifyAdmin, updateOrder);

//DELETE
router.delete("/:id", verifyToken, verifyAdmin, deleteOrder);

//GET USER ORDERS
router.get("/find/:userId", verifyToken, getOrder);

// //GET ALL

router.get("/", verifyToken, verifyAdmin, getAllOrders);

// GET MONTHLY INCOME

router.get("/income", verifyToken, verifyAdmin, getMonthlyIncome);



export default router