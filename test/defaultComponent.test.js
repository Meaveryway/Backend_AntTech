//default.test.js
process.env.NODE_ENV = 'test';

const server = require("../index");
let status = require('../utilities/constants');

const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const should = chai.should();
chai.use(chaiHttp);

describe("defaults", () =>{


    it('it should GET a list of all default components or nocontent if DB is empty', done => {
        chai
            .request(server)
            .get("/default")
            .end((err, res) => {
                queryResponse = res;
                expect(res.status).to.be.within(status.success, status.nocontent);
                if(res.status != status.nocontent)
                    res.body.should.be.a('array');
                done();
            });
    });



    it('it should POST a default component and return its ID', (done) => {
        let element = {
            id_vehicle:5,
            id_component:11,
        }
        chai.request(server)
            .post('/default')
            .send(element)
            .end((err, res) => {
                queryResponse = res;
                res.should.have.status(status.success);
                res.body.should.be.a('object');
                done();
            });
    });

    it('it should GET a default component based on a vehicle ID', done => {
        chai
            .request(server)
            .get("/default")
            .end((error, response) => {
                chai.request(server)
                    .get("/default/" + response.body[response.body.length - 1].id_vehicle)
                    .end((err, res) => {
                        queryResponse = res;
                        expect(res.status).to.be.within(status.success, status.nocontent);
                        res.body.should.be.a('array');
                        done();
                    });
            });
    });

    it('it should NOT GET a default component with an erroneous ID', done => {

        chai.request(server)
            .get("/default/" + 99999)
            .end((err, res) => {
                queryResponse = res;
                expect(res.status).to.be.equal(status.nocontent);
                done();
            });
    });

    it(`it should DELETE an existing default component based on its ID`, (done) => {
        chai
            .request(server)
            .get("/default")
            .end((error, response) => {
                chai.request(server)
                    .delete('/default/' + response.body[response.body.length - 1].id)
                    .end((err, res) => {
                        queryResponse = res;
                        res.should.have.status(status.success);
                        done();
                    });
            });
    });

    it(`it should DELETE an existing default component based on a vehicle ID`, (done) => {
        let element = {
            id_vehicle: 5,
            id_component: 11,
        }
        chai.request(server)
            .post('/default')
            .send(element)
            .end((err, res) => {
                chai
                    .request(server)
                    .get("/default")
                    .end((error, response) => {
                        chai.request(server)
                            .delete('/default/vehicle/' + response.body[response.body.length - 1].id_vehicle)
                            .end((err, res) => {
                                queryResponse = res;
                                res.should.have.status(status.success);
                                done();
                            });
                    });
            });
    });

    it(`it should DELETE an existing default component based on a component ID`, (done) => {
        let element = {
            id_vehicle: 5,
            id_component: 11,
        }
        chai.request(server)
            .post('/default')
            .send(element)
            .end((err, res) => {
                chai
                    .request(server)
                    .get("/default")
                    .end((error, response) => {
                        chai.request(server)
                            .delete('/default/component/' + response.body[response.body.length - 1].id_component)
                            .end((err, res) => {
                                queryResponse = res;
                                res.should.have.status(status.success);
                                done();
                            });
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