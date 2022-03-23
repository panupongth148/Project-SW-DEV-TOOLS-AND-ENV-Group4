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
describe('Compont book test', async () => {


        it('It should an array and status 201', () => {
            chai.request(server).post("/addBook/999")
            .set('Content-Type', 'multipart/form-data')
            .field({
                book_name: "test",
                book_type: "book",
                book_count: "1",
                book_price: "200",
                book_category: "แปล",
                book_discount: 0,
                book_description: "adsssssdsa",
                store_id: 1
            })
            .attach('myImage', path.resolve('./static/uploads/', 'testimage.jpg'))
                .end((err, response) => {
                    // console.log(JSON.parse(response.text))
                    expect(response).to.have.status(201);
                    // JSON.parse(response.text).should.be.a('array');
                    // expect(response.body.length).to.have.equal(1);
                    // response.should.have.status(200);
                    // expect(response.data).to.have.length.of.at.least(1);
                    
                })
        })

        // it('It should status 404', () => {
        //     chai.request(server).get("/store/managebook/")
        //         .end((err, response) => {
        //             // console.log(response.json())
        //             expect(response).to.have.status(404);
        //             // expect(response.body.length).to.have.equal(1);
        //             // response.should.have.status(200);
        //             // expect(response.data).to.have.length.of.at.least(1);
                    
        //         })
        // })
 


})
