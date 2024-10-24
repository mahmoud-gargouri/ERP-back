const express = require("express");

const router = express.Router();

const supplierControllers = require("../controllers/supplier");

router.get("/supplier", supplierControllers.getSupplier);
router.get("/supplier/:supplierID", supplierControllers.getSupplierDetails);
router.post("/add-supplier", supplierControllers.postAddSupplier);
router.put("/supplier/:supplierID", supplierControllers.updateSupplier);
router.delete("/supplier/:supplierID", supplierControllers.deleteSupplier);


module.exports = router;
