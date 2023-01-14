const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if(!user){
            user = await User.findOne({ username: req.body.email });
        }
        if (!user) {
            res.render('login', { errors: { email: { message: 'email not found' } } })
            return;
        }

        const match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
            req.session.userID = user._id;
            console.log(req.session.userID);
            res.redirect('/');
            return
        }

        res.render('login', { errors: { password: { message: 'password does not match' } } })


    } catch (e) {
        return res.status(400).send({
            message: JSON.parse(e),
        });
    }
}

exports.create = async (req, res) => {
    try {
        const password = req.body.password
        const passwordconfirm = req.body.passwordconfirm
        if(password != passwordconfirm){
            res.render('register', { errors: "Passwords do not match"})
        }
        else{
            const user = new User({ 
                email: req.body.email, 
                password: req.body.password, 
                username: req.body.username, 
                name: req.body.name});
            await user.save();
            res.render('login', {message: "User created successfully please longin"})
        }
        
    } catch (e) {
        if (e.errors) {
            console.log(e.errors);
            res.render('create-user', { errors: e.errors })
            return;
        }
        return res.status(400).send({
            message: JSON.parse(e),
        });
    }
}