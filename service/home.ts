import UserModel from "../models/userModel"
import chalk from "chalk"
import User from "../models/userModel";

interface IDataInterface {
  status: number;
  data: {
    title: string;
    content: string;
  }
}

let data: IDataInterface;

class Response {
  status = 0
  data: {
    title: string,
    content: string
  }
  constructor(status: -1 | 0, data ={title: '', content: ''}) {
    this.status = status
    this.data = data
  }
  get () {
    return {
      status: this.status,
      data: this.data
    }
  }
}

export default {
  register: async (params: {
    nickname: string
    password: string
    age: number
    firstName: string
    lastName: string
  }) => {
    const { nickname, password, age = 0, firstName, lastName } = params
    const result = await UserModel.find({ nickname }).exec()
    if (result.length > 0) {
      data = new Response(-1, { title: '注册失败', content: '用户已存在~' })
    }
    const user = new UserModel({
      nickname,
      password,
      age,
      name: {
        first: firstName,
        last: lastName
      }
    })
    await user.save((err) => {
      if (err) {
        console.log(chalk.red(err))
        data = new Response(-1, { title: '注册失败', content: '注册失败了~' })
      } else {
        console.log(chalk.green('注册成功'))
        data = new Response(0, { title: '注册成功', content: '已注册' })
      }
      return data
    })
    return new Response(0, { title: '注册成功', content: '已注册, 请登录' })
  },
  login: async (name: string, pwd: string) => {
    const result = await UserModel.findOne({ nickname: name }).exec()
    console.log(result, name)
    if (result === null) {
      data = new Response(-1, { title: '登录失败', content: '账号不存在!' })
    } else if (result.name && result.password === pwd) {
      data = new Response(0, { title: '个人中心', content: '欢迎进入个人中心!' })
    } else {
      data = new Response(-1, { title: '登录失败', content: '请输入正确的账号信息!' })
    }
    return data
  },
}
