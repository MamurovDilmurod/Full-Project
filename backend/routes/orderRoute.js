import express from "express";
import { placeOrder, placeOrderStripe, placeOrderRezorpey, allOrders, userOrders, updateOrderStatus, verifyRazorpay, verifyStripe } from '../controllers/orderControlled.js';
import adminAuth from "../middleware/adminAuth.js";
import authUser from '../middleware/auth.js';

const orderRouter = express.Router();
//Admin Features
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateOrderStatus);

// Payme Fetures
orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.post("/rezorpay", authUser, placeOrderRezorpey);

// user features
orderRouter.post("/userorders", authUser, userOrders);
// very payment
orderRouter.post("/verifyStripe", authUser, verifyStripe);
orderRouter.post("/verifyRazorpay", authUser, verifyRazorpay);


export default orderRouter;