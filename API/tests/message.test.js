import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../index';


chai.use(chaiHttp);

chai.should();

describe('Messages', () => {
  describe('GET /', () => {
    // Test to get all messages record
    it('should get all messages record', (done) => {
      chai.request(app)
        .get('/api/v1/messages')
        .end((err, res) => {
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

    // Test to get unread messages record
    it('should not get a single unread message record', (done) => {
      chai.request(app)
        .get('/api/v1/messages/unread')
        .end((err, res) => {
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

    // Test to get sent messages record
    it('should get sent messages record', (done) => {
      chai.request(app)
        .get('/api/v1/messages/sent')
        .end((err, res) => {
          res.body.should.haveOwnProperty('status');
          res.body.should.haveOwnProperty('status').that.is.a('number');
          res.body.should.haveOwnProperty('data');
          res.body.should.haveOwnProperty('data').that.is.an('array');
          res.body.data[0].should.haveOwnProperty('createdOn');
          res.body.data[0].should.haveOwnProperty('subject');
          res.body.data[0].should.haveOwnProperty('parentMessageId');
          res.should.have.status(200);
          res.body.should.haveOwnProperty('status').that.equals(200);
          res.body.should.haveOwnProperty('status').that.equals(200);
          res.body.should.be.an('object');
          done();
        });
    });
    // Test to get a message record
    it('should not get a single message record', (done) => {
      const id = 5;
      chai.request(app)
        .get('/api/v1/messages/id')
        .end((err, res) => {
          res.body.should.haveOwnProperty('status');
          res.body.should.haveOwnProperty('status').that.is.a('number');
          res.should.have.status(200);
          res.body.should.haveOwnProperty('status').that.equals(404);
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
      .send({
        createdOn: '25/09 9:05',
        subject: 'Money',
        message: 'I am a boy',
        parentMessageId: 3,
      })
      .end((err, res) => {
        res.body.should.haveOwnProperty('status');
        res.body.should.haveOwnProperty('status').that.is.a('number');
        res.body.should.haveOwnProperty('data');
        res.body.should.haveOwnProperty('data').that.is.an('object');
        res.should.have.status(200);
        res.body.should.haveOwnProperty('status').that.equals(201);
        res.body.should.have.all.keys('status', 'data');
        res.body.data.should.haveOwnProperty('createdOn');
        res.body.data.should.haveOwnProperty('subject');
        res.body.data.should.haveOwnProperty('parentMessageId');
        res.body.data.should.haveOwnProperty('message');
        res.body.should.be.an('object');
        done();
      });
  });
});

describe(' Deletes a specific email', () => {
  it('should remove the message with the particular id number entered', (done) => {
    chai.request(app)
      .delete('/api/v1/messages/id')
      .end((err, res) => {
        if (err) {
          done(err);
        }
        res.body.should.haveOwnProperty('status').that.equals(200);
        res.body.should.haveOwnProperty('data').that.is.an('array');
        res.body.data[0].subject.should.be.a('string');
        res.body.data[0].message.should.be.a('string');
        res.body.data[0].id.should.be.a('number');
        res.body.data[0].status.should.be.a('string');
        res.body.data[0].parentMessageId.should.be.a('number');
        res.body.should.have.all.keys('status', 'data');
        res.body.should.be.an('object');
        done();
      });
  });
});
