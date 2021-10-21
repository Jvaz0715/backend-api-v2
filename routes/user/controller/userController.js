const bcrypt = require("bcryptjs"); // <--- Will hash passwords to protect in database
const {
   isAlphanumeric,
   isEmail,
} = require("validator");

const User = require("../model/User"); // <--- Our "template" we created for what a new user will need
const {
   checkIsEmpty,
   checkIsStrongPassword,
   checkIsAlpha,
   checkIsAlphanumeric,
   checkIsEmail,
} = require("../../utils/authMethods");

// create POST or signup function that will be exported for use in userRouter
// we use async/await for our functions for cleaner code

// for testing, create a get all users function
async function getAllUsers(req, res) {
   try {
      let foundAllUsers = await User.find({});
      res.json({message: "success", data: foundAllUsers})
   } catch(e){
      res.status(500).json({message: "error", error: e.message })
   }
};

// for deleting users,
async function deleteUserById(req, res) {
   try {
      let deletedUser = await User.findByIdAndDelete(req.params.id);
      res.json({message: "success", data: deletedUser })
   } catch(e) {
      res.status(500).json({ message: "error", error: e.message })
   }
}

// ==================== Leave above as is!

// async function signup
async function signup(req, res) {
   const {
      username,
      email,
      password,
      firstName,
      lastName
   } = req.body; // <--- we would get this from form input by user

   // this is checking length of all the keys in req.body
      // i.e. req.body.username.length, etc...
   if (Object.keys(req.body).length === 0) {
      return res.status(500).json({ message: "Please fill out the form !"});
   }
   // we declare an error object that will populate with which target we put if empty
   let errorObj = {};
   
   // make empty checks: D.R.Y.
   
   for (let key in req.body) {
      if(checkIsEmpty(req.body[key])) {
         errorObj[key] = `${key} cannot be empty`;
      }
   };

   // check first and last name are alpha
   if(!checkIsAlpha(firstName)) {
      errorObj.firstNameWrongFormat = "First name can only contain alpha";
   };

   if(!checkIsAlpha(lastName)) {
      errorObj.lastNameWrongFormat = "Last name can only contain alpha";
   };

   // user name is alphanumeric
   if(!checkIsAlphanumeric(username)) {
      errorObj.wrongUsernameFormat = "Only use letters and numbers for username";
   }
   // make sure email
   if(!checkIsEmail(email)){
      errorObj.wrongEmailFormat = "Please enter a valid email";
   };

    // validate password strength
   if(!checkIsStrongPassword(password)) {
      errorObj.weakPassword = "password must include 1 lowercase, 1 uppercase, 1 special character, a number and a length of 8";
   };

   // last line of defense
   if(Object.keys(errorObj).length > 0) {
      return res.status(500).json({message: "failure", payload: errorObj })
   };

   // try/catch below
   try {

      let salt = await bcrypt.genSalt(12);
      let hashedPassword = await bcrypt.hash(password, salt); // <--- password comes from const above, salt from line above

      const createdUser = new User({
         firstName,
         lastName,
         email,
         password: hashedPassword,
         username,
      });

      // we created the user but still need to save it
      let savedUser = await createdUser.save();
      res.json({ message: "success", data: savedUser });

   } catch (e) {
      res.status(500).json({message: "error", error: e })
   }
};

module.exports = {
   signup,
   getAllUsers,
   deleteUserById,
}