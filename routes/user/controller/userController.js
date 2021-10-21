const bcrypt = require("bcryptjs");
const User = require("../model/User"); 

// for testing, create a get all users function
async function getAllUsers(req, res) {
   try {
      let foundAllUsers = await User.find({});
      res.json({message: "success", data: foundAllUsers})
   } catch(e){
      res.status(500).json({message: "error", error: e.message })
   }
};

// for deleting users
async function deleteUserById(req, res) {
   try {
      let deletedUser = await User.findByIdAndDelete(req.params.id);
      res.json({message: "success", data: deletedUser })
   } catch(e) {
      res.status(500).json({ message: "error", error: e.message })
   }
}

// signup
async function signup(req, res) {
   const {
      username,
      email,
      password,
      firstName,
      lastName
   } = req.body; // <--- we would get this from form input by user
   
   // REF: http://expressjs.com/en/5x/api.html#res.locals
   const { errorObj } =res.locals;

   // last line of defense
   if(Object.keys(errorObj).length > 0) {
      return res.status(500).json({message: "failure", payload: errorObj })
   };

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