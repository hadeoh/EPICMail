import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../app';

process.env.NODE_ENV = 'test';

chai.use(chaiHttp);

const { expect } = chai;

const token = jwt.sign(
  { userEmail: 'vincicode@epicmail.com' },
  process.env.SECRET,
  { expiresIn: '7d' },
);

describe('Groups', () => {
  describe('POST /', () => {
    // Test to create a group
    it('should create a group', (done) => {
      chai.request(app)
        .post('/api/v1/groups')
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU1NTAwMTI5MiwiZXhwIjoxNTg2NTM3MjkyfQ.KvtaExEg-L6MIr5OTq8n-JllW-Nc7nYlJbDX3PhoJ1E')
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
      const adminToken = jwt.sign(
        { userEmail: 'franchesqa@epicmail.com' },
        process.env.SECRET,
        { expiresIn: '7d' },
      );
      chai.request(app)
        .post('api/v1/groups/1/users')
        .set('x-access-token', adminToken)
        .send({
          groupId: 1,
          userId: 3,
          userEmail: 'toluniyin@epicmail.com',
        })
        .end((err, res) => {
          if (err) done(err);
          console.log(res.body);
          expect(res.status).to.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.keys('status', 'data');
          expect(res.body.data).to.be.an('array');
          expect(res.body.status).to.be.a('number');
          expect(res.body.status).to.equal(201);
          done();
        });
    });
    // Test to send email to group
    it('should send email to a group', (done) => {
      chai.request(app)
        .post('api/v1/groups/1/messages')
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlhdCI6MTU1NTU4Njg5NSwiZXhwIjoxNTg3MTIyODk1fQ.0UUL5qQMvQPJXClDwmf7SFb3uuAIfy7iZdcbDEDvlTo')
        .send({
          groupId: 1,
          senderEmail: 'adiousman@epicmail.com',
          subject: 'dancing',
          message: 'dancing is sweet',
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
  });
});
