import express from 'express'
import ProductsRouter from './routes/products.js'
import UsersRouter from './routes/users.js'
import CheckoutRouter from './routes/carts.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import AboutRouter from './routes/about.js'
dotenv.config() 
const app=express()
const PORT=process.env.PORT||3000;
//   =======connect to DataBase ===========
try{await mongoose.connect(process.env.MONGODB_URI)
    console.log(`Connected to MONGODB`)
}catch(error){
    console.error(error)
}


// In-memory cart storage for simplicity (use database for production)
app.set('view engine', 'pug')
app.set('views', './views') 

app.use(express.json())
app.use(morgan('dev')) //logger
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))
app.get('/', (req,res)=>{
    res.send(`welcome to my API`)})

// app.get('/about',  (req, res) =>{
//           res.render('about.pug')})
// app.get('/return',  (req, res) =>{
//             res.render('return.pug')})  

app.use("/users", UsersRouter);
app.use("/carts", CheckoutRouter);
app.use("/products", ProductsRouter);


//=========Error Middleware======
app.use((e, req,res,next)=>{
    console.error(e);
    res.status(500).json({message:e.message, error:e})
})


app.listen(PORT,()=>console.log(`Server at ${PORT}`))