import {describe, it,expect} from 'vitest'
import supertest from 'supertest'
import {app} from '../server.js'

import 'dotenv/config'
import mongoose from 'mongoose'

mongoose.connect(process.env.DB_URL)

//app.listen(3000, ()=> console.log("Server is running on port 3000"))

const conn = mongoose.connection
conn.on("error", (error)=> console.log(error))
conn.once("open", ()=> console.log("Connected to database"))

describe('used for anything that has to do with authentication and authorizaton', ()=>{
    it('for user login', async()=> {
        const resp = await supertest(app).post('/api/login').send({
            email: "email2",
            password: "password"
        })
        console.log(resp.status)
        console.log(resp.body.message)
        expect(resp.status).toBe(200)

    },30000)
})