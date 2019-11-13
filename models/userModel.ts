import { Schema, Model, model, Document } from 'mongoose'

interface UserDocument extends Document {
    name: string
    password: string
}

interface UserModelConstructor extends Model<UserDocument>{

}

const userSchema = new Schema({
    createTime: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        trim: true,
        unique: true,
        match: /^[0-9a-zA-Z]{1,2}|[\u4e00-\u9eff]{1,8}$/,
        index: true
    },
    password: String
}, {
    autoIndex: true
})

const User = model('User', userSchema) as UserModelConstructor

export default User
