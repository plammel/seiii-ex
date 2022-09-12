const models = require('../models');
const app = require('../src/app');
const chai = require('chai');
const expect = chai.expect;

let chaiHttp = require('chai-http');
chai.use(chaiHttp);

const url = 'http://localhost:3000';
const MEMBERS = [{
    name: "Mr Smith",
    phoneNumber: "9876543",
    email: "smith@foo.com" 
  }, {
    name: "Ms Parkman",
    phoneNumber: "9876543",
    email: "parkman@bar.com" }
];
const CLIENTS = [{
    companyName: "pepsi",
    address: "rodeo drive",
    city: "miami",
    state: "florida",
    zip: "zip",
    headcount: "headcount"
}, {
    companyName: "pepsico",
    address: "john doe av.",
    city: "palo alto",
    state: "california",
    zip: "zip",
    headcount: "headcount"
}, {
    companyName: "coca cola",
    address: "evergreen st",
    city: "Los Angeles",
    state: "california",
    zip: "zip",
    headcount: "headcount"
}]
describe('Testing app', function () {
    before(async () => {
        await models.sequelize.sync({ force: true });
    });
    it('1.1 POST CLIENT 1', function (done) {
        chai.request(app)
        .post('/clients')
        .send(CLIENTS[0])
        .end(function (err, res) {
            expect(res).to.have.status(201);
            done();
        });
    });
    it('1.2 POST CLIENT 2', function (done) {
        chai.request(app)
        .post('/clients')
        .send(CLIENTS[1])
        .end(function (err, res) {
            expect(res).to.have.status(201);
            done();
        });
    });
    it('1.3 POST CLIENT 3', function (done) {
        chai.request(app)
        .post('/clients')
        .send(CLIENTS[2])
        .end(function (err, res) {
            expect(res).to.have.status(201);
            done();
        });
    });
    it('1.4 PUT CLIENT 3', function (done) {
        const data = {...CLIENTS[2]}
        data.companyName = 'coca-cola';
        chai.request(app)
        .put('/clients/3')
        .send(data)
        .end(function (err, res) {
            expect(res).to.have.status(200);
            done();
        });
    });
    it('2.1 FIND ALL CLIENTS', function (done) {
        chai.request(app)
        .get('/clients')
        .send()
        .end(function (err, res) {
            expect(res.body.length).to.equal(3);
            done();
        });
    });
    it('2.2 FIND BY NAME - FUZZY SEARCH', function (done) {
        chai.request(app)
        .get('/clients?name=pepsi')
        .send()
        .end(function (err, res) {
            expect(res.body.length).to.equal(2);
            done();
        });
    });
    it('2.3 FIND ALL CLIENTS', function (done) {
        chai.request(app)
        .get('/clients')
        .send()
        .end(function (err, res) {
            expect(res.body.length).to.equal(3);
            done();
        });
    });
    it('2.4 FIND BY STATE', function (done) {
        chai.request(app)
        .get('/clients?state=california')
        .send()
        .end(function (err, res) {
            expect(res.body.length).to.equal(2);
            done();
        });
    });
    it('2.5 FIND BY STATE & NAME', function (done) {
        chai.request(app)
        .get('/clients?name=pepsi&state=california')
        .send()
        .end(function (err, res) {
            expect(res.body.length).to.equal(1);
            done();
        });
    });
    it('2.6 FIND BY ID', function (done) {
        chai.request(app)
        .get('/clients/1')
        .send()
        .end(function (err, res) {
            expect(res.body.id).to.equal(1);
            done();
        });
    });
    it('3 POST MEMBER', function (done) {
        chai.request(app)
        .post('/members')
        .send(MEMBERS[0])
        .end(function (err, res) {
            expect(res.status).to.equal(201);
            done();
        });
    });
    it('4.1 ASSIGN MEMBER TO CLIENT', function (done) {
        chai.request(app)
        .post('/clients/1/members')
        .send({memberId:1})
        .end(function (err, res) {
            expect(res.status).to.equal(201);
            done();
        });
    });
    it('4.2 GET CLIENT MEMBERS', function (done) {
        chai.request(app)
        .get('/clients/1/members')
        .send()
        .end(function (err, res) {
            expect(res.body.length).to.equal(1);
            done();
        });
    });
    it('4.3 DELETE CLIENT MEMBER', function (done) {
        chai.request(app)
        .delete('/clients/1/members/1')
        .send()
        .end(function (err, res) {
            expect(res.status).to.equal(204);
            done();
        });
    });
    it('4.3 GET CLIENT MEMBERS (DELETED)', function (done) {
        chai.request(app)
        .get('/clients/1/members')
        .send()
        .end(function (err, res) {
            expect(res.body.length).to.equal(0);
            done();
        });
    });
    it('5 DELETE CLIENT', function (done) {
        chai.request(app)
        .delete('/clients/1')
        .send()
        .end(function (err, res) {
            expect(res.status).to.equal(204);
            done();
        });
    });
});
