/**
 * 模块依赖
 */

const path = require('path');
const ibird = require('ibird');
const koaLogger = require('koa-logger');
const session = require('koa-session');
const i18nAddon = require('ibird-i18n');
const mongooseAddon = require('ibird-mongoose');
const accountsAddon = require('ibird-accounts');
const loggerAddon = require('ibird-logger');
const openAddon = require('ibird-open');
const assign = require('ibird-utils').assign;
const env = process.env.NODE_ENV || 'development';
const config = require(`./config/environments/${env}`);
const appName = 'myApp';

const app = ibird.newApp(assign({
    env,
    name: appName,
    statics: {
        '/': path.join(__dirname, 'admin/dist')
    },
    mongo: `mongodb://localhost/${appName}`,
}, config));

app.keys = [appName];

app.use(koaLogger());
app.use(session({ key: appName + ':sess' }, app));

app.import(openAddon);
app.import(i18nAddon, { localesDir: path.join(__dirname, 'config/locales') });
app.import(loggerAddon, { logDir: path.join(__dirname, 'logs') });
app.import(mongooseAddon, {
    metadataPath: '/metadata'
});
app.import(accountsAddon, {
    tokenKey: 'ibird_token',
    secretOrPrivateKey: 'ibird_app_secret',
    payloadGetter: function (ctx) {
        const { username, password } = ctx.query;
        return (username === 'yinfxs' && password === '123456') ? {
            username: 'yinfxs',
            name: 'Daniel Yin',
            app: 'ibird',
            home: 'http://ibird.yinfxs.com'
        } : null;
    },
    whitelists: [
        'POST /login',
        '\w* /'
    ]
});

app.useDir(path.join(__dirname, 'middleware'));
app.mountDir(path.join(__dirname, 'routes'));
app.modelDir(path.join(__dirname, 'models'));

app.play();