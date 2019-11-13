import * as Router from "koa-router"
import * as Koa from 'koa'
import controller from '../controller'

const router: Router = new Router<any, {}>()

export default (app: Koa) => {
    router.get('/', controller.home.index)
    router.get('/home', controller.home.home)
    router.get('/home/:id/:name', controller.home.homeParams)
    router.get('/user', controller.home.login)
    router.get('/userlist', controller.userlist.index)
    router.post('/user/register', controller.home.register)
    router.post('/userlist/deleteUser', controller.userlist.delete)
    router.all('/*', controller.home.all)
    // router.use((ctx, next) => {
    //     if(!['/', '/home', '/404'].includes(ctx.request.path)) {
    //         ctx.redirect('/home')
    //     }
    // })
    app.use(router.routes())
        .use(router.allowedMethods())
}
