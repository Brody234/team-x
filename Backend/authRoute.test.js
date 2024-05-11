const request = require('supertest');
const express = require('express');
const router = require('./routes/authRoute');
const Login = require("./models/login");
const mongoose = require('mongoose');
const app = require('./server');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.use(express.json());
app.use('/auth', router);
let server;

beforeAll((done) => {
    server = app.listen(3000, done);
  });


  jest.mock('./models/login', () => ({
    findOne: jest.fn(),
    create: jest.fn()  // Add this line if create is a method you need to control
}));

// UNIT TESTS FOR AUTH/REGISTER
describe('POST /auth/register', () => {
    it('should register a new user', async () => {
      const newUser = { email: 'xyz@umass.edu', password: 'testpassword', confirmPassword: 'testpassword'};
  
      const res = await request(app)
        .post('/auth/register')
        .send(newUser);
  
      expect(res.statusCode).toEqual(201);

    });

    it('should return 400 if passwords do not match', async () => {
        const newUser = {
            email: 'gg@umass.edu',
            password: 'testpassword',
            confirmPassword: 'differentpassword'
        };

        const res = await request(app)
            .post('/auth/register')
            .send(newUser);

        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Passwords do not match.');
    });

    it('should return 400 if email does not end with "@umass.edu"', async () => {
        const newUser = {
            email: 'ggg@gmail.com',
            password: 'testpassword',
            confirmPassword: 'testpassword'
        };

        const res = await request(app)
            .post('/auth/register')
            .send(newUser);

        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Email must be a valid UMass email.');
    });

    it('should return 400 if the email is already registered', async () => {
        const newUser = {
            email: 'alreadyregistered@umass.edu',
            password: 'testpassword',
            confirmPassword: 'testpassword'
        };

        // Pre-create user or mock the database response
        await Login.create({
            email: 'alreadyregistered@umass.edu',
            saltedPasswordHash: 'fakehash'
        });

        const res = await request(app)
            .post('/auth/register')
            .send(newUser);

        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Email already registered');
    });
  });


// UNIT TESTS FOR AUTH/LOGIN
jest.mock('./models/login', () => ({
    findOne: jest.fn()
  }));
  const { findOne } = require('./models/login');
  
  jest.mock('bcrypt', () => ({
    compare: jest.fn()
  }));
  
  jest.mock('jsonwebtoken', () => ({
    sign: jest.fn()
  }));

  describe('POST /login', () => {
    beforeEach(() => {
      findOne.mockClear();
      bcrypt.compare.mockClear();
      jwt.sign.mockClear();
    });
  
    it('should return 401 if user does not exist', async () => {
      findOne.mockResolvedValue(null);
  
      const res = await request(app)
        .post('/auth/login')
        .send({ email: 'nonexistent@user.com', password: 'password123' });
  
      expect(res.status).toBe(401);
      expect(res.body.message).toBe('Invalid email or password');
    });
  
    it('should return 401 if password is incorrect', async () => {
      findOne.mockResolvedValue({
        email: 'a@umass.edu',
        saltedPasswordHash: 'fake_hash'
      });
      bcrypt.compare.mockResolvedValue(false);
  
      const res = await request(app)
        .post('/auth/login')
        .send({ email: 'a@umass.edu', password: 'wrongpassword' });
  
      expect(res.status).toBe(401);
      expect(res.body.message).toBe('Invalid email or password');
    });
  
    it('should issue a token on successful login', async () => {
      findOne.mockResolvedValue({
        email: 'a@umass.edu',
        saltedPasswordHash: 'fake_hash'
      });
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue('fake_jwt_token');
  
      const res = await request(app)
        .post('/auth/login')
        .send({ email: 'a@umass.edu', password: 'testpassword' });
  
      expect(res.status).toBe(200);
      expect(res.body.token).toBe('fake_jwt_token');
    });
  
    it('should handle exceptions thrown during the process', async () => {
      findOne.mockRejectedValue(new Error('Database failure'));
  
      const res = await request(app)
        .post('/auth/login')
        .send({ email: 'a@umass.edu', password: 'testpassword' });
  
      expect(res.status).toBe(500);
      expect(res.body.message).toBe('Internal server error');
    });
  });


afterAll((done) => {
    mongoose.disconnect().then(() => server.close(done));  // Ensure mongoose disconnects first
});