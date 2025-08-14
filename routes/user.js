const { Router } = require("express");


const userRouter = Router();

userRouter.post("/signup",(req,res)=>{
    res.json({
                msg: 'hello'

    })
})//signup end point



userRouter.post("/signin",(req,res)=>{
    res.json({
        msg: 'hello'

    })
})//signin end point



userRouter.get("/purchases",(req,res)=>{
    res.json({
        msg: 'hello'

    })
})//give purchases made my user


module.exports ={
    userRouter : userRouter
}