import { Router } from "express";
import Cart from "../models/carts.js";

// In-memory cart storage for simplicity (use database for production)
let cart = [];
const router=new Router()
router.get('/', async(req,res, next)=>{
 
    try {
        const carts = await Cart.find();
    
        if (carts) {
          res.json({ carts });
          console.log(cart)
        } else {
          res.json({ message: "No products in cart" });
        }
      } catch (error) {
        next(error);
      }
    }
);


router.get('/:id',async (req,res)=>{    
    try{
        const cart=await Cart.findById(req.params.id)
        if (cart) {
            res.json({cart});
        }else{
            res.json({message:`No product in cart ${req.params.id}`})
        }
        
    }catch(error){
        console.log(error)
    }

})

router.post("/", async (req, res, next) => {
    console.log(req.body);
    try {
      const addCart = await Cart.create(req.body);
      if (addCart) {
        res.status(201).json({ cart: addCart });
      } else {
        res.status(400).json({ message: "Error adding new cart" });
      }
    } catch (error) {
      next(error);
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