import { Context } from 'koa'

export default (ctx: Context, message: string, commonInfo: {
  projectName: string,
  serverIp: string
}): string => {
    const { method, url, host, headers } = ctx.request
    const client = {
        method,
        url,
        host,
        message,
        referer: headers['referer'],
        userAgent: headers['user-agent']
    }
    return JSON.stringify(Object.assign(commonInfo, client))
}
