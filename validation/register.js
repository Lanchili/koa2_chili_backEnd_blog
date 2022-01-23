var Validator = require('validator');
const isEmpty = require('../utils/isEmpty')
module.exports = function validateRegiterInput(data) {
  let errors = {};
  if (!Validator.isLength(data.nickname, {
      min: 2,
      max: 8
    })) {
    errors.nickname = '名字的长度不能小于2且不能超过8位'
  }
  return {
    errors,
    isValid: isEmpty(errors)
  }
}