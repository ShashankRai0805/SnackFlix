const express = require("express");
const foodPartnerController = require("../controllers/food-partner.controller");
const authMiddelware = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/food-partner/:id", authMiddelware.authUserMiddleware, foodPartnerController.getAllFoodPartnerById);

module.exports = router;