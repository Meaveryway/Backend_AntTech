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

describe("Operational units", () => {
    it('it should GET a list of all operational units or nocontent if DB is empty', done => {
        chai
            .request(server)
            .get("/unit/operational")
            .end((err, res) => {
                queryResponse = res;
                expect(res.status).to.be.within(status.success, status.nocontent);
                res.body.should.be.a('array');
                done();
            });
    });

    it('it should POST an operational unit and return its ID', (done) => {
        let element = {
            city: 'Alger',
            region: 'Nord',
            address: 'Some lost hole in oued Smar',
            capacity: 50,
            id_maintenance_unit: 3,
            designation: '/'
        }
        chai.request(server)
            .post('/unit/operational')
            .send(element)
            .end((err, res) => {
                queryResponse = res;
                res.should.have.status(status.success);
                res.body.should.be.a('object');
                done();
            });
    });

    it('it should GET an operational unit based on its ID', done => {
        chai
            .request(server)
            .get("/unit/operational")
            .end((error, response) => {
                chai.request(server)
                    .get("/unit/operational/" + response.body[response.body.length - 1].id)
                    .end((err, res) => {
                        queryResponse = res;
                        expect(res.status).to.be.within(status.success, status.nocontent);
                        res.body.should.be.a('array');
                        done();
                    });
            });
    });

    it('it should NOT GET an operational unit with an erroneous ID', done => {

        chai.request(server)
            .get("/unit/operational/" + 99999)
            .end((err, res) => {
                queryResponse = res;
                expect(res.status).to.be.equal(status.nocontent);
                done();
            });
    });

    it('it should UPDATE an operational unit based on its ID', done => {
        let element = {
            city: 'Alger',
            region: 'Nord',
            address: 'Some lost hole in oued Smar',
            capacity: 999,
            id_maintenance_unit: 3,
            designation: '/'
        }
        chai
            .request(server)
            .get("/unit/operational")
            .end((error, response) => {
                chai.request(server)
                    .put("/unit/operational/" + response.body[response.body.length - 1].id)
                    .send(element)
                    .end((err, res) => {
                        queryResponse = res;
                        expect(res.status).to.be.within(status.success, status.nocontent);
                        res.body.should.be.a('String');
                        done();
                    });
            });
    });

    it(`it should DELETE an existing operational unit based on its ID`, (done) => {
        chai
            .request(server)
            .get("/unit/operational")
            .end((error, response) => {
                chai.request(server)
                    .delete('/unit/operational/' + response.body[response.body.length - 1].id)
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