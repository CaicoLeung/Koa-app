import Koa, { Context } from 'koa'
import logger, { IBaseIngoInterface } from './logger'

export default (options: IBaseIngoInterface) => {
    const loggerMiddleware = logger(options)
    return (ctx: Context, next: Koa.Next) => {
        return loggerMiddleware(ctx, next)
            .catch((e) => {
                if (ctx.status <500) {
                    ctx.status = 500
                }
                ctx.log.error(e.stack)
                ctx.state.logged = true
                ctx.throw(e)
            })
    }
}
