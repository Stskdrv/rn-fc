module.exports.signin = (req, res) => {
    res.status(200).json({
        signin: true
    });
};

module.exports.signup = (req, res) => {
    res.status(200).json({
        signup: {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        }
    });
};

