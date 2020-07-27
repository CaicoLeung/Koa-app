import { Context, Next } from 'koa'

export default {
  upload: async (ctx: Context & { request: { files: any} }, next: Next) => {
    console.log('ctx.file', ctx.file)
    ctx.response.body = {
      status: 0,
      data: null,
      message: `${ctx.file.filename}上传成功`
    }
    await next()
  }
}
