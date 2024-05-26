import express from "express";

import {
  registerController,
  loginController,
  testController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
} from "../controllers/authController.js";

import {isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.get("/test", requireSignIn, isAdmin, testController);

router.get("/adminDashboard", requireSignIn, isAdmin);

//User route
router.get("/user-auth", requireSignIn, (req, res)=>{
  res.status(200).send({ok: true});
});

//Admin route
router.get("/admin-auth", requireSignIn, isAdmin, (req, res)=>{
  res.status(200).send({ok: true});
});

//update profile
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get('/orders', requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

//order status
router.put("/order-status/:orderId", requireSignIn, isAdmin, orderStatusController);

export default router;
