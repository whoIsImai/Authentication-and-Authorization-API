import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import People from '../models/People.js'
import 'dotenv/config'

export const login = async(req,res)=>{
    const {email, password} = req.body
    try {
        let user = await People.findOne({Email: email})
    if(!user){
       return res.json({message: "No user found with that email"})
    }
    const isPasswordValid = bcrypt.compare(password, user.Password)

    if(!isPasswordValid){
        return res.json({message: "password is invalid"})
    }
    const refreshToken = jwt.sign({userId: user._id}, process.env.refreshTokenSecret)
    const accessToken = jwt.sign({userId: user._id}, process.env.accessTokenSecret)
    console.log(`accessToken : ${accessToken}`)
  
    res.cookie("accessToken",accessToken,{
        httpOnly: true,
        secure: true,
        maxAge: 15 * 60 * 1000,  //15 minutes
        sameSite: 'Strict'
    })

    const authorizationHeader = `Bearer ${refreshToken}`
    //req.headers.authorization = authorizationHeader
   res.setHeader("Authorization", authorizationHeader)

    console.log(`Cookies: ${req.cookies}`)
    console.log(`Header Auth: ${req.headers.authorization}`)

    return res.status(200).json({accessToken: accessToken ,refreshToken: refreshToken})    
    } catch (error) {
        res.json({message: error.message})
    }
    
}
