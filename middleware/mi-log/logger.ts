import log4js from 'log4js'
import access from "./access"
import Koa, { Context } from 'koa'

type envTpye = typeof envTypes[number]
type methodsType = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal' | 'mark'
export interface IBaseIngoInterface {
    appLogLevel: methodsType,
    dir: string,
    env: string,
    projectName: string,
    serverIp: string
}

const envTypes = <const>['env', 'local', 'development']
const methods: Array<methodsType> = ['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'mark']
//提取默认共用参数对象
const baseInfo: IBaseIngoInterface = {
    appLogLevel: 'debug',
    dir: 'logs',
    env: 'env',
    projectName: 'koa2-tutorial',
    serverIp: '0.0.0.0'
}

export default (options: IBaseIngoInterface) => {
    const contextLogger: Record<methodsType, any> = {
      trace: null,
      debug: null,
      info: null,
      warn: null,
      error: null,
      fatal: null,
      mark: null
    };
    const appenders: {
      cheese: {
        type: string,
        filename: string,
        pattern: string
        alwaysIncludePattern: boolean
      },
      out: {
        type: string
      }
    } = {
        cheese: undefined,
        out: undefined
    }
    const opts = Object.assign({}, baseInfo, options)
    const { env, appLogLevel, dir, serverIp, projectName } = opts
    const commonInfo = { serverIp, projectName }
    appenders.cheese = {
        type: 'dateFile',
        filename: `${dir}/task`,
        pattern: 'yyy-MM-dd.log',
        alwaysIncludePattern: true
    }
    if (envTypes.includes(env as "env" | "local" | "development")) {
        appenders.out = {
            type: 'console'
        }
    }
    const config = {
        appenders,
        categories: {
            default: {
                appenders: Object.keys(appenders),
                level: appLogLevel
            }
        }
    }
    const logger = log4js.getLogger('cheese')
    return async (ctx: Context, next: Koa.Next) => {
        const start = Date.now()
        log4js.configure(config)
        methods.forEach((method: methodsType) => {
            contextLogger[method] = (message: string) => {
                logger[method](access(ctx, message, commonInfo))
            }
        })
        ctx.log= contextLogger
        await next()
        const end = Date.now()
        const message = `path: ${ctx.request.path}, method: ${ctx.request.method}, 响应时间: ${end - start}ms`
        logger.info(access(ctx, message, commonInfo))
    }
}
