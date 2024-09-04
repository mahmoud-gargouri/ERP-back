const express = require("express");
const router = express.Router();

const adminMachine = require("../controllers/machine");
const isAuth = require("../middleware/is-auth");

router.get("/machine", adminMachine.getMachine);
router.post("/add-machine", adminMachine.postAddMachine);
router.delete("/delete-machine", adminMachine.deleteMachine);

module.exports = router;
