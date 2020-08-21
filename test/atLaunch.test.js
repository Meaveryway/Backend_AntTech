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


describe("Server", () => {
    it(`starts successfully on port ${PORT}`, done => {
        chai
            .request(server)
            .get("/")
            .end((err, res) => {
                queryResponse = res;
                expect(res).to.have.status(status.success);
                done();
            });
    });
    it(`accesses local database with URL ${connectionString}`, async function() {
        var result;
        const client = new pg.Client(connectionString);

        await client.connect()
            .then(() => {
                result = "successfully accessed DB";
            })
            .catch((e) => {
                result = "failed to access DB";
                e.message = result;
                return Promise.reject(e);
            })
            .then(() => {
                result.should.equals("successfully accessed DB")
            });
        client.end();
    });
    var queryResponse;
    afterEach(function() {
        if (this.currentTest.state == 'failed') {
            console.log('\x1b[33m%s\x1b[0m', queryResponse.text);
        }
    });

});