const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index'); // Path to your Express app
const expect = chai.expect;

chai.use(chaiHttp);

describe('Auth API', () => {
  describe('POST /api/auth/register', () => {
    it('should register a new user', (done) => {
      chai.request(app)
        .post('/api/auth/register')
        .send({ username: 'testuser', email: 'testuser@example.com', password: 'password123' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('token');
          done();
        });
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login an existing user', (done) => {
      chai.request(app)
        .post('/api/auth/login')
        .send({ email: 'testuser@example.com', password: 'password123' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('token');
          done();
        });
    });
  });
});
