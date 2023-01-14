const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
        email: { type: String, required: [true, 'email is required'], unique: true },
        username: { type: String, required: [true, 'username is required'], unique: true},
        password: { type: String, required: [true, 'password is required'] },
        name: { type: String, required: [true, 'Name is required'] },
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    console.log(this.password);
    try {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
        next();
    } catch (e) {
        throw Error('could not hash password');
    }
})

module.exports = mongoose.model("Users", userSchema);