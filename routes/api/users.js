const Router = require('koa-router')
const router = new Router();
//const bcrypt = require('bcryptjs');
//引入userInfo 的模板
const User = require("../../models/User")
const gravatar = require('gravatar');
const tools = require('../../utils/tools')
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys')
const passport = require('koa-passport')
const validateRegiterInput = require('../../validation/register')
/**
 * @route GET api/users/test
 * @desc  测试接口
 * @access 接口是公开
 * 
 */

router.get('/test', async ctx => {
  ctx.state = 200;
  ctx.request.body.msg = 'success'
  ctx.body = ctx.request.body;
  // console.log(ctx.params);
  // console.log(ctx.request);
  // console.log(ctx.request.URL);
})

router.post('/testPost', async ctx => {
  ctx.state = 200;
  let id = ctx.request.body.id || '';
  let password = ctx.request.body.password || '';
  console.log(`id is ${id},password id ${password}`);
  console.log(ctx.request.body);
  ctx.body = ctx.request.body
})

/**
 * @route POST api/users/register
 * @desc  注册接口
 * @access 接口是公开
 * 
 */
router.post('/register', async ctx => {
  // console.log(ctx.request.body);
  ctx.state = 200;
  //ctx.body = ctx.request.body
  //存储到数据库

  const {
    errors,
    isValid
  } = validateRegiterInput(ctx.request.body)

  //判断是否通过

  if (!isValid) {
    ctx.status = 400;
    ctx.body = errors;
    return
  }
  console.log(111111);
  const findResult = await User.find({
    id: ctx.request.body.id
  })
  // console.log(findResult);
  if (findResult.length > 0) {
    ctx.status = 500;
    ctx.body = {
      'id': 'id已经被占用'
    }
  } else {

    const avatar = gravatar.url(ctx.request.body.email, {
      s: '200',
      r: 'pg',
      d: 'mm'
    });
    //mm为默认头像

    //没查找
    const newUser = new User({
      id: ctx.request.body.id,
      email: ctx.request.body.email,
      nickname: ctx.request.body.nickname,
      password: ctx.request.body.password,
      date: ctx.request.body.date,
      avatar
    })
    console.log(newUser);

    newUser.password = tools.inbcrypt(newUser.password)
    console.log(newUser);


    // await console.log(newUser);
    //存储到数据库
    await newUser.save().then(user => {
      ctx.body = user
    }).catch((err) => {
      console.log(err);
    })


    ctx.body = newUser

  }


})

/**
 * @route POST api/users/login
 * @desc  登录接口，返回一个token
 * @access 接口是公开
 * 
 */
router.post('/login', async ctx => {
  ctx.state = 200;
  const findResult = await User.find({
    id: ctx.request.body.id
  });

  // console.log(ctx.request);
  if (findResult.length == 0) {
    //没找到注册id
    ctx.state = 404;
    ctx.body = {
      msg: 'this email do not login'
    }
  } else {
    const userPassword = findResult[0].password;
    const result = tools.bcryptCompare(ctx.request.body.password, userPassword)
    console.log(result);
    if (result) {
      const payload = {
        id: ctx.request.body.id,
        email: ctx.request.body.email
      }
      const token = jwt.sign(payload, keys.secretOrkey, {
        expiresIn: 3600
      })


      ctx.body = {
        msg: '登录成功',
        token: `Bearer ${token}`
      }
    } else {
      ctx.status = 500;
      ctx.body = {
        msg: '密码错误'
      }
    }
  }
  // ctx.body = {
  //   msg: '222'
  // }

})


/**
 * @route GET api/users/current
 * @desc  用接口，返回一个token
 * @access 接口是私用的
 * 
 */

router.get('/current', passport.authenticate('jwt', {
  session: false
}), async ctx => {
  ctx.body = {
    id: ctx.state.user.id,
    email: ctx.state.user.email,
    nickname: ctx.state.user.nickname
  }

})


module.exports = router.routes();