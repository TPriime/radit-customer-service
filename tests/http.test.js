process.env.NODE_ENV = 'test';

// let mongoose = require("mongoose");
let Customer = require('../interface/http/models/customer');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index').server;
let should = chai.should();


chai.use(chaiHttp);

describe('customers', () => {
    var preventDelete = false;

    beforeEach((done) => {
        if(!preventDelete) {
            Customer.remove({}, (err) => {
                done();
            });
        }
        else {
            preventDelete = false;
            done();
        }
    });
    describe('/GET/all customer', () => {
        it('it should GET all the customers', (done) => {
            chai.request(server)
                .get('/all')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.customers.should.be.a('array');
                    res.body.customers.length.should.be.eql(0);
                    done();
                });
        });
    });
    describe('/PUT customer', () => {
        it('it should PUT a customer ', (done) => {
            let customer = {
                username: "john",
                password: "cuscus"
            }
            chai.request(server)
                .put('/')
                .send(customer)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Created customer data');
                    res.body.should.have.property('customer');
                    res.body.customer.should.have.property('username').eql(customer.username);
                    preventDelete = true
                    done();
                });
        });
        it('it should not PUT a customer with the same name', (done) => {
            let customer = {
                username: "john",
                password: "cuscus"
            }
            chai.request(server)
                .put('/')
                .send(customer)
                .end((err, res) => {
                    res.should.not.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    done();
                });
        });
    });
    describe('/GET/:username customer', () => {
        it('it should GET a customer by the given customer name', (done) => {
            let customer = Customer({
                username: "benj",
                password: "cuscus"
            });
            customer.save((err, customer) => {
                chai.request(server)
                    .get('/' + customer.username)
                    .send(customer)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.customer.should.have.property('username').eql(customer.username);
                        done();
                    });
            });

        });
    });
    /*
     * Test the /DELETE/:id route
     */
    describe('/DELETE/:username customer', () => {
        it('it should DELETE a customer given the customer name', (done) => {
            let customer = Customer({
                username: "ben",
                password: "cuscus"
            });
            customer.save((err, customer) => {
                chai.request(server)
                    .delete('/' + customer.username)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Deleted customer data');
                        done();
                    });
            });
        });
    });
});