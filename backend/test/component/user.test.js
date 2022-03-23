const chai = require("chai");
// const firebase = require('./../db')
const chaiHttp = require("chai-http")
const server = "https://e4b7fb9b-7425-4cfe-ad4d-74b62a838d07.mock.pstmn.io"
const fs = require('fs')
const path = require('path');
chai.should()
chai.use(chaiHttp);
let idShouldUpdate;
var expect = chai.expect;
describe('Component user test', async () => {


    it('It should be return status 201 Created', () => {
        chai.request(server).get("/account/register")
        .set('Content-Type', 'multipart/form-data')
        .field({
            username: "owenlnwza",
            password: "123456aA",
            first_name: "taweesak",
            last_name: "junampon",
            email: "owen_lnwza@hotmail.com",
            phone_number: "0123456789",
            type: "customer",
            image: "D0pk-VRVsAMJzsq.jpg",
            token: "null",
            address: "null",
        })
            .end((err, response) => {
                // console.log(JSON.parse(response.text))
                expect(response).to.have.status(201);
                // JSON.parse(response.text).should.be.a('array');
                // expect(response.body.length).to.have.equal(1);
                // response.should.have.status(200);
                // expect(response.data).to.have.length.of.at.least(1);

            })
    })

    it('It should be return 200 OK', () => {
        chai.request(server).get("/account/login")
        .set('Content-Type', 'multipart/form-data')
        .field({
            username: "owenlnwza",
            password: "123456aA",
        })
            .end((err, response) => {
                // console.log(response.json())
                expect(response).to.have.status(200);
                // expect(response.body.length).to.have.equal(1);
                // response.should.have.status(200);
                // expect(response.data).to.have.length.of.at.least(1);

            })
    })



})
