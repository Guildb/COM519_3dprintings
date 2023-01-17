const mongoose = require("mongoose"),
      { Schema } = mongoose;

const projectSchema = new Schema(
    {
        name: { type: String, required: [true, 'Name is required'] },
        link: { type: String, required: [true, 'Link is required']},
        type_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Type", 
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);

