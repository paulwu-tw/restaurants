const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const User = require('../models/users')

// setup passport strategy
module.exports = app => {
    // init passport
    app.use(passport.initialize());
    app.use(passport.session());

    // set passport strategy - local
    passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, (req, email, password, done) => {
        User.findOne({ email })
            .then(user => {
                if (!user) {
                    return done(null, false, req.flash('warning_msg', 'This email is not registered.'));
                    // return done(null, false, { message: 'This email is not registered.' })
                }
                return bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) {
                        return done(null, false, req.flash('warning_msg', 'Email or Password incorrect.'));
                        // return done(null, false, { message: 'Email or Password incorrect.' })
                    }
                    return done(null, user);
                })
            })
            .catch(err => done(err, false));
    }))
    // serialize and deserialize user
    passport.serializeUser((user, done) => {
        done(null, user.id);
    }
    );
    passport.deserializeUser((id, done) => {
        User.findById(id)
            .lean()
            .then(user => done(null, user))
            .catch(err => done(err, null));
    }
    );
}
