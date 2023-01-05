const usersService = require("../service/users");
const usersModelInMemory = require("../models/in-memory/usersModelInMenory");
const { users } = require("../database/in-memory/db");

describe("users controllers", () => {
  describe("verify email", () => {
    test("email accepted", async () => {
      const emailExists = await usersService.emailExists(
        usersModelInMemory,
        "test@email.com"
      );
      expect(emailExists).toBeFalsy();
    });

    test("email exists", async () => {
      const emailExists = await usersService.emailExists(
        usersModelInMemory,
        "primeiro@email.com"
      );
      expect(emailExists).toBeTruthy();
    });
  });

  describe("create user", () => {
    test("Success", async () => {
      const newUser = {
        name: "Teste usuário",
        email: "teste@email.com",
        encryptedPassword: "senhasenha",
      };
      const user = await usersService.insertUser(usersModelInMemory, newUser);
      expect(user.name).toBe(newUser.name);
      expect(user.email).toBe(newUser.email);
      expect(user).toHaveProperty("id");
    });

    test("Error password", async () => {
      const newUser = {
        name: "Teste usuário",
        email: "teste@email.com",
      };
      const user = await usersService.insertUser(usersModelInMemory, newUser);
      expect(user.message).toBe("Não foi possível criar o usuário");
    });
  });

  describe("Update user", () => {
    test("Success", async () => {
      const updateUser = {
        id: users[users.length - 1].id,
        name: "Teste usuário Atualizado",
        cpf:"12345678998",
        phone:"12345678998",
      };
      const user = await usersService.updateUser(
        usersModelInMemory,
        updateUser
      );
      expect(user.name).toBe(updateUser.name);
    });

    test("Error sem id", async () => {
      const updateUser = {
        name: "Teste usuário",
      };
      const user = await usersService.updateUser(
        usersModelInMemory,
        updateUser
      );
      expect(user.message).toBe(
        "Não foi possível atualizar o usuário pois é necessário informar o id do usuário"
      );
    });

    test("Error sem infos", async () => {
      const updateUser = {
        id: users[users.length - 1].id,
      };
      const user = await usersService.updateUser(
        usersModelInMemory,
        updateUser
      );
      expect(user.message).toBe(
        "Não foi possível atualizar o usuário e necessário informar algum campo para ser alterado"
      );
    });
  });
});
