module.exports = (router) => {
    router.get('/route/c/r1', ctx => ctx.body = `Hello '${ctx.originalUrl}' =>  '/route/c/r1'.`);
    router.post('/route/c/r2', ctx => ctx.body = `Hello '${ctx.originalUrl}' =>  '/route/c/r2'.`);
    router.put('/route/c/r3', ctx => ctx.body = `Hello '${ctx.originalUrl}' =>  '/route/c/r3'.`);
    router.delete('/route/c/r4', ctx => ctx.body = `Hello '${ctx.originalUrl}' =>  '/route/c/r4'.`);
};