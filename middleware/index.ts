import * as Koa from 'koa'
import * as path from "path"
import * as staticFiles from "koa-static"
import * as nunjucks from 'koa-nunjucks-2'
import * as bodyParser from "koa-bodyparser"

import miSend from './mi-send'
import miLog from './mi-log'

export default (app: Koa) => {
    app.use(miLog())
    // 指定 public目录为静态资源目录，用来存放 js css images 等
    app.use(staticFiles(path.resolve(__dirname, '..', './public')))
    app.use(nunjucks({
        ext: 'html',
        path: path.join(__dirname, '..', 'views'),
        nunjucksConfig: {
            trimBlocks: true //开启转义, 防XSS攻击
        }
    }))
    // 解析request body
    app.use(bodyParser())
    app.use(miSend())
}
