// whereas authMethod.js holds the check functions, this will hold other parts of our code to be used in the userRouter as middleware code
// on these functions, we put the req, res, next parameters as the next function will continue until we hit the signup function in userController
const {checkIsEmpty} = require('../../utils/authMethods');

function checkIsEmptyFunc(req, res, next) {
   // let errorObj = {};
   // REF: http://expressjs.com/en/5x/api.html#res.locals
   const { errorObj } =res.locals;
   for (let key in req.body) {
      if(checkIsEmpty(req.body[key])) {
         errorObj[key] = `${key} cannot be empty`;
      }
   };

   next();
};

module.exports = checkIsEmptyFunc;