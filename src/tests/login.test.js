import supertest from "supertest";
import app from "../app";

describe('POST /api/login', () => {
  let server;

  beforeAll(() => {
    server = app.listen(0); // 0 for dynamic port
  });

  afterAll(async () => {
    await server.close();
  });

  it('should return a 200 status and JWT token on successful login', async () => {
    const credentials = {
      username: 'mahmoud',
      password: 'mypassword',
    };

    const response = await supertest(server)
      .post('/api/auth/login')
      .send(credentials)
      .expect(200); // OK

    expect(response.body).toHaveProperty('token'); // Assuming your API returns a token
    expect(response.body.token).toBeTruthy(); // Token should not be empty
  });

  it('should return a 401 worng credntials', async () => {
    const credentials = {
      username: 'mahmoud',
      password: 'wrongpassword',
    };

    return await supertest(server)
      .post('/api/auth/login')
      .send(credentials)
      .expect(401); // Unauthorized
  });
});