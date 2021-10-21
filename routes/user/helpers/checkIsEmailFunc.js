const { checkIsEmail } = require("../../utils/authMethods");

function checkIsEmailFunc(req, res, next) {
   // make sure email
   if(!checkIsEmail(req.body.email)){
      return res.status(500).json({message: "Please enter a valid email"}) ;
   };
   
   next();
};

module.exports = checkIsEmailFunc;