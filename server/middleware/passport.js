const { JWT_KEY, JWT_REF_KEY } = require('../../config/keys');
const User = require('../models/User');

const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),// we take token from header
    secretOrKey: JWT_KEY,
};

const refreshOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('x-refresh-token'),
    secretOrKey: JWT_REF_KEY,
};

module.exports = (passport) => { // describe why we're exporting passport func and logic inside
    passport.use(
        new JWTStrategy(options, async (payload, done) => { // then we need to find user in DB model
            try{
                const user = await User.findById(payload.userId).select('name id');

                if (user) {
                    done(null, user)// nodejs convenction - first need to handle error and if we do not have an error we need to pass null
                } else {
                    done(null, false);
                }
            } catch (e)  {
                console.log(e);
            }
        })
    ),
    
    passport.use(
        'refresh-token',
        new JWTStrategy(refreshOptions, async (payload, done) => {
          try {
            const user = await User.findById(payload.userId);
      
            if (user) {
              done(null, user);
            } else {
              done(null, false);
            }
          } catch (e) {
            console.log(e);
          }
        })
      );
}