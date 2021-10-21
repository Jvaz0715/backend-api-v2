const { checkIsAlpha } = require("../../utils/authMethods");

function checkIsAlphaFunc(req, res, next) {
   for (key in req.body) {
      if (key === "firstName" || key === "lastName"){
         if(!checkIsAlpha(req.body[key])) {
            return res.status(500).json({message: `${key} can only have characters`});
         };
      };
   };

   next();

};

module.exports = checkIsAlphaFunc;