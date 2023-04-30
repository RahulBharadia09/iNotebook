// Learn about JWT TOKEN


var jwt = require("jsonwebtoken");

// this is a salt which is added by us so that no one can crack it
const JWT_Secret = "Welcometothe#$"


const fetchuser=(req,res,next)=>{
    // Get the user for jwt token and add id to req obj 
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error :"Please authenticate with valid token 'backend/middleware/fetchuser' "})
    }
    try {
        const data =jwt.verify(token , JWT_Secret);
        req.user = data.user
        next();
    } catch (error) {
        res.status(401).send({error : "Please authenticate with valid token 'backend/middleware/fetchuser' "})
    }
};

module.exports=fetchuser;