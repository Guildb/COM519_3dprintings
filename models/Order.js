const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema(
    {
        buyer_name: { type: String, required: [true, 'Name is required'] },
        Status: { type: Number,},
        project_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Projects", 
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users", 
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);