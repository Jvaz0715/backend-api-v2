const express = require("express");
const router = express.Router();

const {
   signup,
} = require("./controller/userController");

// we use POST to sign up because a user will input data into a from that will provide the req.body
router.post("/sign-up", signup);

module.exports = router;