//instruction/indicator.test.js
process.env.NODE_ENV = 'test';

const server = require("../../index");
let status = require('../../utilities/constants');

const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const should = chai.should();
chai.use(chaiHttp);

describe("Indicator instructions", () =>{


    it('it should GET a list of all indicator instructions or nocontent if DB is empty', done => {
        chai
            .request(server)
            .get("/instruction/indicator")
            .end((err, res) => {
                queryResponse = res;
                expect(res.status).to.be.within(status.success, status.nocontent);
                if(res.status != status.nocontent)
                    res.body.should.be.a('array');
                done();
            });
    });



    it('it should POST a indicator instruction and return its ID', (done) => {
        let element = {
            id_component:3,
            threshold:3500,
            date:1234567,
        }
        chai.request(server)
            .post('/instruction/indicator')
            .send(element)
            .end((err, res) => {
                queryResponse = res;
                res.should.have.status(status.success);
                res.body.should.be.a('object');
                done();
            });
    });

    it('it should GET a indicator instruction based on its ID', done => {
        chai
            .request(server)
            .get("/instruction/indicator")
            .end((error, response) => {
                chai.request(server)
                    .get("/instruction/indicator/" + response.body[response.body.length - 1].id)
                    .end((err, res) => {
                        queryResponse = res;
                        expect(res.status).to.be.within(status.success, status.nocontent);
                        res.body.should.be.a('array');
                        done();
                    });
            });
    });

    it('it should NOT GET an indicator instruction  with an erroneous ID', done => {

        chai.request(server)
            .get("/instruction/indicator/" + 99999)
            .end((err, res) => {
                queryResponse = res;
                expect(res.status).to.be.equal(status.nocontent);
                done();
            });
    });

    it('it should UPDATE a indicator instruction based on its ID', done => {
        let element = {
            id_component:3,
            threshold:99999,
            date:1234567,
        }
        chai
            .request(server)
            .get("/instruction/indicator")
            .end((error, response) => {
                chai.request(server)
                    .put("/instruction/indicator/" + response.body[response.body.length - 1].id)
                    .send(element)
                    .end((err, res) => {
                        queryResponse = res;
                        expect(res.status).to.be.within(status.success, status.nocontent);
                        res.body.should.be.a('String');
                        done();
                    });
            });
    });

    it(`it should DELETE an existing indicator instruction based on its ID`, (done) => {
        chai
            .request(server)
            .get("/instruction/indicator")
            .end((error, response) => {
                chai.request(server)
                    .delete('/instruction/indicator/' + response.body[response.body.length - 1].id)
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