const User = require("../models/user");
const lodash = require("lodash");
const jwt = require("jwt-simple");
const config = require("../../config");
const moment = require("moment");

function getTokenForUser(user) {
  const timeStamp = moment().format();
  return jwt.encode(
    {
      sub: user.id,
      int: timeStamp
    },
    config.secret
  );
}
exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email }, function(err, existingUser) {
    if (err) {
      return next(err);
    }
    if (existingUser) {
      return res.status(422).send({ error: "Email utilisé" });
    }
    if (lodash.isEmpty(email) || lodash.isEmpty(password)) {
      return res.status(422).send({ error: "Email ou mot de passe vide" });
    } else {
      const user = new User({
        email: email,
        password: password
      });
      user.save(function(err) {
        if (err) {
          return next(err);
        }
        res.json({ token: getTokenForUser(user) });
      });
    }
  });
};
exports.signin = function(req, res, next) {
  console.log("signin authentification");

  const email = req.body.email;
  const password = req.body.password;
  //console.log(User);

  User.findOne({ email: email }, function(err, existingUser) {
    if (err) {
      return next(err);
    }
    if (existingUser) {
      return res.status(422).send({ error: "Email utilisé" });
    }
    if (lodash.isEmpty(email) || lodash.isEmpty(password)) {
      return res.status(422).send({ error: "Email ou mot de passe vide" });
    } else {
      const user = new User({
        email: email,
        password: password
      });
      user.save(function(err) {
        if (err) {
          return next(err);
        }
        res.json({ token: getTokenForUser(user) });
      });
    }
  });
};

exports.signin = function(req, res, next) {
  res.json({ token: getTokenForUser(req.user) });
};
