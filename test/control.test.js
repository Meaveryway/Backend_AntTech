//control.test.js
process.env.NODE_ENV = 'test';

const server = require("../index");
let status = require('../utilities/constants');

const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const should = chai.should();
chai.use(chaiHttp);

describe("controls", () =>{


    it('it should GET a list of all controls or nocontent if DB is empty', done => {
        chai
            .request(server)
            .get("/control")
            .end((err, res) => {
                queryResponse = res;
                expect(res.status).to.be.within(status.success, status.nocontent);
                if(res.status != status.nocontent)
                    res.body.should.be.a('array');
                done();
            });
    });



    it('it should POST a control and return its ID', (done) => {
        let element = {
            id_component:3,
            id_sheet:3,
            duration:360000,
            date:456789,
            odometer:4500,
        }
        chai.request(server)
            .post('/control')
            .send(element)
            .end((err, res) => {
                queryResponse = res;
                res.should.have.status(status.success);
                res.body.should.be.a('object');
                done();
            });
    });

    it('it should GET a control based on its ID', done => {
        chai
            .request(server)
            .get("/control")
            .end((error, response) => {
                chai.request(server)
                    .get("/control/" + response.body[response.body.length - 1].id)
                    .end((err, res) => {
                        queryResponse = res;
                        expect(res.status).to.be.within(status.success, status.nocontent);
                        res.body.should.be.a('array');
                        done();
                    });
            });
    });

    it('it should NOT GET a control with an erroneous ID', done => {

        chai.request(server)
            .get("/control/" + 99999)
            .end((err, res) => {
                queryResponse = res;
                expect(res.status).to.be.equal(status.nocontent);
                done();
            });
    });

    it('it should UPDATE a control based on its ID', done => {
        let element = {
            id_component:3,
            id_sheet:3,
            duration:360000,
            date:456789,
            odometer:99999,
        }
        chai
            .request(server)
            .get("/control")
            .end((error, response) => {
                chai.request(server)
                    .put("/control/" + response.body[response.body.length - 1].id)
                    .send(element)
                    .end((err, res) => {
                        queryResponse = res;
                        expect(res.status).to.be.within(status.success, status.nocontent);
                        res.body.should.be.a('String');
                        done();
                    });
            });
    });

    it(`it should DELETE an existing control based on its ID`, (done) => {
        chai
            .request(server)
            .get("/control")
            .end((error, response) => {
                chai.request(server)
                    .delete('/control/' + response.body[response.body.length - 1].id)
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