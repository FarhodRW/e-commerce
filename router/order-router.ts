import express from 'express'
import { createOrder, deleteOrder, getAllOrders, getMonthlyIncome, getOrder, updateOrder } from '../controller/order-controller';
import { verifyToken, verifyTokenAdmin, verifyTokenAndAuthorization } from '../middleware/verifyToken'


const router = express.Router()


//create a cart

router.post("/", verifyToken, createOrder);

//UPDATE
router.put("/:id", verifyTokenAdmin, updateOrder);

//DELETE
router.delete("/:id", verifyTokenAdmin, deleteOrder);

//GET USER ORDERS
router.get("/find/:userId", verifyTokenAndAuthorization, getOrder);

// //GET ALL

router.get("/", verifyTokenAdmin, getAllOrders);

// GET MONTHLY INCOME

router.get("/income", verifyTokenAdmin, getMonthlyIncome);



export default router