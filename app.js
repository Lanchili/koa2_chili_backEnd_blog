const Koa = require("koa");
const Router = require("koa-router")
const mongoose = require("mongoose")
const bodyParser = require('koa-bodyparser');
const passport = require('koa-passport')
const cors = require("koa2-cors")
const CORS_CONFIG = require('./config/cors')
//实例化koa


const app = new Koa();
const router = new Router();


//使用koa-bodyparse

app.use(bodyParser())

//引入passport
app.use(passport.initialize())
app.use(passport.session())


require('./config/passport')(passport)
//引入uses.js
const users = require('./routes/api/users');
const articles = require('./routes/api/article')

//设置跨域
app.use(cors(CORS_CONFIG))


//路由
// router.get("/app", async ctx => {
//   ctx.body = {
//     msg: 'hallo koa'
//   }
// })
//连接数据库
// db/db.js
// const mongoose = require('mongoose')

// import keys from './config/keys.js'
const keys = require('./config/keys.js')
const DB_URL = keys.mongoURI;
console.log(DB_URL);
mongoose.connect(DB_URL)

mongoose.connection.on('connected', function () {
  console.log('Mongoose connection open to ' + DB_URL);
});
/**
 * 连接异常 error 数据库连接错误
 */
mongoose.connection.on('error', function (err) {
  console.log('Mongoose connection error: ' + err);
});
/**
 * 连接断开 disconnected 连接异常断开
 */
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose connection disconnected');
});


//配置路由地址  api/users/test

router.use('/api/users', users)
router.use('/api/acticle', articles)


//配置路由

app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on ${port}!`);
})