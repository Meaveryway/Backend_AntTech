//rex/mechanic.test.js
process.env.NODE_ENV = 'test';

const server = require("../../index");
let status = require('../../utilities/constants');

const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const should = chai.should();
chai.use(chaiHttp);

describe("Mechanic REXs", () =>{


    it('it should GET a list of all mechanic REXs or nocontent if DB is empty', done => {
        chai
            .request(server)
            .get("/rex/mechanic")
            .end((err, res) => {
                queryResponse = res;
                expect(res.status).to.be.within(status.success, status.nocontent);
                if(res.status != status.nocontent)
                    res.body.should.be.a('array');
                done();
            });
    });



    it('it should POST a mechanic REX and return its ID', (done) => {
        let element = {
            date:2345678,
            description:"idle blabla",
            type:2,
            status:"Pending",
            id_sheet:2,
        }
        chai.request(server)
            .post('/rex/mechanic')
            .send(element)
            .end((err, res) => {
                queryResponse = res;
                res.should.have.status(status.success);
                res.body.should.be.a('object');
                done();
            });
    });

    it('it should GET a mechanic REX based on its ID', done => {
        chai
            .request(server)
            .get("/rex/mechanic")
            .end((error, response) => {
                chai.request(server)
                    .get("/rex/mechanic/" + response.body[response.body.length - 1].id)
                    .end((err, res) => {
                        queryResponse = res;
                        expect(res.status).to.be.within(status.success, status.nocontent);
                        res.body.should.be.a('array');
                        done();
                    });
            });
    });

    it('it should NOT GET a mechanic REX with an erroneous ID', done => {

        chai.request(server)
            .get("/rex/mechanic/" + 99999)
            .end((err, res) => {
                queryResponse = res;
                expect(res.status).to.be.equal(status.nocontent);
                done();
            });
    });

    it('it should UPDATE a mechanic REX based on its ID', done => {
        let element = {
            date:2345678,
            description:"PC Masterace",
            type:2,
            status:"Pending",
            id_sheet:2,
        }
        chai
            .request(server)
            .get("/rex/mechanic")
            .end((error, response) => {
                chai.request(server)
                    .put("/rex/mechanic/" + response.body[response.body.length - 1].id)
                    .send(element)
                    .end((err, res) => {
                        queryResponse = res;
                        expect(res.status).to.be.within(status.success, status.nocontent);
                        res.body.should.be.a('String');
                        done();
                    });
            });
    });

    it('it should PATCH a mechanic REX\'s status based on its ID', done => {
        chai
            .request(server)
            .get("/rex/mechanic")
            .end((error, response) => {
                chai.request(server)
                    .put("/rex/mechanic/" + response.body[response.body.length - 1].id + "/state/" + "XXXXXX")
                    .end((err, res) => {
                        queryResponse = res;
                        expect(res.status).to.be.within(status.success, status.nocontent);
                        res.body.should.be.a('String');
                        done();
                    });
            });
    });

    it(`it should DELETE an existing mechanic REX based on its ID`, (done) => {
        chai
            .request(server)
            .get("/rex/mechanic")
            .end((error, response) => {
                chai.request(server)
                    .delete('/rex/mechanic/' + response.body[response.body.length - 1].id)
                    .end((err, res) => {
                        queryResponse = res;
                        res.should.have.status(status.success);
                        done();
                    });
            });
    });
    var queryResponse;
    afterEach(function() {
        if (this.currentTest.state == 'failed') {
            console.log('\x1b[33m%s\x1b[0m', queryResponse.text);
        }
    });

});