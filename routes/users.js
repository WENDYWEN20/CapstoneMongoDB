import User from "../models/users.js";

import {Router} from 'express'

const router=new Router

const data=[
        {username:'user1',
        emailaddress:'user1@gmail.com',
        },

        {username:'user2',
        emailaddress:'user2@gmail.com',
       },

        {username:'user3',
                emailaddress:'user3@gmail.com',
                },
        ]

      

router.get('/', async(req,res, next)=>{
 
    try {
        const Users = await User.find();
    
        if (Users) {
          res.json({ Users });
          console.log(Users)
        } else {
          res.json({ message: "No users found" });
        }
      } catch (error) {
        next(error);
      }
    }
);


router.get('/:id',async (req,res)=>{    
    try{
        const user=await User.findById(req.params.id)
        if (user) {
            res.json({user});
        }else{
            res.json({message:`No user found ${req.params.id}`})
        }        
    }catch(error){
        console.log(error)
    }

})

router.post("/", async (req, res, next) => {
    console.log(req.body);
    try {
      const newUser = await User.create(req.body);
      if (newUser) {
        res.status(201).json({ user: newUser });
      } else {
        res.status(400).json({ message: "Error creating new user" });
      }
    } catch (error) {
      next(error);
    }
  });


  router.delete('/:id', async (req,res)=>{
    try{
        const deleteUser= await User.findByIdAndDelete(req.params.id)
        if (!deleteUser){
            return res.send(`User not fund ${id}`)}
        else{res.send(
                {
                    deletedUser: deleteUser,
                    message: "User Deleted!"
                }
            )
        }}
           catch(error){console.log(error)}
})

router.put('/:id', async (req,res)=>{
    try{
        const updateUser=await User.findByIdAndUpdate(req.params.id, req.body, {new:true})
        res.send(updateUser)
        console.log(updateUser)
    }
    catch(error){console.log(error)}
})
                        
export default router