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
        ref: "foodpartner",
        type: mongoose.Schema.Types.ObjectId,
    }
})

const foodModel = mongoose.model("fooditem", foodSchema);

module.exports = foodModel;