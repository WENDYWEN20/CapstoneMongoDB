import mongoose from 'mongoose'

const usersSchema= new mongoose.Schema({
    username:{  type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
    },
    email:{    type: String,
        required: true,
        minLength: 8,
        maxLength: 1200,
    },
   
   address:{
    type: String,       
    },
    orderHistory:[]
})

const usersModel=mongoose.model('users', usersSchema)

export default usersModel