const express = require("express");
const router = express.Router();

const {
   signup,
   getAllUsers,
   deleteUserById
} = require("./controller/userController");

const checkIsUndefined = require('./helpers/checkIsUndefined');
const checkIsEmptyFunc = require("./helpers/checkIsEmptyFunc");


// to track users created, create getAllUsers GET
router.get("/get-all-users", getAllUsers);
router.delete("/delete-user-by-id/:id", deleteUserById);

// we use POST to sign up because a user will input data into a from that will provide the req.body
router.post(
   "/sign-up", 
   checkIsUndefined, 
   checkIsEmptyFunc, 
   signup
);

module.exports = router;