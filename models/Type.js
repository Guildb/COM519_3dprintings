const mongoose = require("mongoose");
const { Schema } = mongoose;

const typeSchema = new Schema(
    {
        type: { type: String, required: [true, 'type is required'], unique: true},
    },
    { timestamps: true }
);

module.exports = mongoose.model("Type", typeSchema);