const express = require("express");
const foodController = require("../controllers/food.controller");
const authMiddelware = require("../middleware/auth.middleware");
const router = express.Router();
const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage()
})

router.post("/", authMiddelware.authFoodPartnerMiddleware, upload.single("video"), foodController.createFood);
router.get("/", authMiddelware.authUserMiddleware, foodController.getAllFoodItems);

module.exports = router;