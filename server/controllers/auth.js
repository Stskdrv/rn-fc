const User = require('../models/User');


module.exports.signin = (req, res) => {
    res.status(200).json({
        signin: true
    });
};

module.exports.signup = (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    })

    user.save().then(() => console.log('User Created'));
};

