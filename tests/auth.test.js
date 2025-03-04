import {describe, it, expect} from 'vitest'
import supertest from 'supertest'
import {connectDB} from '../config/db.js'
import {server} from '../index.js'
import 'dotenv/config'

connectDB(process.env.TEST_DB_URI)

describe('Deals with all the authentication and route controls',()=>{
    it('when a user logs in it should generate an access and refresh token', async()=> {
        const resp = await supertest(server).post('/api/login').send({
            Email: 'email1',
            Password: 'password'
        })
        expect(resp.status).toBe(200)
        expect(resp.body.message).toBe('successfully logged in')
    }, 10000)

    it('when a user logs out it should clear the access token', async()=> {
        const resp = await supertest(server).post('/api/logout')
        expect(resp.status).toBe(200)
        expect(resp.body.message).toBe('Logout successful')
    }, 10000)
})