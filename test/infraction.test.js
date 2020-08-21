//infraction.test.js
process.env.NODE_ENV = 'test';

const server = require("../index");
let status = require('../utilities/constants');

const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const should = chai.should();
chai.use(chaiHttp);

describe("Infractions", () =>{


    it('it should GET a list of all infractions or nocontent if DB is empty', done => {
        chai
            .request(server)
            .get("/infraction")
            .end((err, res) => {
                queryResponse = res;
                expect(res.status).to.be.within(status.success, status.nocontent);
                if(res.status != status.nocontent)
                    res.body.should.be.a('array');
                done();
            });
    });



    it('it should POST an infraction and return its ID', (done) => {
        let element = {
            description:'accident',
            localisation:'Batna',
            date:10000,
            level:2,
            type:2,
            id_sheet:1,
        }
        chai.request(server)
            .post('/infraction')
            .send(element)
            .end((err, res) => {
                queryResponse = res;
                res.should.have.status(status.success);
                res.body.should.be.a('object');
                done();
            });
    });

    it('it should GET an infraction based on its ID', done => {
        chai
            .request(server)
            .get("/infraction")
            .end((error, response) => {
                chai.request(server)
                    .get("/infraction/" + response.body[response.body.length - 1].id)
                    .end((err, res) => {
                        queryResponse = res;
                        expect(res.status).to.be.within(status.success, status.nocontent);
                        res.body.should.be.a('array');
                        done();
                    });
            });
    });

    it('it should NOT GET an infraction with an erroneous ID', done => {

        chai.request(server)
            .get("/infraction/" + 99999)
            .end((err, res) => {
                queryResponse = res;
                expect(res.status).to.be.equal(status.nocontent);
                done();
            });
    });

    it('it should UPDATE an infraction based on its ID', done => {
        let element = {
            description:'XXXXXXX',
            localisation:'Batna',
            date:10000,
            level:2,
            type:2,
            id_sheet:1,
        }
        chai
            .request(server)
            .get("/infraction")
            .end((error, response) => {
                chai.request(server)
                    .put("/infraction/" + response.body[response.body.length - 1].id)
                    .send(element)
                    .end((err, res) => {
                        queryResponse = res;
                        expect(res.status).to.be.within(status.success, status.nocontent);
                        res.body.should.be.a('String');
                        done();
                    });
            });
    });

    it(`it should DELETE an existing infraction based on its ID`, (done) => {
        chai
            .request(server)
            .get("/infraction")
            .end((error, response) => {
                chai.request(server)
                    .delete('/infraction/' + response.body[response.body.length - 1].id)
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