const foodPartnerModel = require("../models/foodpartner.model");

async function getAllFoodPartnerById(req, res) {
    const foodPartnerId = req.params.id;

    const foodPartner = await foodPartnerModel.findById(foodPartnerId);

    if (!foodPartner) {
        return res.status(404).json({
            msg: "Food Partner not found"
        })
    }
    
    res.status(200).json({
        msg: "Food Partner fetched successfully",
        foodPartner
    })
}

module.exports = {
    getAllFoodPartnerById
}