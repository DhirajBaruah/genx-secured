const passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const {GOOGLE_CLIENT_ID} = require("../util/secrets")
const {GOOGLE_CLIENT_SEC} = require("../util/secrets")
const mongoose = require("mongoose");
require("../models/users");
const users = mongoose.model("users");

passport.serializeUser((users, done) => {
  done(null, users.id);
});

passport.deserializeUser((id, done) => {
  users.findById(id).then((users) => {
    done(null, users);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SEC,
      callbackURL: "/app/auth/google/callback",
      proxy: true,
    },
    (accessToken, refreshToken, profile, done) => {
      users.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          new users({ googleId: profile.id }).save().then((users) => {
            done(null, users);
          });
        }
      });
    }
  )
);

passport.use(
  "admin-local",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (username, password, done) {
      console.log(username);
      console.log(password);

      users.findOne({ usernameForAdmin: username }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      });
    }
  )
);
