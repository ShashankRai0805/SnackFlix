const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const foodPartnerModel = require("../models/foodpartner.model");

async function registerUser(req, res) {
    try {
        const { fullName, email, password } = req.body;
        const isUserAlreadyExist = await userModel.findOne({ email });

        if (isUserAlreadyExist) {
            return res.status(400).json({
                msg: "User Already Exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userModel.create({
            fullName,
            email,
            password: hashedPassword
        })

        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET);
        res.cookie("token", token)

        res.status(201).json({
            msg: "User Registered Successfully",
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email
            }
        })
    } catch (error) {
        return res.status(500).json({
            msg: "Internal Server Error"
        })
    }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({
            email
        })

        if (!user) {
            return res.status(400).json({
                msg: "Invalid Credentials"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                msg: "Invalid Credentials"
            })
        }

        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET);

        res.cookie("token", token);
        res.status(200).json({
            msg: "User Logged In Successfully",
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email
            }
        })
    } catch (error) {
        return res.status(500).json({
            msg: "Internal Server Error"
        })
    }
}

function logoutUser(req, res) {
    res.clearCookie("token");
    res.status(200).json({
        msg: "User Logged Out Successfully"
    })
}

async function registerFoodPartner(req, res) {
    try {
        const { name, contactName, phone, email, password } = req.body;

        const isAccountExist = await foodPartnerModel.findOne({
            email
        })

        if (isAccountExist) {
            res.status(400).json({
                msg: "Account Already Exists"
            })
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const foodpartner = await foodPartnerModel.create({
            name,
            email,
            password: passwordHash,
            contactName,
            phone
        })

        const token = jwt.sign({
            id: foodpartner._id
        }, process.env.JWT_SECRET);
        res.cookie("token", token);

        return res.status(201).json({
            msg: "Food Partner Registered Successfully",
            foodpartner: {
                _id: foodpartner._id,
                name: foodpartner.name,
                email: foodpartner.email,
                contactName: foodpartner.contactName,
                phone: foodpartner.phone
            }
        })
    } catch (error) {
        return res.status(500).json({
            msg: "Internal Server Error"
        })
    }
}

async function loginFoodPartner(req, res) {
    try {
        const { email, password } = req.body;
        const foodpartner = await foodPartnerModel.findOne({ email });

        if (!foodpartner) {
            res.status(400).json({
                msg: "Invalid Credentials"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, foodpartner.password);
        if (!isPasswordValid) {
            res.status(400).json({
                msg: "Invalid Credentials"
            })
        }

        const token = jwt.sign({
            id: foodpartner._id
        }, process.env.JWT_SECRET);
        res.cookie("token", token);

        return res.status(200).json({
            msg: "Food Partner Logged In Successfully",
            foodpartner: {
                _id: foodpartner._id,
                name: foodpartner.name,
                email: foodpartner.email,
                contactName: foodpartner.contactName,
                phone: foodpartner.phone
            }
        })

    } catch (error) {
        return res.status(500).json({
            msg: "Internal Server Error"
        })
    }
}

function logoutFoodPartner(req, res) {
    res.clearCookie("token");
    res.status(200).json({
        msg: "Food Partner Logged Out Successfully"
    })
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner
}