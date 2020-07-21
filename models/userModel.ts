import { Schema, Model, model, Document } from 'mongoose'

interface UserDocument extends Document {
    nickname: string
    password: string
    age: number
    name: {
      first: string,
      last: string
    }
}

interface UserModelConstructor extends Model<UserDocument>{

}

// 定义用户schema
const userSchema = new Schema({
    createTime: {
        type: Date,
        default: Date.now
    },
    nickname: {
        type: String,
        trim: true,
        unique: true,
        match: /^[0-9a-zA-Z]{1,2}|[\u4e00-\u9eff]{1,8}$/,
        index: true
    },
    age: Number,
    password: String,
    name: {
      first: String,
      last: String
    }
}, {
    autoIndex: true
})

const User = model('User', userSchema) as UserModelConstructor

export default User
