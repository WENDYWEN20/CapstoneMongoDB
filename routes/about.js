import express from 'express'
import {Router} from 'express'

const router=new Router

router.post('/', (req,res)=>{
       console.log(req.params)
       res.render('about.pug')

})
                        

    
export default router