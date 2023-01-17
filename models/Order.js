const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema(
    {
        buyer_name: { type: String, required: [true, 'Name is required'] },
        status: { type: Number,},
        project_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project", 
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", 
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);