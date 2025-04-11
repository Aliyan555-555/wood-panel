const mongoose = require("mongoose");

const CoreSchema = new mongoose.Schema({
    source: {
        type: String,
        required: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim:true
    },
    value: {
        type: String,
        required: true,
        trim: true,
       
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
});

const CoreModel = mongoose.model("core", CoreSchema);

module.exports = CoreModel;