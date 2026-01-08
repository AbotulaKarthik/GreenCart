import jwt from 'jsonwebtoken'

const authUser = async (req,res,next)=>{
    const {token} = req.cookies;

    if(!token){  // not loggedin 
        return res.json({success:false,message:'Token not Available !'})
    }

    try {
        const tokenDecode = jwt.verify(token,process.env.JWT_SECRET)
        
        req.user = {id: tokenDecode.id}
        
        next();

    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}

export default authUser