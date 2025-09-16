const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    video: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    foodPartner: {
        type: String,
        ref: "foodpartner",
    }
})

const foodModel = mongoose.model("fooditem", foodSchema);

module.exports = foodModel;