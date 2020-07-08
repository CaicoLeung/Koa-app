import Koa from 'koa'
import * as path from "path"
import * as ip from 'ip'
import staticFiles from "koa-static"
import bodyParser from "koa-bodyparser"
const nunjucks = require('koa-nunjucks-2')

import miSend from './mi-send/index'
import miLog from './mi-log/index'
import miHttpError from './mi-http-error/index'

export default (app: Koa) => {
    // 应用请求错误处理中间件
    app.use(miHttpError({
        errorPageFolder: path.resolve(__dirname, '../views/errorPage'),
        env: app.env
    }))
    app.use(miLog({
        env: app.env,
        projectName: 'koa2-tutorial',
        appLogLevel: 'debug',
        dir: 'logs',
        serverIp: ip.address()
    }))
    // 指定 public目录为静态资源目录，用来存放 js css images 等
    app.use(staticFiles(path.resolve(__dirname, '../public')))
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
    // 增加错误的监听处理
    app.on("error", (err, ctx: Koa.Context) => {
        if (ctx && ctx.headerSent && ctx.status < 500) {
            ctx.status = 500
        }
        if (ctx && ctx.log && ctx.log.error) {
            if (!ctx.state.logged) {
                ctx.log.error(err.stack)
            }
        }
    })
}
