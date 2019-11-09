import * as path from 'path'
import * as nunjucks from 'nunjucks'
import chalk from "chalk"

interface IMiHttpErrorOptions {
    errorPageFolder: string;
    env: string;
}
export default (options: IMiHttpErrorOptions) => {
    console.log(chalk.red("MiHttpError Middleware Into"))
    // 增加环境变量，用来传入到视图中，方便调试
    const env = options.env || process.env.NODE_ENV || 'development'
    // 400.html 404.html other.html 的存放位置
    const folder = options.errorPageFolder
    // 指定默认模板文件
    const templatePath = path.resolve(__dirname, './mi-http-error.html')
    return async (ctx, next) => {
        let fileName = 'other'
        try {
            await next()
            // 如果没有更改过 response 的 status，则 koa 默认的 status 是 404
            if (ctx.response.status === 404 && !ctx.response.body) ctx.throw(404)
        } catch (e) {
            let status = parseInt(e.status)
            // 默认错误信息为 error 对象上携带的 message
            const message = e.message
            // 对 status 进行处理，指定错误页面文件名
            if (status >= 400) {
                switch (status) {
                    case 400:
                    case 404:
                    case 500:
                        fileName = status.toString()
                        break
                    default:
                        fileName = 'other'
                }
            } else {
                status = 500
                fileName = status.toString()
            }
            const filePath = folder ? path.join(folder, `${fileName}.html`) : templatePath
            // 渲染对应错误类型的视图，并传入参数对象
            try {
                nunjucks.configure( folder ? folder : __dirname )
                const data = await nunjucks.render(filePath, {
                    env, // 指定当前环境参数
                    status: e.status || e.message, // 如果错误信息中没有 status，就显示为 message
                    error: e.message, // 错误信息
                    stack: e.stack // 错误的堆栈信息
                })
                // 赋值给响应体
                ctx.status = status
                ctx.body = data
            } catch (e) {
                // 如果中间件存在错误异常，直接抛出信息，由其他中间件处理
                ctx.throw(500, `错误页渲染失败:${e.message}`)
            }
        }
    }
}
