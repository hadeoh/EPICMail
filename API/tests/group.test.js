import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../app';

process.env.NODE_ENV = 'test';

chai.use(chaiHttp);

const { expect } = chai;

const token = jwt.sign(
  { userId: 1 },
  process.env.SECRET,
  { expiresIn: '365d' },
);

describe('Groups', () => {
  describe('POST /', () => {
    // Test to create a group
    it('should create a group', (done) => {
      chai.request(app)
        .post('/api/v1/groups')
        .set('x-access-token', token)
        .send({
          name: 'azeez',
        })
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).to.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.keys('status', 'data');
          expect(res.body.data).to.be.an('array');
          expect(res.body.status).to.be.a('number');
          expect(res.body.status).to.equal(201);
          done();
        });
    });
    // Test to add user to group
    it('should add user to a group', (done) => {
      chai.request(app)
        .post('/api/v1/groups/1/users')
        .set('x-access-token', token)
        .send({
          userEmail: 'vincicode@epicmail.com',
        })
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).to.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.keys('status', 'data');
          expect(res.body.data).to.be.an('array');
          expect(res.body.status).to.be.a('number');
          expect(res.body.status).to.equal(201);
          done();
        });
    });
    // Test to create group messages
    it('should create a group message', (done) => {
      const memToken = jwt.sign(
        { userId: 4 },
        process.env.SECRET,
        { expiresIn: '365d' },
      );
      chai.request(app)
        .post('/api/v1/groups/1/messages')
        .set('x-access-token', memToken)
        .send({
          subject: 'azeez',
          message: 'azeez is a boy',
        })
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).to.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.keys('status', 'data');
          expect(res.body.data).to.be.an('array');
          expect(res.body.status).to.be.a('number');
          expect(res.body.status).to.equal(201);
          done();
        });
    });
    // Test to update group name
    it('should edit a group name', (done) => {
      chai.request(app)
        .patch('/api/v1/groups/1/name')
        .set('x-access-token', token)
        .send({
          name: 'usman',
        })
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.keys('status', 'data');
          expect(res.body.data).to.be.an('array');
          expect(res.body.status).to.be.a('number');
          expect(res.body.status).to.equal(200);
          done();
        });
    });
    // Test to delete a group
    it('should delete a group', (done) => {
      const memToken = jwt.sign(
        { userId: 4 },
        process.env.SECRET,
        { expiresIn: '365d' },
      );
      chai.request(app)
        .delete('/api/v1/groups/6')
        .set('x-access-token', memToken)
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.keys('status', 'data');
          expect(res.body.data).to.be.an('array');
          expect(res.body.status).to.be.a('number');
          expect(res.body.status).to.equal(200);
          done();
        });
    });
    // Test to delete user from group
    it('should delete user from a group', (done) => {
      const memToken = jwt.sign(
        { userId: 4 },
        process.env.SECRET,
        { expiresIn: '365d' },
      );
      chai.request(app)
        .delete('/api/v1/groups/1/users/4')
        .set('x-access-token', memToken)
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.keys('status', 'data');
          expect(res.body.data).to.be.an('array');
          expect(res.body.status).to.be.a('number');
          expect(res.body.status).to.equal(200);
          done();
        });
    });
    // Test to delete message from a group
    it('should delete message from a group', (done) => {
      chai.request(app)
        .delete('/api/v1/groups/1/messages/6')
        .set('x-access-token', token)
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.keys('status', 'message');
          expect(res.body.message).to.be.an('string');
          expect(res.body.status).to.be.a('number');
          expect(res.body.status).to.equal(200);
          done();
        });
    });
    it('should get all groups', (done) => {
      const memToken = jwt.sign(
        { userId: 4 },
        process.env.SECRET,
        { expiresIn: '365d' },
      );
      chai.request(app)
        .get('/api/v1/groups')
        .set('x-access-token', memToken)
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.keys('status', 'data');
          expect(res.body.data).to.be.an('array');
          expect(res.body.status).to.be.a('number');
          expect(res.body.status).to.equal(200);
          done();
        });
    });
    // Test to get all group users
    it('should get all group users', (done) => {
      chai.request(app)
        .get('/api/v1/groups/1/users')
        .set('x-access-token', token)
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.keys('status', 'data');
          expect(res.body.data).to.be.an('array');
          expect(res.body.status).to.be.a('number');
          expect(res.body.status).to.equal(200);
          done();
        });
    });
    // Test to get a group user
    it('should get a group user', (done) => {
      chai.request(app)
        .get('/api/v1/groups/1/users/1')
        .set('x-access-token', token)
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.keys('status', 'data');
          expect(res.body.data).to.be.an('array');
          expect(res.body.status).to.be.a('number');
          expect(res.body.status).to.equal(200);
          done();
        });
    });
    // Test to get all received group emails
    it('should get all received group emails', (done) => {
      const memToken = jwt.sign(
        { userId: 2 },
        process.env.SECRET,
        { expiresIn: '365d' },
      );
      chai.request(app)
        .get('/api/v1/groups/1/messages')
        .set('x-access-token', memToken)
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.keys('status', 'data');
          expect(res.body.data).to.be.an('array');
          expect(res.body.status).to.be.a('number');
          expect(res.body.status).to.equal(200);
          done();
        });
    });
    // Test to get emails sent to a group
    it('should get all sent group emails', (done) => {
      const memToken = jwt.sign(
        { userId: 2 },
        process.env.SECRET,
        { expiresIn: '365d' },
      );
      chai.request(app)
        .get('/api/v1/groups/1/messages/sent')
        .set('x-access-token', memToken)
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.keys('status', 'data');
          expect(res.body.data).to.be.an('array');
          expect(res.body.status).to.be.a('number');
          expect(res.body.status).to.equal(200);
          done();
        });
    });
    // Test to get unread group emails
    it('should get all unread group emails', (done) => {
      const memToken = jwt.sign(
        { userId: 2 },
        process.env.SECRET,
        { expiresIn: '365d' },
      );
      chai.request(app)
        .get('/api/v1/groups/1/messages/unread')
        .set('x-access-token', memToken)
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.keys('status', 'data');
          expect(res.body.data).to.be.an('array');
          expect(res.body.status).to.be.a('number');
          expect(res.body.status).to.equal(200);
          done();
        });
    });
    // Test to know if user is in group
    it('should get all unread group emails', (done) => {
      const memToken = jwt.sign(
        { userId: 7 },
        process.env.SECRET,
        { expiresIn: '365d' },
      );
      chai.request(app)
        .get('/api/v1/groups/1/messages/unread')
        .set('x-access-token', memToken)
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).to.equal(401);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.keys('status', 'message');
          expect(res.body.message).to.be.an('string');
          expect(res.body.status).to.be.a('number');
          expect(res.body.status).to.equal(401);
          done();
        });
    });
    // Test to get a particular group email
    it('should get a group email', (done) => {
      const memToken = jwt.sign(
        { userId: 2 },
        process.env.SECRET,
        { expiresIn: '365d' },
      );
      chai.request(app)
        .get('/api/v1/groups/1/messages/5')
        .set('x-access-token', memToken)
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.keys('status', 'data');
          expect(res.body.data).to.be.an('array');
          expect(res.body.status).to.be.a('number');
          expect(res.body.status).to.equal(200);
          done();
        });
    });
  });
});
