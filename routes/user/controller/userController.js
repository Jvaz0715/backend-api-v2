const bcrypt = require("bcryptjs"); // <--- Will hash passwords to protect in database
const User = require("../model/User"); // <--- Our "template" we created for what a new user will need

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
}

// async function signup
async function signup(req, res) {
   const {
      username,
      email,
      password,
      firstName,
      lastName
   } = req.body; // <--- we would get this from form input by user

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
   getAllUsers
}