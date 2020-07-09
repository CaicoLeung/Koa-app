import Router from "koa-router"
import * as Koa from 'koa'
import controller from '../controller'

const router: Router = new Router()

export default (app: Koa) => {
    router.get('/', controller.home.index)
    router.get('/home', controller.home.home)
    router.get('/home/:id/:name', controller.home.homeParams)
    router.get('/user', controller.home.login)
    router.get('/userlist', controller.userlist.index)
    router.post('/user/register', controller.home.register)
    router.post('/userlist/deleteUser', controller.userlist.delete)
    router.all(['/', '/home', '/home/:id/:name', '/user', '/userlist', '/user/register', '/userlist/deleteUser'], controller.home.all)
    router.use((ctx: Koa.Context, next: Koa.Next) => {
        if(!['/', '/home', '/404'].includes(ctx.request.path)) {
            ctx.redirect('/home')
        }
    })
    app.use(router.routes())
        .use(router.allowedMethods())
}
