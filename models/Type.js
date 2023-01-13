const mongoose = require("mongoose");
const { Schema } = mongoose;

const provinceSchema = new Schema(
    {
        type: { type: String, required: [true, 'type is required'], unique: true},
    },
    { timestamps: true }
);

module.exports = mongoose.model("Province", provinceSchema);