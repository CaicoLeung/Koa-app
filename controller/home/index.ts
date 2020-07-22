import Koa, { Context, Next } from 'koa'
import * as Router from 'koa-router'
import HomeService from '../../service/home'
import chalk from "chalk"
import UserModel from '../../models/userModel'

export default {
  all: async (ctx: Context, next: Next) => {
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
  index: async (ctx: Context, next: Next) => {
    await ctx.render('home/index', {
      title: '主页',
      btnName: 'Login'
    })
  },
  home: async (ctx: Context, next: Next) => {
    console.log(chalk.green(JSON.stringify(ctx.request.query)))
    console.log(chalk.yellow(ctx.request.querystring))
    ctx.response.body = `<h1>${ctx.request.querystring || 'home page'}</h1>`
  },
  homeParams: async (ctx: Context, next: Next) => {
    ctx.response.body = `<h1>home page ${ctx.params.id}  ${ctx.params.name}</h1>`
  },
  user: async (ctx: any, next: Next) => {
    await ctx.render('home/login', {
      title: '登录'
    })
  },
  login: async (ctx: Context, next: Next) => {
    const params = ctx.request.body
    const res = await HomeService.login(params.nickname, params.password)
    if (res.status === -1) {
      await ctx.render('home/login', res.data)
    } else {
      ctx.state.title = '个人中心'
      await ctx.render('home/success', res.data)
    }
  },
  register: async (ctx: Context, next: Next) => {
    console.log(chalk.yellow("body参数: " + JSON.stringify(ctx.request.body)))
    const params = ctx.request.body
    const res = await HomeService.register({ ...params })
    if (res.status === -1) {
      ctx.state.title = '注册失败'
      await ctx.render('home/register', res.data)
    } else {
      ctx.state.title = '注册成功'
      await ctx.render('home/login', res.data)
    }
  }
}
