const {
  createProduct,
  deleteProduct,
  updateProduct,
  getSingleProduct,
  getAllProducts,
  uploadImage,
  getProductsByCategory
} = require("../controllers/Product");
const express = require("express");
const { authMiddleware, authPermission } = require("../middleware/auth");
const router = express.Router();
router
  .route("/")
  .post(authMiddleware, authPermission("admin"), createProduct)
  .get(getAllProducts);
router
  .route("/:id")
  .get(getSingleProduct)
  .patch(authMiddleware, authPermission("admin"), updateProduct)
  .delete(authMiddleware, authPermission("admin"), deleteProduct);
router
  .route("/uploadImage/:id")
  .post(authMiddleware, authPermission("admin"), uploadImage);
  router.route("/productpage/:category").get(getProductsByCategory)
module.exports = router;
