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
const openAddon = require('ibird-open');

const configUtils = require('./utils/config');
const accountUtils = require('./utils/account');

// 初始化应用实例
const app = ibird.newApp(assign({
    name: 'myApp',
    statics: {
        '/': path.join(__dirname, 'admin/dist')
    },
    prefix: '/api',
    mongo: 'mongodb://localhost/hello-ibird',
}, configUtils()));

// 引用koa中间件
app.use(koaLogger());
app.keys = [accountUtils.secret];
app.use(session({ key: 'ibird:sess' }, app));
app.get('/', ctx => ctx.body = 'App is running.');

// 引用ibird插件
app.import(openAddon);
app.import(i18nAddon, { localesDir: path.join(__dirname, 'config/locales') });
app.import(loggerAddon, { logDir: path.join(__dirname, 'logs') });
app.import(mongooseAddon, {
    metadataPath: '/metadata'
});
app.import(accountsAddon, {
    tokenKey: accountUtils.tokenKey,
    secretOrPrivateKey: accountUtils.secret,
    payloadGetter: accountUtils.login,
    whitelist: accountUtils.whitelist
});

// 挂载相关目录
app.useDir(path.join(__dirname, 'middleware'));
app.mountDir(path.join(__dirname, 'routes'));
app.modelDir(path.join(__dirname, 'models'));

app.play();