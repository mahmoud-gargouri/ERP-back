const express = require("express");
const { body } = require("express-validator");

const User = require("../models/user");

const router = express.Router();

const authControllers = require("../controllers/auth");

router.post(
  "/signup",
  [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name is required")
      .custom((value) => {
        return User.findOne({ name: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("User name already exists!");
          }
        });
      }),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("role").optional().isIn(["admin", "user"]).withMessage("Invalid role"), // Optional: validate role if provided
  ],
  authControllers.signup
);

router.post("/login", authControllers.login);
module.exports = router;
