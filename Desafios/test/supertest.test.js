const chai = require('chai')
const supertest = require('supertest')


const expect = chai.expect
const requester = supertest('http://localhost:8080')

describe("Router testing", () => {
    //let cookie
    describe("Testing de api/views/users", () => {
        // it("Endpoint POST: Register a user successfully", async() => {
        //     const userMock = {
        //         first_name: 'User new',
        //         last_name: 'from supertest',
        //         email: 'supertest@gmail.com',
        //         password: 'supertest',
        //         date_of_birth: '10/10/2000'
        //     }
            
        //     const { _body } = await requester.post("/api/views/users").send(userMock)
        //     //console.log(_body)
        //     expect(_body).to.be.ok
        //     expect(_body).to.have.property("status", "success")
        // })
        it("Endpoint POST: Login the user successfully", async() => {
            const userMock = {
                email: "supertest@gmail.com",
                password: "supertest"
            }
    
            const result = await requester.post("/api/views/session/login").send(userMock)
            console.log(result)
            const cookieResult = result.headers["set-cookie"][0]
            expect(cookieResult).to.be.ok
    
            cookie = {
                name: cookieResult.split("=")[0],
                value: cookieResult.split("=")[1]
            }
            expect(cookie.name).to.be.ok
            expect(cookie.name).to.be.equal("coderCookieToken")
        }) 
    })
})