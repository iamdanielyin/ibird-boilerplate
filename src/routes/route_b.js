module.exports = {
    name:'route_b',
    method: 'POST',
    path: '/route/b',
    middleware: ctx => ctx.body = `Hello '${ctx.originalUrl}' =>  '/route/b'.`
};