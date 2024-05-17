const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = require('./server');
app.use(bodyParser.json());
app.use(express.json());

let server;

beforeAll((done) => {
    server = app.listen(3000, done);
  });

// Mock middleware
jest.mock('./common/auth', () => ({
    verifyRequest: (req, res, next) => next() 
}));

// Import routes with mocked middleware
const router = require('./routes/clubRoute');
app.use('/clubs', router);

// Mock models
const Club = require('./models/club');
const User = require('./models/user');
jest.mock('./models/club');
jest.mock('./models/user');

describe('PUT /join', () => {
    it('should return 404 if club not found', async () => {
        Club.find.mockResolvedValue([]);
        
        const res = await request(app)
            .put('/club/join')
            .send({ clubId: '123', email: 'user@example.com' });
        
        expect(res.status).toBe(404);
        expect(res.body.message).toBe("Club not found");
    });

    it('should return 200 if user already a member of the club', async () => {
        Club.find.mockResolvedValue([{ _id: '123', members: ['456'] }]);
        User.find.mockResolvedValue([{ _id: '456', clubs: ['123'] }]);

        const res = await request(app)
            .put('/club/join')
            .send({ clubId: '123', email: 'user@example.com' });

        expect(res.status).toBe(200);
        expect(res.body.message).toBe("User already a member of this club");
    });

    it('should return JSON message on successful join', async () => {
        const mockClub = { _id: '123', members: [], save: jest.fn() };
        const mockUser = { _id: '456', clubs: [], save: jest.fn() };
        Club.find.mockResolvedValue([mockClub]);
        User.find.mockResolvedValue([mockUser]);

        const res = await request(app)
            .put('/club/join')
            .send({ clubId: '123', email: 'user@example.com' });

        expect(mockClub.members).toContain('456');
        expect(mockUser.clubs).toContain('123');
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Joined club successfully");
    });

    it('should handle exceptions thrown during the process', async () => {
        Club.find.mockImplementation(() => {
            throw new Error('Database failure');
        });

        const res = await request(app)
            .put('/club/join')
            .send({ clubId: 'failClub', email: 'user@example.com' });

        expect(res.status).toBe(500);
        expect(res.body.message).toBe("Database failure");
    });
});


afterAll((done) => {
    mongoose.disconnect().then(() => server.close(done));  
});