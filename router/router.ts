import Router from "koa-router"
import Koa, { Context } from 'koa'
import controller from '../controller'
import moment from 'moment'
const multer = require('@koa/multer')

const router: Router = new Router()
const storage = multer.diskStorage({
  destination: `uploads/${moment().format('YYYYMMDD')}`,
  filename: (ctx: Context, file: any, cb: Function) => {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage })

export default (app: Koa) => {
    router.get('/', controller.home.index)
    router.get('/home', controller.home.home)
    router.get('/home/:id/:name', controller.home.homeParams)
    router.get('/user', controller.home.user)
    router.get('/userlist', controller.userlist.index)
    router.get('/user/regist', controller.home.regist)
    router.post('/user/login', controller.home.login)
    router.post('/user/register', controller.home.register)
    router.post('/userlist/deleteUser', controller.userlist.delete)
    router.post('/upload', upload.single('avatar'), controller.multerUpload.upload)
    router.all(['/', '/home', '/home/:id/:name', '/user', '/userlist', '/user/login', '/user/register', '/userlist/deleteUser', '/upload'], controller.home.all)
    router.use((ctx: Koa.Context, next: Koa.Next) => {
        if(['/', '/home', '/404'].includes(ctx.request.path)) {
            ctx.redirect('/home')
        }
    })
    app.use(router.routes())
      .use(router.allowedMethods())
}
