import * as path from 'path'
import * as numjucks from 'nunjucks'
interface IMiHttpErrorOptions {
    errorPageFolder: string;
}
export default (options: IMiHttpErrorOptions) => {
    // 400.html 404.html other.html 的存放位置
    const folder = options.errorPageFolder
    // 指定默认模板文件
    const templatePath = path.resolve(__dirname, './mi-http-error.html')
    return async (ctx, next) => {
        let fileName = 'other'
        try {
            await next
            // 如果没有更改过 response 的 status，则 koa 默认的 status 是 404
            if (ctx.response.status === 404 && !ctx.response.body) ctx.throw(404)
        } catch (e) {
            const status = parseInt(e.status)
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
            }
            const filePath = folder ? path.join(folder, `${fileName}.html`) : templatePath
        }
    }
}
