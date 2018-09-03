const Koa = require('koa');
const path = require('path');
const views = require('koa-views');
const router = require('./routes');
const serve = require('koa-static');
const mongoose = require('mongoose');
const session = require('koa-session');
const bodyParser = require('koa-bodyparser');

const CONFIG = require('./config/config');

const app = new Koa();

app.keys = ['somethings'];

app.use(bodyParser());

app.use(session({
  key: CONFIG.session.key,
  maxAge: CONFIG.session.maxAge,
}, app));

app.use(views(path.join(__dirname, 'views'), {
  map: {
    html: 'nunjucks',
  },
}));

app.use(serve(
  path.join(__dirname, 'public'),
));

app.use(async (ctx, next) => {
  //设置全局状态机
  ctx.state.ctx = ctx;
  await next();
});

router(app);

mongoose.connect(CONFIG.mongodb);


app.listen(3000, () => {
  console.log('server is running at http://localhost:3000/');
});
