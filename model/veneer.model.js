const mongoose = require("mongoose");

const VeneerSchema = new mongoose.Schema({
    source: {
        type: String,
        required: true,
        trim: true,
    },
    species: {
        type: String,
        required: true,
        trim: true,
    },
    cut: {
        type: String,
        required: true,
        trim: true,
    },
    match: {
        type: String,
        required: true,
        trim: true,
    },
    grade: {
        type: String,
        required: true,
        trim: true,
    },
    grainDirection: {
        type: String,
        required: true,
    },
    value:{
        type:String,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
},{timestamps: true});

const VeneerModel = mongoose.model("veneer", VeneerSchema);

module.exports = VeneerModel;