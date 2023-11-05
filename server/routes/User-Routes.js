const express = require("express");

const router = express.Router();
// models
const User = require("../models/User");
// registration new users
router.post("/", async (request, response) => {
  try {
    if (!request.body.Inputs.email || !request.body.Inputs.password) {
      return response.status(400).send({ message: "Send all required fields" });
    }
    const newUser = {
      email: request.body.Inputs.email,
      password: request.body.Inputs.password,
    };
    const user = await User.create(newUser);
    if (user) {
      return response
        .status(200)
        .send({ message: "User created successfully" });
    }
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

module.exports = router;
