const Koa = require('koa');
const path = require('path');
const views = require('koa-views');
const router = require('./routes');
const serve = require('koa-static');
const mongoose = require('mongoose');
const session = require('koa-session');
const bodyParser = require('koa-bodyparser');
const Flash = require('./middlewares/flash');
const marked = require('marked');

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



app.use(async (ctx, next) => {
  // 设置全局状态机
  ctx.state.ctx = ctx;
  await next();
});

app.use(new Flash());

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false,
});

app.use(async (ctx, next) => {
  ctx.state.ctx = ctx;
  ctx.state.marked = marked;
  await next();
});

router(app);

mongoose.connect(CONFIG.mongodb);


app.listen(3000, () => {
  console.log('server is running at http://localhost:3000/');
});
