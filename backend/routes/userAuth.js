const jwt = require("jsonwebtoken");
const authenticate = (req,res,next)=>{
    const authHeader = req.headers["authorization"];
    const token = authHeader&&authHeader.split("") [1];
    if(!token){
        return res.status(401).json({message:"Authentication token is required"})
    }
    jwt.verify(token,"pharmacy123",(err,user)=>{

        if(err){
       return res.status(403).json({message:"Token is expired please sign in"})
    }
    req.user=user;
    next();
 });
}
module.exports =authenticate;