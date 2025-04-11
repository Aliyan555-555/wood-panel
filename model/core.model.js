const mongoose = require("mongoose");

// Define the schema for the Core model
const CoreSchema = new mongoose.Schema(
    {
        source: {
            type: String,
            required: [true,"Source is required"],
            trim: true,
        },
        name: {
            type: String,
            required: [true,"Name is required"],
            trim: true,
        },
        value: {
            type: String,
            required: [true,"Value is required"],
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
const CoreModel = mongoose.model("Core", CoreSchema);
module.exports = CoreModel;