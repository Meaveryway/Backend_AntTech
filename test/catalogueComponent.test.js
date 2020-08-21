//catalogue/component.test.js
process.env.NODE_ENV = 'test';

const server = require("../index");
let status = require('../utilities/constants');

const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const should = chai.should();
chai.use(chaiHttp);

describe("Catalogue component", () =>{


    it('it should GET a list of all catalogue components or nocontent if DB is empty', done => {
        chai
            .request(server)
            .get("/catalogue/component")
            .end((err, res) => {
                queryResponse = res;
                expect(res.status).to.be.within(status.success, status.nocontent);
                if(res.status != status.nocontent)
                    res.body.should.be.a('array');
                done();
            });
    });



    it('it should POST a catalogue component and return its ID', (done) => {
        let element = {
            designation:"Bougies d'allumage",
            afnor:3,
            criticality:2,
            frequency:1,
            detectability:3,
            id_handbook:2,
            id_manufacturer:2,
            threshold_handbook:1500,
            threshold_rex:2000,
            threshold_used:true
        }
        chai.request(server)
            .post('/catalogue/component')
            .send(element)
            .end((err, res) => {
                queryResponse = res;
                res.should.have.status(status.success);
                res.body.should.be.a('object');
                done();
            });
    });

    it('it should GET a catalogue component based on its ID', done => {
        chai
            .request(server)
            .get("/catalogue/component")
            .end((error, response) => {
                chai.request(server)
                    .get("/catalogue/component/" + response.body[response.body.length - 1].id)
                    .end((err, res) => {
                        queryResponse = res;
                        expect(res.status).to.be.within(status.success, status.nocontent);
                        res.body.should.be.a('array');
                        done();
                    });
            });
    });

    it('it should NOT GET a catalogue component with an erroneous ID', done => {

        chai.request(server)
            .get("/catalogue/component/" + 99999)
            .end((err, res) => {
                queryResponse = res;
                expect(res.status).to.be.equal(status.nocontent);
                done();
            });
    });

    it('it should UPDATE a catalogue component based on its ID', done => {
        let element = {
            designation:"Bougies d'allumage XXXXX",
            afnor:3,
            criticality:2,
            frequency:1,
            detectability:3,
            id_handbook:2,
            id_manufacturer:2,
            threshold_handbook:1500,
            threshold_rex:2000,
            threshold_used:true
        }
        chai
            .request(server)
            .get("/catalogue/component")
            .end((error, response) => {
                chai.request(server)
                    .put("/catalogue/component/" + response.body[response.body.length - 1].id)
                    .send(element)
                    .end((err, res) => {
                        queryResponse = res;
                        expect(res.status).to.be.within(status.success, status.nocontent);
                        res.body.should.be.a('String');
                        done();
                    });
            });
    });

    it('it should PATCH a catalogue component\'s used threshold (REX/Handbook) based on its ID', done => {
        chai
            .request(server)
            .get("/catalogue/component")
            .end((error, response) => {
                chai.request(server)
                    .put("/catalogue/component/" + response.body[response.body.length - 1].id + "/threshold/" + 'true')
                    .end((err, res) => {
                        queryResponse = res;
                        expect(res.status).to.be.within(status.success, status.nocontent);
                        res.body.should.be.a('String');
                        done();
                    });
            });
    });

    it('it should PATCH a catalogue component\'s handbook threshold based on its ID', done => {
        chai
            .request(server)
            .get("/catalogue/component")
            .end((error, response) => {
                chai.request(server)
                    .put("/catalogue/component/" + response.body[response.body.length - 1].id + "/threshold/handbook/" + '9999')
                    .end((err, res) => {
                        queryResponse = res;
                        expect(res.status).to.be.within(status.success, status.nocontent);
                        res.body.should.be.a('String');
                        done();
                    });
            });
    });

    it('it should PATCH a catalogue component\'s rex threshold based on its ID', done => {
        chai
            .request(server)
            .get("/catalogue/component")
            .end((error, response) => {
                chai.request(server)
                    .put("/catalogue/component/" + response.body[response.body.length - 1].id + "/threshold/rex/" + '9999')
                    .end((err, res) => {
                        queryResponse = res;
                        expect(res.status).to.be.within(status.success, status.nocontent);
                        res.body.should.be.a('String');
                        done();
                    });
            });
    });

    it(`it should DELETE an existing catalogue component based on its ID`, (done) => {
        chai
            .request(server)
            .get("/catalogue/component")
            .end((error, response) => {
                chai.request(server)
                    .delete('/catalogue/component/' + response.body[response.body.length - 1].id)
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