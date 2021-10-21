// whereas authMethod.js holds the check functions, this will hold other parts of our code to be used in the userRouter as middleware code
// on these functions, we put the req, res, next parameters as the next function will continue until we hit the signup function in userController

function checkIsUndefined(req, res, next) {
   // this is checking length of all the keys in req.body
   // i.e. req.body.username.length, etc...
   if (Object.keys(req.body).length === 0) {
      return res.status(500).json({ message: "Please fill out the form !"});
   } else {
      // REF: http://expressjs.com/en/5x/api.html#res.locals
      let errorObj = {};
      res.locals.errorObj = errorObj;
      next();
   };
};

module.exports = checkIsUndefined;