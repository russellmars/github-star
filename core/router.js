const Router = require('koa-router');
const serverConfig = require('../config/server.json');
const router = new Router({ prefix: serverConfig.apiRoot });

const mailController = require('../controllers/mail.controller')

router.get('/', (ctx, next) => {
  ctx.body = {
    message: 'hello world'
  };
});

router.post('/mail', mailController.create)

module.exports = router;
