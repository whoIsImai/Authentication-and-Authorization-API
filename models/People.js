import { Schema, model } from 'mongoose'

const userSchema = new Schema({
    Firstname: {
        require: true,
        type: String
    },
    Lastname:  {
        require: true,
        type: String
    },
    Email: {
        require: true,
        type: String,
        unique: true
    },
    Password: String
})
const People = model('People', userSchema)
export default People