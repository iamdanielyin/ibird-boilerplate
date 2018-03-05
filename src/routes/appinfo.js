let pkgjson;

try {
    pkgjson = require('../package.json');
} catch (error) {
    pkgjson = require('../../package.json');
}

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