var express = require("express");
var router = express.Router();

const User = require("../models/userSchema");
const passport = require("passport");
const LocalStrategy = require("passport-local");
passport.use(new LocalStrategy(User.authenticate()));

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Home Page" });
});

router.get("/create", function (req, res, next) {
  res.render("create", { title: "Create Resume" });
});

router.get("/show", function (req, res, next) {
  res.render("show", { title: "Show All Resume" });
});

router.get("/signup", function (req, res, next) {
  res.render("signup", { title: "Signup" });
});

router.get("/signin", function (req, res, next) {
  res.render("signin", { title: "Signin" });
});

router.post("/signup", function (req, res, next) {
  const { username, contact, password, email } = req.body;
  User.register({ username, email, contact }, password)
    .then((user) => {
      res.redirect("/signin");
    })
    .catch((err) => res.send(err));
});

router.get("/profile", isLoggedin, function (req, res, next) {
  console.log(req.user);
  res.render("profile", { title: "profile" });
});

router.post(
  "/signin",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/signin",
  }),
  function (req, res, next) {}
);

router.get("/signout", isLoggedin, function (req, res, next) {
  req.logout(() => {
    res.redirect("/signin");
  });
});

function isLoggedin(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/signin");
  }
}

//post send mail

router.get("/forget", function (req, res, next) {
  console.log(req.user);
  res.render("forget", { title: "send-mail" });
});

router.post("/send-mail", async function (req, res, next) {
  const user = await User.findOne();

  const code = Math.floor(Math.random() * 9000 + 1000);

  console.log(user);
  res.render("send-mail", { title: "send-mail" });
}); 

module.exports = router;
