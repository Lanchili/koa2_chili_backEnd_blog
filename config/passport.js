const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require('./keys')
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrkey;
// const mongoose = require('mongoose')
const User = require('../models/User')
module.exports = passport => {
  passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({
      id: jwt_payload.id
    }, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    });
  }));

}