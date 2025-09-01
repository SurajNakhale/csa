
const { Router } = require("express");

const courseRouter = Router();



courseRouter.post("/purchase",(req,res)=>{
    res.json({
        msg: 'hello'
        
    })
})//if user want to pusrchase



courseRouter.get("/preview",(req,res)=>{
    res.json({
        msg: 'hello'

    })
})//list all the courses
module.exports = {
    courseRouter : courseRouter
}