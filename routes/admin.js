
const { Router } = require("express");
const { Admin } = require('../db')
const adminRouter = Router();


// adminRouter.use();


adminRouter.post("/signup", (req, res)=>{
    res.json({
        msg: 'hello'

    })
})



adminRouter.post("/signin", (req, res)=>{
    res.json({
        msg: 'hello'

    })
})

adminRouter.post('/couse',(req, res)=>{
  res.json({
        msg: 'hello'

  })

})
adminRouter.put('/course', (req,res)=>{
    res.json({
        msg: 'hello'

    })
}
)

adminRouter.get("/couse/bulk", (req,res)=>{
    res.json({
        msg: 'hello'

    })
})

module.exports = {
    adminRouter : adminRouter
}