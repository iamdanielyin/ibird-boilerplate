const pkgjson = (process.env.NODE_ENV !== 'production') ?
    require('../../package.json') :
    require('../package.json');

module.exports = {
    path: '/appinfo',
    middleware: ctx => {
        ctx.body = {
            name: pkgjson.name,
            version: pkgjson.version,
            description: pkgjson.description,
            author: pkgjson.author
        };
    }
};