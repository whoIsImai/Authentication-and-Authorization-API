import {describe, it, expect} from 'vitest'
import supertest from 'supertest'
import {app} from '../server.js'
import 'dotenv/config'
import mongoose from 'mongoose'

mongoose.connect(process.env.Database_URL)

app.listen(3000, ()=> console.log("Server is running on port 3000"))

const conn = mongoose.connection
conn.on("error", (error)=> console.log(error))
conn.once("open", ()=> console.log("Connected to database"))


describe('all the activities the user can perform on different routes', () => {
    it('should register a user', async () => {
        const resp = await supertest(app)
            .post('/api/register')
            .send({
                fname: 'John',
                lname: 'Doe',
                email: 'email11',
                password: 'password'
            })
            console.log('Response Status:', resp.status);
            console.log('Response Body:', resp.body);
        expect(resp.status).toBe(200)
        expect(resp.body.message).toBe('Account created successfully')
    },30000)

    it('should get all the users', async()=> {
        const resp = await supertest(app).get('/api/users')
        console.log('Response Status:', resp.status)
        expect(resp.status).toBe(206)
    },30000)
})