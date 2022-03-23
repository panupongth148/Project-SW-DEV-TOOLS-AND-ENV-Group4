const chai = require("chai");
const firebase = require('./../db')
const chaiHttp = require("chai-http")
const server = require("../index")
const fs = require('fs')
const path = require('path');
chai.should()
chai.use(chaiHttp);
let idShouldUpdate;
describe('Task Api', async () => {


        await it('It should get maneboook', () => {
            chai.request(server).get("/store/managebook/1")
                .end((err, response) => {
                    response.should.have.status(200);
                    // response.body.should.be.a('array');
                    
                })
        })
    // add
        await it('It should add book', () => {
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
                // .attach('myImage', fs.readFileSync('./static/uploads/testimage.jpg'))
                .end((err, response) => {
                    response.should.have.status(200);
                    // response.body.should.be.a('array');
                    
                })
        })
    //update
       await it('It should be updatebook', async () => {
            const snapshot = await firebase
                .firestore()
                .collection("book")
                .where("store_id", "==", "999")
                .get();

                // console.log("id firebase : " + snapshot.length)
            await snapshot.forEach((res) => {
                // idcollection = res.id;
                // console.log(res.data())
                if(res.data().book_name == "test"){
                    idShouldUpdate = res.id
                }


            });
            // console.log("id firebase : " + idShouldUpdate)
            chai.request(server).put(`/store/editbook/${idShouldUpdate}`)
                .set('Content-Type', 'multipart/form-data')
                .field({
                    book_name: "test-update",
                    book_type: "book",
                    book_count: "1",
                    book_price: "200",
                    book_category: "แปล",
                    book_discount: 0,
                    book_description: "adsssssdsa",
                    store_id: 1
                })
                .attach('myImage', path.resolve('./static/uploads/', 'testimage.jpg'))
                // .attach('myImage', fs.readFileSync('./static/uploads/testimage.jpg'))
                .end((err, response) => {
                    response.should.have.status(200);
                    
                    // response.body.should.be.a('array');
                    
                })
        })

    //  delete book api test
        await it('It should deletebook', async () => {
            chai.request(server).delete(`/store/managebook/deletebook/${idShouldUpdate}`)
                .end((err, response) => {
                    response.should.have.status(200);
                    // response.body.should.be.a('array');
                    
                })
        })






})
