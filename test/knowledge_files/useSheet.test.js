//sheet/use.test.js
process.env.NODE_ENV = 'test';

const server = require("../../index");
let status = require('../../utilities/constants');

const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const should = chai.should();
chai.use(chaiHttp);

describe("Use Sheets", () =>{


    it('it should GET a list of all use sheets or nocontent if DB is empty', done => {
        chai
            .request(server)
            .get("/sheet/use")
            .end((err, res) => {
                queryResponse = res;
                expect(res.status).to.be.within(status.success, status.nocontent);
                if(res.status != status.nocontent)
                    res.body.should.be.a('array');
                done();
            });
    });



    it('it should POST a use sheet and return its ID', (done) => {
        let element = {
            date_start:876543,
            date_end:987654,
            motive:'support Op',
            distance:350,
            id_driver:1,
        }
        chai.request(server)
            .post('/sheet/use')
            .send(element)
            .end((err, res) => {
                queryResponse = res;
                res.should.have.status(status.success);
                res.body.should.be.a('object');
                done();
            });
    });

    it('it should GET a use sheet based on its ID', done => {
        chai
            .request(server)
            .get("/sheet/use")
            .end((error, response) => {
                chai.request(server)
                    .get("/sheet/use/" + response.body[response.body.length - 1].id)
                    .end((err, res) => {
                        queryResponse = res;
                        expect(res.status).to.be.within(status.success, status.nocontent);
                        res.body.should.be.a('array');
                        done();
                    });
            });
    });

    it('it should NOT GET a use sheet with an erroneous ID', done => {

        chai.request(server)
            .get("/sheet/use/" + 99999)
            .end((err, res) => {
                queryResponse = res;
                expect(res.status).to.be.equal(status.nocontent);
                done();
            });
    });

    it('it should UPDATE a use sheet based on its ID', done => {
        let element = {
            date_start:876543,
            date_end:987654,
            motive:'support Op',
            distance:99999,
            id_driver:1,
        }
        chai
            .request(server)
            .get("/sheet/use")
            .end((error, response) => {
                chai.request(server)
                    .put("/sheet/use/" + response.body[response.body.length - 1].id)
                    .send(element)
                    .end((err, res) => {
                        queryResponse = res;
                        expect(res.status).to.be.within(status.success, status.nocontent);
                        res.body.should.be.a('String');
                        done();
                    });
            });
    });

    it(`it should DELETE an existing use sheet based on its ID`, (done) => {
        chai
            .request(server)
            .get("/sheet/use")
            .end((error, response) => {
                chai.request(server)
                    .delete('/sheet/use/' + response.body[response.body.length - 1].id)
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