import * as request from 'supertest';
import app from '../index' // Import your Express app instance

describe('GET /users', () => {
  it('should respond with JSON and 200 status', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
  });
});
