
const { Router } = require("express");
const { Admin } = require('../db');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const z = require("zod");
const { JWT_ADMIN_PASSWORD } = require("../config");

const adminRouter = Router();


// adminRouter.use();


adminRouter.post("/signup", async (req, res)=>{
//zod validation 
    const requireBody = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(2)
    }) 

//safeparsed request body safeParse is a object which gives if sucsess:true return data else via is the output
    const result = requireBody.safeParse(req.body);

//check if the input is valid or not , below msg gets displayed if credentials are wrong
    if(!result.success){
        return res.json({
            msg: "invalide credentials!!"
        })
    }

    //extract vlaidate email,pass, name from req.body
    const { name, email, password } = result.data;

    //
    const hashPassword = await bcrypt.hash(password, 5);
 try{
     Admin.create({
        name,
        email,
        password: hashPassword
 
     })
 }catch(e){
    return res.status(400).json({
        msg: "you are already signup",
        error: e.message
    })
 }

 res.json({
    msg: "signup successful"
 })
})



adminRouter.post("/signin",async (req, res)=>{
    const requireBody = z.object({
        email: z.string().email(),
        password: z.string().min(2)
    })

    const result = requireBody.safeParse(req.body);

    if(!result.success){
        return res.json({
            msg:"invlalid credentials",
            error: e.msg
        })
    }

    const {email, password} = result.data;

    const admin = Admin.findOne({
        email: email
    })

    if(!admin){
        res.json({
            msg: "invalid credentials"
        })
    }

    const passMatch = bcrypt.compare(password, admin.password);

    if(passMatch){
        const token  = jwt.sign({
            id: admin._id,
        }, JWT_ADMIN_PASSWORD)

        res.json({
            token: token
        })
    }else{
        res.json({
            msg: "password does not match"
        })
    }
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