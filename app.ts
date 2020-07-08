import Koa from 'koa'

const app = new Koa()
import router from "./router/router"
import middleware from './middleware/index'
import db from './database/index'

db()

middleware(app)

router(app)

app.listen(3000, () => {
    console.log(`server is running at http://localhost:3000`)
})
