import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

process.env.NODE_ENV = 'test';

const { expect } = chai;

chai.use(chaiHttp);

// const token = jwt.sign({
//   userEmail: 'vincicode@epicmail.com',
// },
// process.env.SECRET, { expiresIn: '7d' });

describe('Users', () => {
  describe('GET /', () => {
  // Test to get to index page
    it('should direct to index page', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.be.a('string');
          done();
        });
    });
  });
  describe('POST /', () => {
  // Test to create a user account
    it('should create a user account', (done) => {
      const user = {
        email: 'adiousman@epicmail.com',
        firstName: 'adio',
        lastName: 'usman',
        password: 'modupeola',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).to.equal(201);
          expect(res.body).to.have.keys('status', 'data');
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.equal(201);
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0]).to.be.an('object');
          expect(res.body.data[0]).to.have.keys('token', 'id', 'email', 'firstName', 'lastName');
          done();
        });
    });
    it('should check if a user exists already', (done) => {
      const user = {
        email: 'adiousman@epicmail.com',
        firstName: 'adio',
        lastName: 'usman',
        password: 'modupeola',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).to.equal(409);
          expect(res.body).to.have.keys('status', 'message');
          expect(res.body.status).to.equal(409);
          expect(res.body.status).to.be.a('number');
          expect(res.body.message).to.be.a('string');
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('should check if there is a missing field', (done) => {
      const user = {
        email: '',
        firstName: 'adio',
        lastName: 'usman',
        password: 'modupeola',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).to.equal(400);
          expect(res.body).to.have.keys('status', 'message');
          expect(res.body.status).to.equal(400);
          expect(res.body.status).to.be.a('number');
          expect(res.body.message).to.be.a('string');
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('should check if email is valid', (done) => {
      const user = {
        email: 'adiousman',
        firstName: 'adio',
        lastName: 'usman',
        password: 'modupeola',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).to.equal(401);
          expect(res.body).to.have.keys('status', 'message');
          expect(res.body.status).to.equal(401);
          expect(res.body.status).to.be.a('number');
          expect(res.body.message).to.be.a('string');
          expect(res.body).to.be.an('object');
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
          email: 'adiousman@epicmail.com',
          password: 'modupeola',
        })
        .end((err, res) => {
          if (err) done(err);
          expect(res.body).to.have.keys('status', 'token');
          expect(res.body.status).to.be.a('number');
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal(200);
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('should check if there is a missing field', (done) => {
      const user = {
        email: '',
        password: 'modupeola',
      };
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user)
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).to.equal(400);
          expect(res.body).to.have.keys('status', 'message');
          expect(res.body.status).to.equal(400);
          expect(res.body.status).to.be.a('number');
          expect(res.body.message).to.be.a('string');
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('should check if email is valid', (done) => {
      const user = {
        email: 'adiousman',
        password: 'modupeola',
      };
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user)
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).to.equal(401);
          expect(res.body).to.have.keys('status', 'message');
          expect(res.body.status).to.equal(401);
          expect(res.body.status).to.be.a('number');
          expect(res.body.message).to.be.a('string');
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('should compare password', (done) => {
      const user = {
        email: 'adiousman@epicmail.com',
        password: 'modupe',
      };
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user)
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).to.equal(400);
          expect(res.body).to.have.keys('status', 'message');
          expect(res.body.status).to.equal(400);
          expect(res.body.status).to.be.a('number');
          expect(res.body.message).to.be.a('string');
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });
  describe('GET /', () => {
    // Test to get all users
    it('should get all users', (done) => {
      chai.request(app)
        .get('/api/v1/auth/users')
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU1NTAwMTI5MiwiZXhwIjoxNTg2NTM3MjkyfQ.KvtaExEg-L6MIr5OTq8n-JllW-Nc7nYlJbDX3PhoJ1E')
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).to.equal(200);
          expect(res.body).to.have.keys('status', 'data');
          expect(res.body.status).to.equal(200);
          expect(res.body.status).to.be.a('number');
          expect(res.body.data).to.be.an('array');
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('should get a user', (done) => {
      chai.request(app)
        .get('/api/v1/auth/users/4')
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU1NTAwMTI5MiwiZXhwIjoxNTg2NTM3MjkyfQ.KvtaExEg-L6MIr5OTq8n-JllW-Nc7nYlJbDX3PhoJ1E')
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).to.equal(200);
          expect(res.body).to.have.keys('status', 'data');
          expect(res.body.status).to.equal(200);
          expect(res.body.status).to.be.a('number');
          expect(res.body.data).to.be.an('array');
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });
});
