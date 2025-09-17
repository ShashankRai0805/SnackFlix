const foodModel = require("../models/fooditem.model");
const storageService = require("../service/storage.service");
const { v4: uuid } = require("uuid");

async function createFood(req, res) {
    const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid())
    console.log(fileUploadResult);
    console.log(req.foodPartner);

    const foodItem = await foodModel.create({
        name: req.body.name,
        description: req.body.description,
        video: fileUploadResult.url,
        foodPartner: req.foodPartner._id
    })

    res.status(201).json({
        msg: "Food item created successfully",
        foodItem: foodItem,
        foodPartnerId: req.foodPartner._id
    })

}

async function getAllFoodItems(req, res) {
    const foodItems = await foodModel.find({})
    res.status(200).json({
        msg: "Food items fetched successfully",
        foodItems: foodItems
    })
}

module.exports = {
    createFood,
    getAllFoodItems
}