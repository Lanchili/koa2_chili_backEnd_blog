const bcrypt = require('bcryptjs');
const tools = {
  inbcrypt: function (value) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(value, salt);
    return hash
  },
  bcryptCompare: function (value, hash) {
    const isRight = bcrypt.compareSync(value, hash)
    return isRight
  }
}

module.exports = tools