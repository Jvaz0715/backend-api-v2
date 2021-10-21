const { checkIsStrongPassword } = require ("../../utils/authMethods.js");

function checkIsStrongPasswordFunc(req, res, next) {
   // let errorObj = {};
   // REF: http://expressjs.com/en/5x/api.html#res.locals
   const { errorObj } =res.locals;
   
   if(!checkIsStrongPassword(req.body.password)) {
      errorObj.weakPassword = "password must include 1 lowercase, 1 uppercase, 1 special character, a number and a length of 8"
   };

   next();
};

module.exports = checkIsStrongPasswordFunc;