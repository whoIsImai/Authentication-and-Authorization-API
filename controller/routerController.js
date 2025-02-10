const jwt = require('jsonwebtoken')
const People = require('../models/People')
const bcrypt = require('bcrypt')
require('dotenv').config()

const getUsers = async(req,res)=>{
    const Users = await People.find()
    res.send(Users)
}
async function getSingleUser(req,res){
  res.json(req.user)
 
}

const authenticateToken = (req,res,next)=>{
    const cookies = req.cookies
    if (cookies && cookies.accessToken)
    {
        try {
            const userAcessToken = jwt.verify(cookies.accessToken, process.env.accessTokenSecret)
            req.user = userAcessToken
        } catch (error) 
        {
            res.clearCookie('accessToken')
             
             const authHeader = req.header.authorization

            const refreshToken = authHeader.split(' ')[1]
                    if(refreshToken)
                    {
                        try {
                            const userRefreshToken = jwt.verify(refreshToken, process.env.refreshTokenSecret)
                            const newAccessToken = jwt.sign({userId: userRefreshToken.userId}, process.env.accessTokenSecret)
                    
                            res.cookie("accessToken",newAccessToken,{
                            httpOnly: true,
                            secure: true,
                            maxAge: maxAge,
                            sameSite: 'Strict'
                            })
                    
                            req.user = {userId: userRefreshToken.userId}
                            next()
                        } catch (error) {
                            res.clearCookie('accessToken')
                            res.json({error: error.message})
                            res.redirect("/login")
                        }
                    } else
                        {
                              //if no refresh tokens found
                              res.clearCookie('accessToken')
                              res.redirect('/login')  
                         }
  
        }
    }
    else{
        res.redirect('/login')
    }
}

const register = async(req,res)=> {
  
    const {fname,lname,email,password} = req.body

    let newUser = new People({
        Firstname: fname, Lastname: lname, Email: email, Password: await bcrypt.hash(password, 10)})
    try {
        
        await newUser.save()
        res.json(newUser)
        
    } catch (error) {
        res.json({error: error.message})
    }
}


module.exports = {getSingleUser, authenticateToken, register, getUsers}