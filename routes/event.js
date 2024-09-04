const express = require("express");
const router = express.Router();

const eventControllers = require("../controllers/event");
const checkRole = require("../middleware/checkRole");

router.get("/events", eventControllers.getEventDate);
router.get("/event/:eventID", eventControllers.getEventDetails);
router.post("/add-event", eventControllers.postAddEvent);
router.put("/update-event/:eventID", eventControllers.updateEvent);
router.delete("/delete-event/:eventID", eventControllers.deleteEvent);
router.get("/event/:eventName/product", eventControllers.getProductByEventName);
router.put("/add-stock/:eventID", eventControllers.addStock);

module.exports = router;
