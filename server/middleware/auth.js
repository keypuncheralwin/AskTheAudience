const jwt = require('jsonwebtoken')
require('dotenv').config({path: './.env'})



const secret = process.env.SECRETKEY

module.exports = (req, res, next) => {
    
    const token = req.cookies.token;
    
    if (!token) {
        return res.sendStatus(403);
      }
    try{
        const decoded = jwt.verify(token, secret)
        req.userData = decoded;
        next();

    } catch(error){
        if(error.name === 'TokenExpiredError'){
            
            return res.clearCookie('token').sendStatus(440);
        }else{ return res.sendStatus(401) }
                
    }
    

}
