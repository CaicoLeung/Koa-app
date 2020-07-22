import Koa, { Context } from 'koa'
import User from "../../models/userModel"
import chalk from "chalk"

export default {
  index: async (ctx: Context, next: Koa.Next) => {
    await User.find({}, async (err, userlist) => {
      if (err) {
        throw err
      } else {
        await ctx.render('userlist/userlist', {
          title: '注册用户列表',
          userlist
        })
      }
    });
  },
  delete: async (ctx: Context, next: Koa.Next) => {
    const { userId = '' } = ctx.request.body
    console.log(chalk.red('userId' + userId))
    await User.deleteOne({ _id: userId }, (err) => {
      if (err) throw err
      ctx.response.body = {
        status: 0,
        data: {},
        message: 'delete ok'
      }
    })
  }
}
