const { checkIsEmail } = require("../../utils/authMethods");

function checkIsEmailFunc(req, res, next) {
   // let errorObj = {};
   // REF: http://expressjs.com/en/5x/api.html#res.locals
   const { errorObj } =res.locals;

   if(!checkIsEmail(req.body.email)){
      errorObj.wrongEmailFormat = "Please enter a valid email";
   };

   next();
};

module.exports = checkIsEmailFunc;