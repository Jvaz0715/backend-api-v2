const { checkIsAlphanumeric } = require("../../utils/authMethods");

function checkIsAlphanumericFunc(req, res, next) {
    // let errorObj = {};
   // REF: http://expressjs.com/en/5x/api.html#res.locals
   const { errorObj } =res.locals;

   if(!checkIsAlphanumeric(req.body.username)) {
      errorObj.usernameFormat = "Only use letters and numbers for username";
   };

   next();
};

module.exports = checkIsAlphanumericFunc;