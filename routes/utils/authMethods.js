// this will carry utility functions to help code in userController.js
const {
   isEmpty,
   isStrongPassword,
   isAlpha,
} = require("validator");

function checkIsEmpty(target) {
   if (isEmpty(target)) {
      return true;
   } else {
      return false;
   }
};

function checkIsStrongPassword(password) {
   if(isStrongPassword(password)){
      return true;
   } else {
      return false;
   }
};

function checkIsAlpha(name) {
   if(isAlpha(name)) {
      return true;
   } else {
      return false;
   }
}

module.exports = {
   checkIsEmpty,
   checkIsStrongPassword,
   checkIsAlpha,
}