const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');

const router = require('./core/router');
const mongodb = require('./core/mongodb');

const serverConfig = require('./config/server.json');
const securityConfig = require('./config/security.json');

mongodb.initialize();

const app = new Koa();

app.use(bodyParser());

if (serverConfig.cors) {
  app.use(cors(securityConfig.cors));
}

app.use(router.routes());
app.use(router.allowedMethods());

const { port, host } = serverConfig;
app.listen(port, host);
console.log(`Blog API Server listening on http://${host}:${port}${serverConfig.apiRoot}`);
