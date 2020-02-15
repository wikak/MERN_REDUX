const AuthentificationController = require("./controllers/authentification");
require("./services/passport");
const passport = require("passport");

//const requireToken = passport.authenticate("jwt", { seesion: false });
const requireValidCredentials = passport.authenticate("local", {
  seesion: false
});

module.exports = function(expressServer) {
  expressServer.use(passport.initialize());
  expressServer.use(passport.session());
  expressServer.post("/signup", AuthentificationController.signup);
  expressServer.post(
    "/signin",
    requireValidCredentials,
    AuthentificationController.signin
  );

  //expressServer.get("/ressources", requireToken, function(params) {});
};
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  User.findById(id, function(err, user) {
    cb(err, user);
  });
});
