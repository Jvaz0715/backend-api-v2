const { checkIsAlphanumeric } = require("../../utils/authMethods");

function checkIsAlphanumericFunc(req, res, next) {
   // user name is alphanumeric
   if(!checkIsAlphanumeric(req.body.username)) {
      return res.status(500).json({message: "Only use letters and numbers for username"});
   };

   next();
};

module.exports = checkIsAlphanumericFunc;