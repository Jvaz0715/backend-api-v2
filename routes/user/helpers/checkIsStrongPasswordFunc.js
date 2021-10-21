const { checkIsStrongPassword } = require ("../../utils/authMethods.js");

function checkIsStrongPasswordFunc(req, res, next) {
   
   if(!checkIsStrongPassword(req.body.password)) {
      return res.status(500).json({message: "password must include 1 lowercase, 1 uppercase, 1 special character, a number and a length of 8"});
   };

   next();
};

module.exports = checkIsStrongPasswordFunc;