import UserModel from "../models/userModel"
import chalk from "chalk"

interface IDataInterface {
    status: number;
    data: {
        title: string;
        content: string;
    }
}

let data: IDataInterface;
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
          return {
            status: -1,
            data: {
                title: '注册出错',
                content: '账号已存在'
            }
          }
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
                data = {
                    status: -1,
                    data: {
                        title: '注册失败',
                        content: '注册失败了'
                    }
                }
            } else {
                console.log(chalk.green('注册成功'))
                data = {
                    status: 0,
                    data: {
                        title: '注册成功',
                        content: '已注册'
                    }
                }
            }
            return data
        })
        return {
            status: 0,
            data: {
                title: '注册成功',
                content: '已注册, 请登录'
            }
        }
    },
    login: (name: string, pwd: string) => {
        if(name === 'caico' && pwd === '123456') {
            data = {
                status: 0,
                data: {
                    title: '个人中心',
                    content: '欢迎进入个人中心'
                }
            }
        } else {
            data = {
                status: -1,
                data: {
                    title: '登录失败',
                    content: '请输入正确的账号信息'
                }
            }
        }
        return data
    },
}
