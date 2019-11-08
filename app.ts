import * as path from 'path'
import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'

const app: Koa = new Koa()
import router from "./router/router"
import middleware from './middleware'

middleware(app)

router(app)

app.listen(3000, () => {
    console.log(`server is running at http://localhost:3000`)
})
