//rex/driver.test.js
process.env.NODE_ENV = 'test';

const server = require("../../index");
let status = require('../../utilities/constants');

const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const should = chai.should();
chai.use(chaiHttp);

describe("Driver REXs", () =>{


    it('it should GET a list of all driver REXs or nocontent if DB is empty', done => {
        chai
            .request(server)
            .get("/rex/driver")
            .end((err, res) => {
                queryResponse = res;
                expect(res.status).to.be.within(status.success, status.nocontent);
                if(res.status != status.nocontent)
                    res.body.should.be.a('array');
                done();
            });
    });



    it('it should POST a driver REX and return its ID', (done) => {
        let element = {
            description:"idle blabla",
            date:123456789,
            level:2,
            id_sheet:1,
        }
        chai.request(server)
            .post('/rex/driver')
            .send(element)
            .end((err, res) => {
                queryResponse = res;
                res.should.have.status(status.success);
                res.body.should.be.a('object');
                done();
            });
    });

    it('it should GET a driver REX based on its ID', done => {
        chai
            .request(server)
            .get("/rex/driver")
            .end((error, response) => {
                chai.request(server)
                    .get("/rex/driver/" + response.body[response.body.length - 1].id)
                    .end((err, res) => {
                        queryResponse = res;
                        expect(res.status).to.be.within(status.success, status.nocontent);
                        res.body.should.be.a('array');
                        done();
                    });
            });
    });

    it('it should NOT GET a driver REX with an erroneous ID', done => {

        chai.request(server)
            .get("/rex/driver/" + 99999)
            .end((err, res) => {
                queryResponse = res;
                expect(res.status).to.be.equal(status.nocontent);
                done();
            });
    });

    it('it should UPDATE a driver REX based on its ID', done => {
        let element = {
            description:"PCerd'aigle",
            date:123456789,
            level:2,
            id_sheet:1,
        }
        chai
            .request(server)
            .get("/rex/driver")
            .end((error, response) => {
                chai.request(server)
                    .put("/rex/driver/" + response.body[response.body.length - 1].id)
                    .send(element)
                    .end((err, res) => {
                        queryResponse = res;
                        expect(res.status).to.be.within(status.success, status.nocontent);
                        res.body.should.be.a('String');
                        done();
                    });
            });
    });

    it('it should PATCH a driver REX\'s status based on its ID', done => {
        chai
            .request(server)
            .get("/rex/driver")
            .end((error, response) => {
                chai.request(server)
                    .put("/rex/driver/" + response.body[response.body.length - 1].id + "/state/" + "XXXXXX")
                    .end((err, res) => {
                        queryResponse = res;
                        expect(res.status).to.be.within(status.success, status.nocontent);
                        res.body.should.be.a('String');
                        done();
                    });
            });
    });

    it(`it should DELETE an existing driver REX based on its ID`, (done) => {
        chai
            .request(server)
            .get("/rex/driver")
            .end((error, response) => {
                chai.request(server)
                    .delete('/rex/driver/' + response.body[response.body.length - 1].id)
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