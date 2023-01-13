const mongoose = require("mongoose");
const { Schema } = mongoose;

const projectschema = new Schema(
    {
        name: { type: String, required: [true, 'Name is required'] },
        type: { type: String, required: [true, 'Type is required'] },
        img:
        {
            data: Buffer,
            contentType: String
        }
    },
    { timestamps: true }
);



module.exports = mongoose.model("Projects", userSchema);