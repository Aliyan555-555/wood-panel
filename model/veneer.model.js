const mongoose = require("mongoose");

const VeneerSchema = new mongoose.Schema(
    {
        source: {
            type: String,
            required: [true, "Source is required"],
            trim: true,
        },
        specie: {
            type: String,
            required: [true, "Specie is required"],
            trim: true,
        },
        cut: {
            type: String,
            required: [true, "Cut is required"],
            trim: true,
        },
        match: {
            type: String,
            required: [true, "Match is required"],
            trim: true,
        },
        grade: {
            type: String,
            required: [true, "Grade is required"],
            trim: true,
        },
        value: {
            type: String,
            default: null,
            trim: true,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const VeneerModel = mongoose.model("Veneer", VeneerSchema);

module.exports = VeneerModel;