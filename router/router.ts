import * as Router from "koa-router"
import * as Koa from 'koa'
import HomeController from '../controller/home'

const router: Router = new Router<any, {}>()

export default (app: Koa) => {
    router.get('/', HomeController.index)
    router.get('/home', HomeController.home)
    // router.get('/home/:id/:name', HomeController.homeParams)
    router.get('/user', HomeController.login)
    router.post('/user/register', HomeController.register)
    router.all('/*', async (ctx, next) => {
        ctx.set('Access-Control-Allow-Origin', '*')
        await next()
    })
    // router.use((ctx, next) => {
    //     if(!['/', '/home', '/404'].includes(ctx.request.path)) {
    //         ctx.redirect('/home')
    //     }
    // })
    app.use(router.routes())
        .use(router.allowedMethods())
}
