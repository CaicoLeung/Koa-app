import * as Router from "koa-router"
import * as Koa from 'koa'
import controller from '../controller'

const router: Router = new Router<any, {}>()

export default (app: Koa) => {
    router.get('/', controller.home.index)
    router.get('/home', controller.home.home)
    // router.get('/home/:id/:name', HomeController.homeParams)
    router.get('/user', controller.home.login)
    router.post('/user/register', controller.home.register)
    router.all('/*', async (ctx, next) => {
        const { origin, Origin, referer, Referer } = ctx.request.headers
        const allowOrigin = origin || Origin || referer || Referer || '*'
        ctx.set('Access-Control-Allow-Origin', allowOrigin)
        ctx.set('Access-Control-Allow-Headers', ['Content-Type', 'Authorization', 'X-Requested-With'])
        ctx.set('Access-Control-Allow-Methods', ['PUT', 'POST', 'GET', 'DELETE', 'OPTIONS'])
        ctx.set('Access-Control-Allow-Credentials', 'true') //可以携带cookies
        ctx.set('X-Powered-By', 'Koa')
        if (ctx.request.method === 'OPTIONS') {
            ctx.response.status = 200
        } else {
            await next()
        }
    })
    // router.use((ctx, next) => {
    //     if(!['/', '/home', '/404'].includes(ctx.request.path)) {
    //         ctx.redirect('/home')
    //     }
    // })
    app.use(router.routes())
        .use(router.allowedMethods())
}
