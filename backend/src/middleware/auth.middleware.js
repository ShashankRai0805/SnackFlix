const foodPartnerModel = require("../models/fooditem.model");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function authFoodPartnerMiddleware(req, res, next) {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            msg: "Please login first"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        foodPartner = await foodPartnerModel.findById(decoded.id);
        req.foodPartner = foodPartner;
        next();
    } catch (error) {
        return res.status(401).json({
            msg: "Invalid token",
            error: error.message
        })
    }
}

async function authUserMiddleware(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            msg: "Please login first"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        user = await userModel.findById(decoded.id);
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            msg: "Invalid token",
            error: error.message
        })
    }
}

module.exports = {
    authFoodPartnerMiddleware,
    authUserMiddleware
}