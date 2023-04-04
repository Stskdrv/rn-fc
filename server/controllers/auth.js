const User = require('../models/User');


module.exports.signin = (req, res) => {
    res.status(200).json({
        signin: true
    });
};

module.exports.signup = async (req, res) => {
    const candidate = await User.findOne({ $or: [{ email: req.body.email }, { name: req.body.name }] });
    //In this example, we are using the $or operator to search for users with either the specified email or name. The candidate variable will contain the user object if a user with the specified email or name is found in the database, or null if no user is found.

    if (candidate) {
        if (candidate.email === req.body.email) {
            return res.status(409).json({
                message: 'Email already exist, please signIn'
            })
        } else {
            return res.status(409).json({
                message: 'This name already exist, please choose another one.'
            })
        }
    } else {
        
    }

        
};

