const Router = require('koa-router');
const serverConfig = require('../config/server.json')
const router = new Router({ prefix: serverConfig.apiRoot });

router.get('/', (ctx, next) => {
  ctx.body = {
    message: 'hello world'
  };
});

module.exports = router;
