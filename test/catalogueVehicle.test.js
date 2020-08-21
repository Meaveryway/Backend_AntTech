//catalogue/vehicle.test.js
process.env.NODE_ENV = 'test';

const server = require("../index");
let status = require('../utilities/constants');

const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const should = chai.should();
chai.use(chaiHttp);

describe("Catalogue vehicle", () =>{


    it('it should GET a list of all catalogue vehicles or nocontent if DB is empty', done => {
        chai
            .request(server)
            .get("/catalogue/vehicle")
            .end((err, res) => {
                queryResponse = res;
                expect(res.status).to.be.within(status.success, status.nocontent);
                if(res.status != status.nocontent)
                    res.body.should.be.a('array');
                done();
            });
    });



    it('it should POST a catalogue vehicle and return its ID', (done) => {
        let element = {
            id_manufacturer:3,
            designation:"Ranger",
            fuel:"Diesel",
            id_handbook:2,
            category:"Patrouille"
        }
        chai.request(server)
            .post('/catalogue/vehicle')
            .send(element)
            .end((err, res) => {
                queryResponse = res;
                res.should.have.status(status.success);
                res.body.should.be.a('object');
                done();
            });
    });

    it('it should GET a catalogue vehicle based on its ID', done => {
        chai
            .request(server)
            .get("/catalogue/vehicle")
            .end((error, response) => {
                chai.request(server)
                    .get("/catalogue/vehicle/" + response.body[response.body.length - 1].id)
                    .end((err, res) => {
                        queryResponse = res;
                        expect(res.status).to.be.within(status.success, status.nocontent);
                        res.body.should.be.a('array');
                        done();
                    });
            });
    });

    it('it should NOT GET a catalogue vehicle with an erroneous ID', done => {

        chai.request(server)
            .get("/catalogue/vehicle/" + 99999)
            .end((err, res) => {
                queryResponse = res;
                expect(res.status).to.be.equal(status.nocontent);
                done();
            });
    });

    it('it should UPDATE a catalogue vehicle based on its ID', done => {
        let element = {
            id_manufacturer:3,
            designation:"Ranger XXXX",
            fuel:"Diesel",
            id_handbook:2,
            category:"Patrouille"
        }
        chai
            .request(server)
            .get("/catalogue/vehicle")
            .end((error, response) => {
                chai.request(server)
                    .put("/catalogue/vehicle/" + response.body[response.body.length - 1].id)
                    .send(element)
                    .end((err, res) => {
                        queryResponse = res;
                        expect(res.status).to.be.within(status.success, status.nocontent);
                        res.body.should.be.a('String');
                        done();
                    });
            });
    });

        it(`it should DELETE an existing catalogue vehicle based on its ID`, (done) => {
            chai
                .request(server)
                .get("/catalogue/vehicle")
                .end((error, response) => {
                    chai.request(server)
                        .delete('/catalogue/vehicle/' + response.body[response.body.length - 1].id)
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