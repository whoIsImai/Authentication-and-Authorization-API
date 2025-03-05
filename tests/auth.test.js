import {describe, it,expect} from 'vitest'
import supertest from 'supertest'
import {app} from '../server.js'

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