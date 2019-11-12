import { model, Schema, Document, SchemaDefinition, Model } from 'mongoose'
import chalk from "chalk"

interface KittyDocument extends Document {
    createTime: SchemaDefinition
    name: string
    meow(): void
}

interface KittyModelConstructor extends Model<KittyDocument>{

}

const kittyModel = new Schema({
    createTime: {
        type: Date,
        default: Date.now
    },
    name: String
})

kittyModel.methods.meow = function () {
    const greeting: string = this.name ? `Meow~ name id ${this.name}` : "I don't have a name"
    console.log(chalk.magenta(greeting))
} as KittyDocument['meow']

const Kitty = model('Kitty', kittyModel) as KittyModelConstructor

export default Kitty
