const express = require("express");
const router = express.Router();

const {
   signup,
   getAllUsers,
} = require("./controller/userController");

// to track users created, create getAllUsers GET
router.get("/get-all-users", getAllUsers);

// we use POST to sign up because a user will input data into a from that will provide the req.body
router.post("/sign-up", signup);

module.exports = router;