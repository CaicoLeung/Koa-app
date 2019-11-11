import HomeService from '../../service/home'
import chalk from "chalk"

export default {
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
        const { name = '', password = '' } = ctx.request.body
        const res = HomeService.register(name, password)
        console.log(res)
        if(res.status === -1) {
            await ctx.render('home/login', res.data)
        } else {
            ctx.state.title = '个人中心'
            await ctx.render('home/success', res.data)
        }
    }
}
