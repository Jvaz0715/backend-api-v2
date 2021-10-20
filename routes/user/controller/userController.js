const bcrypt = require("bcryptjs"); // <--- Will hash passwords to protect in database
const User = require("../model/User"); // <--- Our "template" we created for what a new user will need

// create POST or signup function that will be exported for use in userRouter
// we use async/await for our functions for cleaner code
// async function signup