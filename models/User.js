const mongoose = require('mongoose')
const Schama = mongoose.Schema

//实例化数据模板

const UserInfo = new Schama({
  id: { // 唯一id
    type: String,
    required: true
  },
  email: { // 邮箱
    type: String,
    required: true
  },
  nickname: { // 昵称
    type: String,
    required: true
  },
  date: { //创建日期
    type: Date,
    default: Date.now
  },
  password: { //密码
    type: String,
    required: true
  },
  avatar: { //头像
    type: String
  }
})

module.exports = User = mongoose.model('userInfo', UserInfo)