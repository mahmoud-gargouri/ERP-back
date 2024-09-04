const express = require("express");
const router = express.Router();

const productController = require("../controllers/product");
const isAuth = require("../middleware/is-auth");

router.post("/add-product", productController.addProduct);

router.post("/get-product", productController.getProductByDetails);

router.get("/products", productController.getProducts);

router.get("/products/:id", productController.getProductById);

router.put("/products/:id", productController.updateProduct);

router.delete("/products/:id", productController.deleteProduct);

module.exports = router;
