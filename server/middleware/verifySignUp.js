const db = require("../models");
const User = db.user;

checkDuplicateEmail = (req, res, next) => {
  User.findOne({
    email: req.body.email
  }).exec((err, user) => {
    if (user) {
      res.status(400).send({ message: "Failed! Email is already in use!" });
      return;
    }
    next();
  });
}

const verifySignUp = {
  checkDuplicateEmail
};

module.exports = verifySignUp;