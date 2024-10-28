import { Router } from "express";
import Cart from "../models/carts.js";
// In-memory cart storage for simplicity (use database for production)


const router=new Router()
router.get('/', async(req,res, next)=>{
 
    try {
        const carts = await Cart.find();
    
        if (carts) {
          res.json({ carts });
          console.log(carts)
        } else {
          res.json({ message: "No products in cart" });
        }
      } catch (error) {
        next(error);
      }
    }
);


router.post("/", async (req, res, next) => {
    console.log(req.body);
    const newCart = await Cart.create(req.body);
    if (newCart) {
      res.status(201).json({ carts: newCart });
    } else {
      res.status(400).json({ message: "Error adding new product" });
    }
 
  });


  router.delete('/:id', async (req,res)=>{
    try{
        const deleteProduct= await Cart.findByIdAndDelete(req.params.id)
        if (!deleteCart){
            return res.send(`User not fund ${id}`)}
        else{res.send(
                {
                    deletedCart: deleteProduct,
                    message: "Product Deleted!"
                }
            )
        }}
           catch(error){console.log(error)}
})

router.put('/:id', async (req,res)=>{
    try{
        const updateCart=await Cart.findByIdAndUpdate(req.params.id, req.body, {new:true})
        res.send(updateCart)
        console.log(updateCart)
    }
    catch(error){console.log(error)}
})

export default router