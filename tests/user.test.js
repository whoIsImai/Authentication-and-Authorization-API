import {describe, it, expect} from 'vitest'
import supertest from 'supertest'
import {server} from '../server.js'
import People from '../models/People.js'
import 'dotenv/config'
const mongoose = require('mongoose')
mongoose.connect(process.env.Database_URL)

connectDB(process.env.TEST_DB_URI)


describe('all the activities the user can perform on different routes', () => {
    it('should register a user', async () => {
        const resp = await supertest(server)
            .post('/api/register')
            .send({
                Name: 'John Doe',
                Email: 'email2',
                Password: 'password',
                Number: '1234567890'
            })
            console.log('Response Status:', resp.status);
            console.log('Response Body:', resp.body);
        expect(resp.status).toBe(201)
        expect(resp.body.message).toBe('User registered successfully')
    },10000)

    it('should get all the users', async()=> {
        const resp = await supertest(server).get('/api/getUsers')
        console.log('Response Status:', resp.status)
        expect(resp.status).toBe(206)
    },10000)
})