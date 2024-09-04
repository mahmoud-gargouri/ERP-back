const express = require("express");

const router = express.Router();

const societeControllers = require("../controllers/societe");

router.get("/societe", societeControllers.getSociete);
router.get("/societe/:societeID", societeControllers.getSocieteDetails);
router.post("/add-societe", societeControllers.postAddSociete);
router.put("/societe/:societeID", societeControllers.updateSociete);

module.exports = router;
