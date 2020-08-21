//sheet/speed.test.js
process.env.NODE_ENV = 'test';

const server = require("../../index");
let status = require('../../utilities/constants');

const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const should = chai.should();
chai.use(chaiHttp);

describe("Use Speeds", () =>{


    it('it should GET a list of all speed sheets or nocontent if DB is empty', done => {
        chai
            .request(server)
            .get("/sheet/speed")
            .end((err, res) => {
                queryResponse = res;
                expect(res.status).to.be.within(status.success, status.nocontent);
                if(res.status != status.nocontent)
                    res.body.should.be.a('array');
                done();
            });
    });



    it('it should POST a speed sheet and return its ID', (done) => {
        let element = {
            id_sheet:1,
            speed:67,
            time:988654321,
        }
        chai.request(server)
            .post('/sheet/speed')
            .send(element)
            .end((err, res) => {
                queryResponse = res;
                res.should.have.status(status.success);
                res.body.should.be.a('object');
                done();
            });
    });

    it('it should GET a speed sheet based on the ID of a use sheet', done => {
        chai
            .request(server)
            .get("/sheet/speed")
            .end((error, response) => {
                chai.request(server)
                    .get("/sheet/speed/" + response.body[response.body.length - 1].id_use_sheet)
                    .end((err, res) => {
                        queryResponse = res;
                        expect(res.status).to.be.within(status.success, status.nocontent);
                        res.body.should.be.a('array');
                        done();
                    });
            });
    });

    it('it should NOT GET a speed sheet with an erroneous use sheet ID', done => {

        chai.request(server)
            .get("/sheet/speed/" + 99999)
            .end((err, res) => {
                queryResponse = res;
                expect(res.status).to.be.equal(status.nocontent);
                done();
            });
    });

    it(`it should DELETE an existing speed sheet based on its ID`, (done) => {
        chai
            .request(server)
            .get("/sheet/speed")
            .end((error, response) => {
                chai.request(server)
                    .delete('/sheet/speed/' + response.body[response.body.length - 1].id)
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