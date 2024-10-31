import { Router } from "express";
import {Stripe} from "stripe"


const router=new Router()
router.post('/create-checkout-session', async(req,res)=>{
    const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);
    console.log(process.env.STRIPE_PRIVATE_KEY)
    try{const session =await stripe.checkout.sessions.create({
        payment_method_types:['card'],
        mode: 'payment',
        line_items:[{price: 50,
            // '{{PRICE_ID}}',
            quantity: 1,}],
        // success_url: 'http://localhost:3000/success.html',
        // cancel_url: 'http://localhost:3000/cancel.html '
        success_url: '${process.env.SERVER_URL}/success.html',
        cancel_url: '${process.env.SERVER_URL}/cancel.html ',
        
    })

    }catch(e){res.status(500).json({error:e.message})}
    res.json({url: session.url})
    console.log(session)
})
export default router