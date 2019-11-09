import * as log4js from 'log4js'
import access from "./access"

type envTpye = typeof envTypes[number]
type methodsType = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal' | 'mark'
interface IBaseIngoInterface {
    appLogLevel: methodsType,
    dir: string,
    env: envTpye,
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

export default (options:IBaseIngoInterface) => {
    const contextLogger = {}
    const appenders = {
        cheese: undefined,
        out: undefined
    }
    const opts= Object.assign({}, baseInfo, options)
    const { env, appLogLevel, dir, serverIp, projectName } = opts
    const commonInfo = { serverIp, projectName }
    appenders.cheese = {
        type: 'dateFile',
        filename: `${dir}/task`,
        pattern: 'yyy-MM-dd.log',
        alwaysIncludePattern: true
    }
    if (envTypes.includes(env)) {
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
    return async (ctx, next) => {
        const start = Date.now()
        log4js.configure(config)
        methods.forEach((method: methodsType) => {
            contextLogger[method] = (message) => {
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
