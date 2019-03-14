import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../index';


chai.use(chaiHttp);

chai.should();

describe('POST /', () => {
  // Test to create a user account
  it('should create a user account', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'abu@epmail.com',
        firstName: 'Adu',
        lastName: 'Adaeze',
        password: 'abuirj',
      })
      .end((err, res) => {
        res.body.should.haveOwnProperty('status');
        res.body.should.haveOwnProperty('status').that.is.a('number');
        res.body.should.haveOwnProperty('token');
        res.should.have.status(200);
        res.body.should.haveOwnProperty('status').that.equals(201);
        res.body.should.have.all.keys('status', 'token');
        res.body.should.be.an('object');
        done();
      });
  });
});

describe('POST /', () => {
  // Test to log in a user
  it('should log in a user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'abu@epmail.com',
        password: 'abuirj',
      })
      .end((err, res) => {
        res.body.should.haveOwnProperty('status');
        res.body.should.haveOwnProperty('status').that.is.a('number');
        res.body.should.haveOwnProperty('token');
        res.should.have.status(200);
        res.body.should.haveOwnProperty('status').that.equals(200);
        res.body.should.have.all.keys('status', 'token');
        res.body.should.be.an('object');
        done();
      });
  });
});
