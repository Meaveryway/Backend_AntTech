//component.test.js
process.env.NODE_ENV = 'test';

const server = require("../index");
let status = require('../utilities/constants');

const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const should = chai.should();
chai.use(chaiHttp);

describe("Components", () =>{


    it('it should GET a list of all components or nocontent if DB is empty', done => {
        chai
            .request(server)
            .get("/component")
            .end((err, res) => {
                queryResponse = res;
                expect(res.status).to.be.within(status.success, status.nocontent);
                if(res.status != status.nocontent)
                    res.body.should.be.a('array');
                done();
            });
    });



    it('it should POST a component and return its ID', (done) => {
        let element = {
            id_catalogue:2,
            id_vehicle:1,
            odometer_installation:10350,
            odometer_last_control:14000,
            date_installation:456789,
        }
        chai.request(server)
            .post('/component')
            .send(element)
            .end((err, res) => {
                queryResponse = res;
                res.should.have.status(status.success);
                res.body.should.be.a('object');
                done();
            });
    });

    it('it should GET a component based on its ID', done => {
        chai
            .request(server)
            .get("/component")
            .end((error, response) => {
                chai.request(server)
                    .get("/component/" + response.body[response.body.length - 1].id)
                    .end((err, res) => {
                        queryResponse = res;
                        expect(res.status).to.be.within(status.success, status.nocontent);
                        res.body.should.be.a('array');
                        done();
                    });
            });
    });

    it('it should NOT GET a component with an erroneous ID', done => {

        chai.request(server)
            .get("/component/" + 99999)
            .end((err, res) => {
                queryResponse = res;
                expect(res.status).to.be.equal(status.nocontent);
                done();
            });
    });

    it('it should UPDATE a component based on its ID', done => {
        let element = {
            id_catalogue:2,
            id_vehicle:1,
            odometer_installation:9999,
            odometer_last_control:99999,
            date_installation:456789,
        }
        chai
            .request(server)
            .get("/component")
            .end((error, response) => {
                chai.request(server)
                    .put("/component/" + response.body[response.body.length - 1].id)
                    .send(element)
                    .end((err, res) => {
                        queryResponse = res;
                        expect(res.status).to.be.within(status.success, status.nocontent);
                        res.body.should.be.a('String');
                        done();
                    });
            });
    });

    it('it should PATCH a component\'s odometer based on its ID', done => {
        chai
            .request(server)
            .get("/component")
            .end((error, response) => {
                chai.request(server)
                    .put("/component/" + response.body[response.body.length - 1].id + "/odometer/" + 99999)
                    .end((err, res) => {
                        queryResponse = res;
                        expect(res.status).to.be.within(status.success, status.nocontent);
                        res.body.should.be.a('String');
                        done();
                    });
            });
    });

    it(`it should DELETE an existing component based on its ID`, (done) => {
        chai
            .request(server)
            .get("/component")
            .end((error, response) => {
                chai.request(server)
                    .delete('/component/' + response.body[response.body.length - 1].id)
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