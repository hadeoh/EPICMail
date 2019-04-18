import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

process.env.NODE_ENV = 'test';

chai.use(chaiHttp);

const { expect } = chai;

chai.should();

// const token = jwt.sign({
//   userEmail: 'vincicode@epicmail.com',
// },
// process.env.SECRET, { expiresIn: '7d' });

describe('Messages', () => {
  describe('GET /', () => {
    // Test to get all messages record
    it('should get all messages record', (done) => {
      chai.request(app)
        .get('/api/v1/messages')
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU1NTAwMTI5MiwiZXhwIjoxNTg2NTM3MjkyfQ.KvtaExEg-L6MIr5OTq8n-JllW-Nc7nYlJbDX3PhoJ1E')
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.keys('status', 'data');
          expect(res.body.status).to.be.a('number');
          expect(res.body.status).to.equal(200);
          expect(res.body.data).to.be.an('array');
          done();
        });
    });

    // Test to get unread messages record
    it('should get unread messages record', (done) => {
      chai.request(app)
        .get('/api/v1/messages/unread')
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU1NTAwMTI5MiwiZXhwIjoxNTg2NTM3MjkyfQ.KvtaExEg-L6MIr5OTq8n-JllW-Nc7nYlJbDX3PhoJ1E')
        .end((err, res) => {
          if (err) done(err);
          expect(res.body).to.have.keys('status', 'data');
          res.body.should.haveOwnProperty('status').that.is.a('number');
          res.body.should.haveOwnProperty('data');
          res.body.should.haveOwnProperty('data').that.is.an('array');
          res.should.have.status(200);
          res.body.should.haveOwnProperty('status').that.equals(200);
          res.body.should.be.an('object');
          done();
        });
    });

    // Test to get sent messages record
    it('should get sent messages record', (done) => {
      chai.request(app)
        .get('/api/v1/messages/sent')
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU1NTAwMTI5MiwiZXhwIjoxNTg2NTM3MjkyfQ.KvtaExEg-L6MIr5OTq8n-JllW-Nc7nYlJbDX3PhoJ1E')
        .end((err, res) => {
          if (err) done(err);
          res.body.should.haveOwnProperty('status');
          res.body.should.haveOwnProperty('status').that.is.a('number');
          res.body.should.haveOwnProperty('data');
          res.body.should.haveOwnProperty('data').that.is.an('array');
          res.should.have.status(200);
          res.body.should.haveOwnProperty('status').that.equals(200);
          res.body.should.be.an('object');
          done();
        });
    });
    // Test to get a message record
    it('should get a single message record', (done) => {
      chai.request(app)
        .get('/api/v1/messages/5')
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU1NTAwMTI5MiwiZXhwIjoxNTg2NTM3MjkyfQ.KvtaExEg-L6MIr5OTq8n-JllW-Nc7nYlJbDX3PhoJ1E')
        .end((err, res) => {
          if (err) done(err);
          res.body.should.haveOwnProperty('status');
          res.body.should.haveOwnProperty('status').that.is.a('number');
          expect(res.body).to.have.keys('status', 'data');
          res.body.should.haveOwnProperty('data').that.is.an('array');
          res.should.have.status(200);
          res.body.should.haveOwnProperty('status').that.equals(200);
          res.body.should.be.an('object');
          done();
        });
    });
  });
});

describe('POST /', () => {
  // Test to send a message to an individual
  it('should send a message', (done) => {
    chai.request(app)
      .post('/api/v1/messages')
      .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU1NTAwMTI5MiwiZXhwIjoxNTg2NTM3MjkyfQ.KvtaExEg-L6MIr5OTq8n-JllW-Nc7nYlJbDX3PhoJ1E')
      .send({
        senderEmail: 'vincicode@epicmail.com',
        subject: 'Money',
        message: 'I am a boy',
        receiverEmail: 'franchesqa@epicmail.com',
      })
      .end((err, res) => {
        if (err) done(err);
        res.body.should.haveOwnProperty('status');
        res.body.should.haveOwnProperty('status').that.is.a('number');
        res.body.should.haveOwnProperty('data');
        res.body.should.haveOwnProperty('data').that.is.an('array');
        res.should.have.status(201);
        res.body.should.haveOwnProperty('status').that.equals(201);
        res.body.should.have.all.keys('status', 'data');
        res.body.should.be.an('object');
        done();
      });
  });
  it('should check if a field is missing', (done) => {
    chai.request(app)
      .post('/api/v1/messages')
      .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU1NTAwMTI5MiwiZXhwIjoxNTg2NTM3MjkyfQ.KvtaExEg-L6MIr5OTq8n-JllW-Nc7nYlJbDX3PhoJ1E')
      .send({
        senderEmail: 'vincicode@epicmail.com',
        subject: '',
        message: 'I am a boy',
        receiverEmail: 'franchesqa@epicmail.com',
      })
      .end((err, res) => {
        if (err) done(err);
        res.body.should.haveOwnProperty('status');
        res.body.should.haveOwnProperty('status').that.is.a('number');
        res.body.should.haveOwnProperty('message');
        res.body.should.haveOwnProperty('message').that.is.a('string');
        res.should.have.status(400);
        res.body.should.haveOwnProperty('status').that.equals(400);
        res.body.should.have.all.keys('status', 'message');
        res.body.should.be.an('object');
        done();
      });
  });
  it('should check if an email is valid', (done) => {
    chai.request(app)
      .post('/api/v1/messages')
      .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU1NTAwMTI5MiwiZXhwIjoxNTg2NTM3MjkyfQ.KvtaExEg-L6MIr5OTq8n-JllW-Nc7nYlJbDX3PhoJ1E')
      .send({
        senderEmail: 'vincicode',
        subject: 'Money',
        message: 'I am a boy',
        receiverEmail: 'franchesqa',
      })
      .end((err, res) => {
        if (err) done(err);
        res.body.should.haveOwnProperty('status');
        res.body.should.haveOwnProperty('status').that.is.a('number');
        res.body.should.haveOwnProperty('message');
        res.body.should.haveOwnProperty('message').that.is.a('string');
        res.should.have.status(401);
        res.body.should.haveOwnProperty('status').that.equals(401);
        res.body.should.have.all.keys('status', 'message');
        res.body.should.be.an('object');
        done();
      });
  });
});

describe(' Deletes a specific email', () => {
  it('should remove the message with the particular id number entered', (done) => {
    chai.request(app)
      .delete('/api/v1/messages/5')
      .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU1NTAwMTI5MiwiZXhwIjoxNTg2NTM3MjkyfQ.KvtaExEg-L6MIr5OTq8n-JllW-Nc7nYlJbDX3PhoJ1E')
      .end((err, res) => {
        if (err) {
          done(err);
        }
        res.body.should.haveOwnProperty('status').that.equals(200);
        res.body.should.haveOwnProperty('data').that.is.an('array');
        res.body.data[0].message.should.be.a('string');
        res.body.should.have.all.keys('status', 'data');
        res.body.should.be.an('object');
        done();
      });
  });
});
