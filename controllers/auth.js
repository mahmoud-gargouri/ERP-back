const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

exports.login = (req, res, next) => {
  const { name, password } = req.body; // Destructure name and password from req.body
  let loadedUser;

  User.findOne({ name: name })
    .then((user) => {
      if (!user) {
        const error = new Error("There is no user with this name");
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Wrong password");
        error.statusCode = 401;
        throw error;
      }
      // If password matches, create a JWT token
      const token = jwt.sign(
        {
          name: loadedUser.name,
          userID: loadedUser._id.toString(),
          role: loadedUser.role, // Include role in the token
        },
        "My Secret Code Is Gargouri", // Secret key for signing the token
        { expiresIn: "1d" } // Token expiration time
      );
      res.status(200).json({
        token: token,
        userID: loadedUser._id.toString(),
        user: req.user,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err); // Pass the error to the error handling middleware
    });
};

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("User already exists");
    error.statusCode = 422;
    throw error;
  }

  const { name, password, status, image, role } = req.body; // Destructure name, password, and role from req.body

  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const user = new User({
        name: name,
        password: hashedPassword,
        status: status,
        image: image,
        role: role || "admin", // Assign role from request, default to "admin"
      });
      return user.save();
    })
    .then((result) => {
      res.status(201).json({ message: "User created", userId: result._id });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
