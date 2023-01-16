const mongoose = require("mongoose");
const { Schema } = mongoose;

const projectSchema = new Schema(
    {
        name: { type: String, required: [true, 'Name is required'] },
        link: { type: String, required: [true, 'Link is required']},
        img:
        {
            data: Buffer,
            contentType: String
        },
        type_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Type", 
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);