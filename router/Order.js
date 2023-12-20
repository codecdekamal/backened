const {
    createOrder,
  updateOrder  ,
  getSingleOrder,
  getAllOrders,
  getCurrentUserOrder
} = require("../controllers/Order");
  const express = require("express");
  const { authMiddleware, authPermission } = require("../middleware/auth");
  const router = express.Router();
  router
    .route("/")
    .post(authMiddleware, createOrder)
    .get(authMiddleware, authPermission("admin"),getAllOrders);
  router
    .route("/:id")
    .get(getSingleOrder)
    .patch(authMiddleware,  updateOrder)
  router
    .route("/getCurrntUserOrder/:id")
    .get(authMiddleware, getCurrentUserOrder);
  module.exports = router;