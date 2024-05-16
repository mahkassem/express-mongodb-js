const request = require("supertest");
const app = require("../app.js");

describe("Authentication Test", () => {
  it("Should return 200 on successful login", () => {
    return request(app)
      .post("/api/login")
      .send({
        username: "mahmoud",
        password: "mypassword",
      })
  });
});