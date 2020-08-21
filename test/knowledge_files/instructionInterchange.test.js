//instruction/interchange.test.js
process.env.NODE_ENV = 'test';

const server = require("../../index");
let status = require('../../utilities/constants');

const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const should = chai.should();
chai.use(chaiHttp);

describe("Interchange instructions", () =>{


    it('it should GET a list of all interchange instructions or nocontent if DB is empty', done => {
        chai
            .request(server)
            .get("/instruction/interchange")
            .end((err, res) => {
                queryResponse = res;
                expect(res.status).to.be.within(status.success, status.nocontent);
                if(res.status != status.nocontent)
                    res.body.should.be.a('array');
                done();
            });
    });



    it('it should POST a interchange instruction and return its ID', (done) => {
        let element = {
            id_original:1,
            id_substitution:3,
            date:876543,
        }
        chai.request(server)
            .post('/instruction/interchange')
            .send(element)
            .end((err, res) => {
                queryResponse = res;
                res.should.have.status(status.success);
                res.body.should.be.a('object');
                done();
            });
    });

    it('it should GET a interchange instruction based on its ID', done => {
        chai
            .request(server)
            .get("/instruction/interchange")
            .end((error, response) => {
                chai.request(server)
                    .get("/instruction/interchange/" + response.body[response.body.length - 1].id)
                    .end((err, res) => {
                        queryResponse = res;
                        expect(res.status).to.be.within(status.success, status.nocontent);
                        res.body.should.be.a('array');
                        done();
                    });
            });
    });

    it('it should NOT GET an interchange instruction with an erroneous ID', done => {

        chai.request(server)
            .get("/instruction/interchange/" + 99999)
            .end((err, res) => {
                queryResponse = res;
                expect(res.status).to.be.equal(status.nocontent);
                done();
            });
    });

    it('it should UPDATE a interchange instruction based on its ID', done => {
        let element = {
            id_original:1,
            id_substitution:3,
            date:999999999,
        }
        chai
            .request(server)
            .get("/instruction/interchange")
            .end((error, response) => {
                chai.request(server)
                    .put("/instruction/interchange/" + response.body[response.body.length - 1].id)
                    .send(element)
                    .end((err, res) => {
                        queryResponse = res;
                        expect(res.status).to.be.within(status.success, status.nocontent);
                        res.body.should.be.a('String');
                        done();
                    });
            });
    });

    it(`it should DELETE an existing interchange instruction based on its ID`, (done) => {
        chai
            .request(server)
            .get("/instruction/interchange")
            .end((error, response) => {
                chai.request(server)
                    .delete('/instruction/interchange/' + response.body[response.body.length - 1].id)
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