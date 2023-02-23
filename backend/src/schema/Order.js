import {model, Schema} from 'mongoose'
const orderSchema = new Schema({
    id: String,
    state: String,
    employeeid: String
})

export default model('Order', orderSchema)