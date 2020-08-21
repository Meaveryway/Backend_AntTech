//atLaunch.test.js
process.env.NODE_ENV = 'test';

const server = require("../index");
var database = require('../utilities/databaseAccess');
let status = require('../utilities/constants');

const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const should = chai.should();
chai.use(chaiHttp);

const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://centraluser:chalal@localhost:5432/techant';

var index;

describe("Vehicles", () => {
    it('it should GET a list of all vehicles or nocontent if DB is empty', done => {
        chai
            .request(server)
            .get("/vehicle")
            .end((err, res) => {
                queryResponse = res;
                expect(res.status).to.be.within(status.success, status.nocontent);
                res.body.should.be.a('array');
                done();
            });
    });

    it('it should POST a vehicle and return its ID', (done) => {
        let vehicle = {
            reg_number: 999998,
            id_catalogue: 10,
            odometer: 3500,
            state: 'Available',
            date_release: 123456,
            id_unit: 1,
        }
        chai.request(server)
            .post('/vehicle')
            .send(vehicle)
            .end((err, res) => {
                queryResponse = res;
                res.should.have.status(status.success);
                res.body.should.be.a('object');
                done();
            });
    });

    it('it should GET a vehicle based on its ID', done => {
        chai
            .request(server)
            .get("/vehicle")
            .end((error, response) => {
                chai.request(server)
                    .get("/vehicle/" + response.body[response.body.length - 1].id)
                    .end((err, res) => {
                        queryResponse = res;
                        expect(res.status).to.be.within(status.success, status.nocontent);
                        res.body.should.be.a('array');
                        done();
                    });
            });
    });

    it('it should NOT GET a vehicle with an erroneous ID', done => {

        chai.request(server)
            .get("/vehicle/" + 99999)
            .end((err, res) => {
                queryResponse = res;
                expect(res.status).to.be.equal(status.nocontent);
                done();
            });
    });

    it('it should UPDATE a vehicle based on its ID', done => {
        let vehicle = {
            reg_number: 999998,
            id_catalogue: 10,
            odometer: 9999,
            state: 'Available',
            date_release: 123456,
            id_unit: 1,
        }
        chai
            .request(server)
            .get("/vehicle")
            .end((error, response) => {
                chai.request(server)
                    .put("/vehicle/" + response.body[response.body.length - 1].id)
                    .send(vehicle)
                    .end((err, res) => {
                        queryResponse = res;
                        expect(res.status).to.be.within(status.success, status.nocontent);
                        res.body.should.be.a('String');
                        done();
                    });
            });
    });

    it('it should PATCH a vehicle\'s odometer value based on its ID', done => {
        chai
            .request(server)
            .get("/vehicle")
            .end((error, response) => {
                chai.request(server)
                    .put("/vehicle/" + response.body[response.body.length - 1].id + "/odometer/" + 9999)
                    .end((err, res) => {
                        queryResponse = res;
                        expect(res.status).to.be.within(status.success, status.nocontent);
                        res.body.should.be.a('String');
                        done();
                    });
            });
    });

    it('it should PATCH a vehicle\'s status based on its ID', done => {
        chai
            .request(server)
            .get("/vehicle")
            .end((error, response) => {
                chai.request(server)
                    .put("/vehicle/" + response.body[response.body.length - 1].id + "/state/" + "Test State")
                    .end((err, res) => {
                        queryResponse = res;
                        expect(res.status).to.be.within(status.success, status.nocontent);
                        res.body.should.be.a('String');
                        done();
                    });
            });
    });

    it(`it should DELETE an existing vehicle based on its ID`, (done) => {
        chai
            .request(server)
            .get("/vehicle")
            .end((error, response) => {
                chai.request(server)
                    .delete('/vehicle/' + response.body[response.body.length - 1].id)
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