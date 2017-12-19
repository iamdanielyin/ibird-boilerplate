module.exports = {
    path: '/route/a',
    middleware: ctx => ctx.body = `Hello '${ctx.originalUrl}' =>  '/route/a'.`
};