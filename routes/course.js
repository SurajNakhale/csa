
const { Router } = require("express");

const courseRouter = Router();

courseRouter.get("/preview",(req,res)=>{
    res.json({
        msg: 'hello'

    })
})//list all the courses


courseRouter.post("/purchase",(req,res)=>{
    res.json({
        msg: 'hello'

    })
})//if user want to pusrchase

module.exports = {
    courseRouter : courseRouter
}