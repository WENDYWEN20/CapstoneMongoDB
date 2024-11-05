import express from "express";
import ProductsRouter from "./routes/products.js";
import UsersRouter from "./routes/users.js";
import CartRouter from "./routes/carts.js";
import StripeRouter from "./routes/checkout.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import { Stripe } from "stripe";
import Cart from "./models/carts.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
//   =======connect to DataBase ===========
try {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log(`Connected to MONGODB`);
} catch (error) {
  console.error(error);
}

// In-memory cart storage for simplicity (use database for production)
app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json());
app.use(morgan("dev")); //logger
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send(`welcome to my API`);
});

// app.get('/about',  (req, res) =>{
//           res.render('about.pug')})
// app.get('/return',  (req, res) =>{
//             res.render('return.pug')})

app.use("/users", UsersRouter);
app.use("/carts", CartRouter);
app.use("/products", ProductsRouter);

app.post("/create-checkout-session", async (req, res,next) => {


   //  res.json({url:"apple"})
  //  console.log(req.body)
  // const storeItems = new Map([
  //   [1, { priceInCents: 10000, name: "Learn React Today" }],
  //   [2, { priceInCents: 20000, name: "CSS HTML" }],
  // ]);
  const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);
  // console.log(process.env.STRIPE_PRIVATE_KEY);
  // try{ const cartsItem = await Cart.find();
  //   if (cartsItem){
  //     console.log(cartsItem);
  //   } else {
  //     res.json({message:" No item in cart"});
  //   } 
  // }catch (error){next(error)}
  try {
    const cartsItem = await Cart.find();
    console.log(req.body)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      // line_items: req.body.items?.map(item=>{const storeItem=storeItems.get(item.id)
      //   return{
      //     price_data:{
      //       product_data:{
      //         name:storeItem.name
      //       }, 
      //       unit_amount: storeItem.priceIncents
      //     }, 
      //     quantity:item.quantity
      //   }
      // }),

      line_items: [
      // cartsItem?.map(item => {
      //   const cartItem = cartsItem.get(item);
      //   console.log(req.body.items)
      // return
        {
          price_data: {
            currency: "usd",
            product_data: {name: cartsItem[1].name},
            unit_amount: cartsItem[1].price*100,
          },
          quantity: 1,
        },
      ],
        // }),
    
      success_url: 'http://localhost:3000/success.html',
      cancel_url: 'http://localhost:3000/cancel.html',
    //   success_url: "${process.env.SERVER_URL}/success.html",
    //   cancel_url: "${process.env.SERVER_URL}/cancel.html ",
    
    })
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//=========Error Middleware======
app.use((e, req, res, next) => {
  console.error(e);
  res.status(500).json({ message: e.message, error: e });
});

app.listen(PORT, () => console.log(`Server at ${PORT}`));
