import mongoose from 'mongoose'


const productsSchema= new mongoose.Schema({
    name:{  type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
    },
    description:{    type: String,
        required: true,
        minLength: 12,
        maxLength: 1200,
    },
    size:{
        type: String,
        Enum:['S', 'M', 'L','NA']
    },
    price:{
        type: Number,
        required: true,
        minLength: 1,
        maxLength: 10,
    },
    gender:{
        type: String,
    Enum:['man', 'woman', 'children']}
})

const productsModel=mongoose.model('products', productsSchema)

export default productsModel