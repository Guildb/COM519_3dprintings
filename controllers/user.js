const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.listUser = async (req, res) => {
    try {
      const message = req.query.message;
      const id = req.session.userID;
      const user = await User.findById(id)
      res.render("userInfo", { user: user, message: message });
    } catch (e) {
        res.render("404", {message: "could not list user" });
    }
};

exports.edit = async (req, res) => {
    const id = req.session.userID;
    try {
      const user = await User.findById(id);
      res.render('updateUser', { user: user, errors: {}, message:{} });
    } catch (e) {
        res.render("404", {
        message: `couldn't find user ${id}.`,
      });
    }
  };

exports.update = async (req, res) => {
    const id = req.session.userID;
    try {
      const user = await User.findOne({
        $and:[
            {_id: {$ne: id}},
            {$or:[
                { email: req.body.email },
                { username: req.body.username }
            ]},
        ]});

    if (user) {
        if(user.email == req.body.email){
            res.render('updateUser', { errors: { email: { message: 'email already in use' } } })
            return;
        } else if (user.username == req.body.username){
            res.render('updateUser', { errors: { username: { message: 'username already in use' } } })
            return;
        }
    }
    else{
        const user = await User.updateOne({ _id: id }, req.body);
        res.render('userInfo');
    }
    } catch (e) {
        res.render("404", {
            message: `could find user ${e}.`,
          });
    }
  };

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({
            $or:[
                { email: req.body.email },
                { username: req.body.email }
            ]
            });
        if (!user) {
            res.render('login', { errors: { email: { message: 'email not found' } } })
            return;
        }

        const match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
            req.session.userID = user._id;
            req.session.user = user;
            res.redirect('dashboard');
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
            res.render('register', { errors: { password: { message: 'passwords do not match' } }})
            return;
        }

        const user = await User.findOne({
            $or:[
                { email: req.body.email },
                { username: req.body.username }
            ]
            });

        if (user) {
            if(user.email == req.body.email){
                res.render('register', { errors: { email: { message: 'email already in use' } } })
                return;
            } else if (user.username == req.body.username){
                res.render('register', { errors: { username: { message: 'username already in use' } } })
                return;
            }
        }
        else{
            const user = new User({ 
                email: req.body.email, 
                password: req.body.password, 
                username: req.body.username, 
                name: req.body.name});
            await user.save();
            res.render('/');
        }
        
    } catch (e) {
        if (e.errors) {
            res.render("404", { errors: e.errors })
            return;
        }
        return res.status(400).send({
            message: JSON.parse(e),
        });
    }
}

exports.password = async (req, res) => {
    try {
        const password = req.body.password
        const passwordconfirm = req.body.passwordconfirm
        if(password != passwordconfirm){
            res.render('password', { errors: { password: { message: 'passwords do not match' } }})
            return;
        }
        const hashpass = await bcrypt.hash(password, 10);

        const user = await User.findOneAndUpdate(
            {$or:[
                { email: req.body.email },
                { username: req.body.username }
            ], password: hashpass});
        res.render('dashboard');

        if (!user) {
            res.render('password', { errors: { email: { message: 'email / username not found' } } })
            return;
        }
        
    } catch (e) {
        if (e.errors) {
            console.log(e.errors);
            res.render("404", { errors: e.errors })
            return;
        }
        return res.status(400).send({
            message: JSON.parse(e),
        });
    }
}