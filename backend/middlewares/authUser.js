import jwt from 'jsonwebtoken'
import 'dotenv/config'

//  user authentication middleware
const authUser = async(req, res, next)=>{
    try {
        const authHeader = req.headers.authorization
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.json({success:false, message:"Authorization failed"})
        }
        const token = authHeader.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.id
        next()
    } catch (error) {
        return res.json({
      success: false,
      message: "Authentication failed"
    })
    }
}
export default authUser