const supertest = require("supertest");
const app = require("../routes/routes")

const messageSuccess = require("../messages/successToast");

describe("Testes de controladores utils", () => {
    const request = supertest(app);

  it("Está rodando a api",  async () => {
  const response = await request.get("/wakeup")

  expect(response.statusCode).toBe(200)
  expect(response.body).toMatch(messageSuccess.welcome)
  });
});