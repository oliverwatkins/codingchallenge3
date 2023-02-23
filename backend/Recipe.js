

// const {model, Schema} = require('mongoose')

import {model, Schema} from 'mongoose'
const recipeSchema = new Schema({
    name: String,
    description: String,
    createdAt:String,
    thumbsUp: Number,
    thumbsDown: Number
})

export default model('Recipe', recipeSchema)