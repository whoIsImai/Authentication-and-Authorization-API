const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const People = require('./models/People')
require('dotenv').config()

const login = async(req,res)=>{
    const {email, password} = req.body
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
    req.headers.authorization = authorizationHeader

    console.log(`Cookies: ${req.cookies.accessToken}`)
    console.log(`Header Auth: ${req.headers.authorization}`)

    return res.json({accessToken: accessToken ,refreshToken: refreshToken})
}

module.exports = {login}