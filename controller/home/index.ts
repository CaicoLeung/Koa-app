import HomeService from '../../service/home'
import chalk from "chalk"
import User from "../../models/userModel"

export default {
    all: async (ctx, next) => {
        const { origin, Origin, referer, Referer } = ctx.request.headers
        const allowOrigin = origin || Origin || referer || Referer || '*'
        ctx.set('Access-Control-Allow-Origin', allowOrigin)
        ctx.set('Access-Control-Allow-Headers', ['Content-Type', 'Authorization', 'X-Requested-With'])
        ctx.set('Access-Control-Allow-Methods', ['PUT', 'POST', 'GET', 'DELETE', 'OPTIONS'])
        ctx.set('Access-Control-Allow-Credentials', 'true') //可以携带cookies
        ctx.set('X-Powered-By', 'Koa')
        if (ctx.request.method === 'OPTIONS') {
            ctx.response.status = 200
        } else {
            await next()
        }
    },
    index: async (ctx, next) => {
        await ctx.render('home/index', {
            title: '主页',
            btnName: 'Login'
        })
    },
    home: async (ctx, next) => {
        console.log(chalk.green(JSON.stringify(ctx.request.query)))
        console.log(chalk.yellow(ctx.request.querystring))
        ctx.response.body = `<h1>${ctx.request.querystring || 'home page'}</h1>`
    },
    homeParams: async (ctx, next) => {
        ctx.response.body = `<h1>home page ${ctx.params.id}  ${ctx.params.name}</h1>`
    },
    login: async (ctx, next) => {
        await ctx.render('home/login', {
            title: '登录',
            btnName: 'Login'
        })
    },
    register: async (ctx, next) => {
        console.log(chalk.yellow(JSON.stringify(ctx.request.body)))
        const { name = '', password = '', regist = '' } = ctx.request.body
        if (regist === '注册') {
            const user = new User({
                name,
                password
            })
            user.save((err) => {
                if (err) {
                    console.log(chalk.red(err))
                } else {
                    const res = HomeService.register(name, password)
                    console.log(chalk.green('注册成功'))
                    ctx.render('home/login', res.data)
                }
            })
        } else if (regist === '登录') {
            const res = HomeService.login(name, password)
            if(res.status === -1) {
                await ctx.render('home/login', res.data)
            } else {
                ctx.state.title = '个人中心'
                await ctx.render('home/success', res.data)
            }
        }
    }
}
