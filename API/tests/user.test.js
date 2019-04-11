import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../app';


chai.use(chaiHttp);

chai.should();

describe('POST /', () => {
  // Test to create a user account
  it('should create a user account', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('x-access-token, eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU1NDQwOTM2NCwiZXhwIjoxNTg1OTQ1MzY0fQ.0zg7aIxJPwRbDrNySWaErZ7YXR8C0VahTLF4F63tRMs')
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
