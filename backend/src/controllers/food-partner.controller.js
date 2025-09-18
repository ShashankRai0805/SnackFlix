const foodModel = require("../models/fooditem.model");
const foodPartnerModel = require("../models/foodpartner.model");

async function getAllFoodPartnerById(req, res) {
    const foodPartnerId = req.params.id;
    console.log(foodPartnerId);

    const foodPartner = await foodPartnerModel.findById(foodPartnerId);
    const foodItemsByFoodPartner = await foodModel.find({ foodPartner: foodPartnerId });

    if (!foodPartner) {
        return res.status(404).json({
            msg: "Food Partner not found"
        })
    }
    
    res.status(200).json({
        msg: "Food Partner fetched successfully",
        foodPartner: {
            ...foodPartner.toObject(),
            foodItems: foodItemsByFoodPartner
        }
    })
}

module.exports = {
    getAllFoodPartnerById
}