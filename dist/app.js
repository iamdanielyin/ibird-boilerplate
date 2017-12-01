'use strict';

var ibird = require('ibird');
var koaLogger = require('koa-logger');
var session = require('koa-session');
var appName = 'myApp';

var i18nAddon = require('ibird-i18n');
var mongooseAddon = require('ibird-mongoose');
var accountsAddon = require('ibird-accounts');
var loggerAddon = require('ibird-logger');

app.use(koaLogger());

var app = ibird.newApp({
    name: appName,
    mongo: 'mongodb://localhost/' + appName
});

app.import(i18nAddon, { localesDir: 'locales' });
app.import(loggerAddon);
app.import(mongooseAddon);
app.import(accountsAddon, {
    tokenKey: 'ibird_token',
    secretOrPrivateKey: 'ibird_app_secret',
    payloadGetter: function payloadGetter(ctx) {
        var _ctx$query = ctx.query,
            username = _ctx$query.username,
            password = _ctx$query.password;

        return username === 'yinfxs' && password === '123456' ? {
            username: 'yinfxs',
            name: 'Daniel Yin',
            app: 'ibird',
            home: 'http://ibird.yinfxs.com'
        } : null;
    },
    whitelists: ['POST /login']
});

app.useDir('middleware');
app.mountDir('routes');
app.modelDir('models');

app.play();
'use strict';

module.exports = function (ctx, next) {
    console.log('我是middleware文件夹下的test1...');
    next();
};
'use strict';

module.exports = function (ctx, next) {
    console.log('我是middleware文件夹下的test2...');
    next();
};
'use strict';

module.exports = {
    path: '/routes/route1',
    middleware: function middleware(ctx) {
        return ctx.body = 'Hello \'' + ctx.originalUrl + '\'';
    }
};
'use strict';

module.exports = {
    name: 'route2',
    method: 'POST',
    path: '/routes/route2',
    middleware: function middleware(ctx) {
        return ctx.body = 'Hello \'' + ctx.originalUrl + '\'';
    }
};
'use strict';

module.exports = function (router) {
    router.get('/routes/route3/r1', function (ctx) {
        return ctx.body = 'Hello \'' + ctx.originalUrl + '\'';
    });
    router.post('/routes/route3/r2', function (ctx) {
        return ctx.body = 'Hello \'' + ctx.originalUrl + '\'';
    });
    router.put('/routes/route3/r3', function (ctx) {
        return ctx.body = 'Hello \'' + ctx.originalUrl + '\'';
    });
    router.delete('/routes/route3/r4', function (ctx) {
        return ctx.body = 'Hello \'' + ctx.originalUrl + '\'';
    });
};
//# sourceMappingURL=app.js.map
