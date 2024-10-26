import { Router } from "express";
import Product from "../models/products.js";


const router=new Router()
router.get('/', async(req,res, next)=>{
 
    try {
        const products = await Product.find();
    
        if (products) {
          res.json({ products });
          console.log(Product)
        } else {
          res.json({ message: "No products found" });
        }
      } catch (error) {
        next(error);
      }
    }
);


router.get('/:id',async (req,res)=>{    
    try{
        const product=await Product.findById(req.params.id)
        if (product) {
            res.json({product});
        }else{
            res.json({message:`No product found ${req.params.id}`})
        }
        
    }catch(error){
        console.log(error)
    }

})

router.post("/", async (req, res, next) => {
    console.log(req.body);
    try {
      const newProduct = await Product.create(req.body);
      if (newProduct) {
        res.status(201).json({ product: newProduct });
      } else {
        res.status(400).json({ message: "Error creating new product" });
      }
    } catch (error) {
      next(error);
    }
  });


  router.delete('/:id', async (req,res)=>{
    try{
        const deleteProduct= await Product.findByIdAndDelete(req.params.id)
        if (!deleteProduct){
            return res.send(`User not fund ${id}`)}
        else{res.send(
                {
                    deletedUser: deleteProduct,
                    message: "Product Deleted!"
                }
            )
        }}
           catch(error){console.log(error)}
})

router.put('/:id', async (req,res)=>{
    try{
        const updateProduct=await Product.findByIdAndUpdate(req.params.id, req.body, {new:true})
        res.send(updateProduct)
        console.log(updateProduct)
    }
    catch(error){console.log(error)}
})

export default router