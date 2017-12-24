/**
 * 模块依赖
 */

const path = require('path');
const koaLogger = require('koa-logger');
const session = require('koa-session');

const ibird = require('ibird');
const assign = require('ibird-utils').assign;
const i18nAddon = require('ibird-i18n');
const mongooseAddon = require('ibird-mongoose');
const accountsAddon = require('ibird-accounts');
const loggerAddon = require('ibird-logger');
const taskAddon = require('ibird-task');
const openAddon = require('ibird-open');

const configUtils = require('./utils/config');
const accountUtils = require('./utils/account');
const callbackUtils = require('./utils/callback');

// 初始化应用实例
const assetsDir = path.join(__dirname, 'assets');
const app = ibird.newApp(assign({
    name: 'myApp',
    multipart: true,
    uploadDir: path.join(assetsDir, 'upload'),
    statics: {
        '/assets': assetsDir,
        '/assets/download': path.join(assetsDir, 'download'),
        '/assets/docs': path.join(assetsDir, 'docs')
    },
    prefix: '/api',
    middlewareDir: path.join(__dirname, 'middleware'),
    routesDir: path.join(__dirname, 'routes')
}, configUtils()));

// 引用koa中间件
app.use(koaLogger());
app.keys = [accountUtils.secret];
app.use(session({ key: 'ibird:sess' }, app));

// 引用ibird插件
app.import(openAddon);
app.import(i18nAddon, { localesDir: path.join(__dirname, 'config/locales') });
app.import(loggerAddon, { logDir: path.join(__dirname, 'logs') });
app.import(taskAddon, { dir: path.join(__dirname, 'tasks') });
app.import(mongooseAddon, {
    mongo: 'mongodb://localhost/hello-ibird',
    metadataPath: '/metadata',
    dir: path.join(__dirname, 'models')
});
app.import(accountsAddon, {
    tokenKey: accountUtils.tokenKey,
    secretOrPrivateKey: accountUtils.secret,
    payloadGetter: accountUtils.login,
    whitelist: accountUtils.whitelist
});

app.play(callbackUtils.bind(app));