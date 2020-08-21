//maintenanceSheet.test.js
process.env.NODE_ENV = 'test';

const server = require("../../index");
let status = require('../../utilities/constants');

const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const should = chai.should();
chai.use(chaiHttp);

describe("Maintenance sheets", () =>{


    it('it should GET a list of all maintenance sheets or nocontent if DB is empty', done => {
        chai
            .request(server)
            .get("/sheet/maintenance")
            .end((err, res) => {
                queryResponse = res;
                expect(res.status).to.be.within(status.success, status.nocontent);
                if(res.status != status.nocontent)
                    res.body.should.be.a('array');
                done();
            });
    });



    it('it should POST a maintenance sheet and return its ID', (done) => {
        let element = {
            id_unit:2,
            id_vehicle:1,
            date_entry:1234567,
            date_exit:1456789,
        }
        chai.request(server)
            .post('/sheet/maintenance')
            .send(element)
            .end((err, res) => {
                queryResponse = res;
                res.should.have.status(status.success);
                res.body.should.be.a('object');
                done();
            });
    });

    it('it should GET a maintenance sheet based on its ID', done => {
        chai
            .request(server)
            .get("/sheet/maintenance")
            .end((error, response) => {
                chai.request(server)
                    .get("/sheet/maintenance/" + response.body[response.body.length - 1].id)
                    .end((err, res) => {
                        queryResponse = res;
                        expect(res.status).to.be.within(status.success, status.nocontent);
                        res.body.should.be.a('array');
                        done();
                    });
            });
    });

    it('it should NOT GET a maintenance sheet with an erroneous ID', done => {

        chai.request(server)
            .get("/sheet/maintenance/" + 99999)
            .end((err, res) => {
                queryResponse = res;
                expect(res.status).to.be.equal(status.nocontent);
                done();
            });
    });

    it('it should UPDATE a maintenance sheet based on its ID', done => {
        let element = {
            id_unit:2,
            id_vehicle:1,
            date_entry:1234567,
            date_exit:99999999,
        }
        chai
            .request(server)
            .get("/sheet/maintenance")
            .end((error, response) => {
                chai.request(server)
                    .put("/sheet/maintenance/" + response.body[response.body.length - 1].id)
                    .send(element)
                    .end((err, res) => {
                        queryResponse = res;
                        expect(res.status).to.be.within(status.success, status.nocontent);
                        res.body.should.be.a('String');
                        done();
                    });
            });
    });

    it(`it should DELETE an existing maintenance sheet based on its ID`, (done) => {
        chai
            .request(server)
            .get("/sheet/maintenance")
            .end((error, response) => {
                chai.request(server)
                    .delete('/sheet/maintenance/' + response.body[response.body.length - 1].id)
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