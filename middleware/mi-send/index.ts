import Koa, { Context } from 'koa'

export default () => {
  return async (ctx: Context, next: Koa.Next) => {
    ctx.send = (json: any) => {
      ctx.set('Content-type', 'application/json')
      ctx.body = JSON.stringify(json)
    }
    ctx.log.error('caico')
    await next()
  }
}
