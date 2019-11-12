import * as mongoose from 'mongoose'
import chalk from "chalk"
const config = require('config-lite')(__dirname)

mongoose.connect(config.url, {
    useNewUrlParser: true
})

const db = mongoose.connection

db.once('open', () => console.log(chalk.green('连接数据库成功')))
db.on('error', (error) => console.log(chalk.red('Error in MongoDb connection: ' + error)))
db.on('close', () => {
    console.log(chalk.red('数据库断开, 尝试重新连接...'))
    mongoose.connect(config.url, {
        useNewUrlParser: true
    })
})

export default db
