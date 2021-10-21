const { checkIsAlpha } = require("../../utils/authMethods");

function checkIsAlphaFunc(req, res, next) {
    // let errorObj = {};
   // REF: http://expressjs.com/en/5x/api.html#res.locals
   const { errorObj } =res.locals;

   for (key in req.body) {
      if (key === "firstName" || key === "lastName"){
         if(!checkIsAlpha(req.body[key])) {
            errorObj[`${key}Format`] = `${key} can only have characters`;
         };
      };
   };

   next();
};

module.exports = checkIsAlphaFunc;