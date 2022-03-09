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
 * @route GET api/acticle/test
 * @desc  测试接口
 * @access 接口是公开
 * 
 */

router.get('/test', async ctx => {
  ctx.state = 200;
  ctx.request.body.msg = 'success'
  ctx.request.body.dataCode = '200'
  ctx.request.body.string = 'success'
  ctx.body = ctx.request.body;
  console.log('article test is success');
})


module.exports = router.routes();