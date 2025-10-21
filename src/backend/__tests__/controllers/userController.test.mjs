import { jest, test, expect } from "@jest/globals";

jest.unstable_mockModule("../../models/userModel.js", () => ({
  createTraditionalUser: jest.fn(),
  validateTraditionalLogin: jest.fn(),
  getAllUsers: jest.fn(),
  getUserByEmail: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
  createUser: jest.fn(),
}));

const {
  registerUser,
  loginUser,
  getUsers,
  getUser,
  editUser,
  removeUser,
} = await import("../../controllers/userController.js");

const userModel = await import("../../models/userModel.js");

function mockRes() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

describe("🧪 User Controller Tests", () => {
  test("✅ Registro de usuario tradicional exitoso", async () => {
    userModel.createTraditionalUser.mockResolvedValueOnce({
      id: 1,
      name: "Lucía",
      email: "lucia@example.com",
    });

    const req = {
      body: { name: "Lucía", email: "lucia@example.com", password: "123456" },
    };
    const res = mockRes();

    await registerUser(req, res);

    expect(userModel.createTraditionalUser).toHaveBeenCalledWith({
      name: "Lucía",
      email: "lucia@example.com",
      password: "123456",
    });
    expect(res.json).toHaveBeenCalledWith({
      message: "Usuario registrado exitosamente",
      user: {
        id: 1,
        name: "Lucía",
        email: "lucia@example.com",
      },
    });
  });

  test("❌ Registro falla por falta de datos", async () => {
    const req = { body: { email: "", password: "" } };
    const res = mockRes();

    await registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Faltan datos" });
  });

  test("✅ Login tradicional exitoso", async () => {
    userModel.validateTraditionalLogin.mockResolvedValueOnce({
      name: "Matías",
      email: "matias@example.com",
    });

    const req = {
      body: { email: "matias@example.com", password: "123456" },
    };
    const res = mockRes();

    await loginUser(req, res);

    expect(userModel.validateTraditionalLogin).toHaveBeenCalledWith(
      "matias@example.com",
      "123456"
    );
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        user: expect.objectContaining({ email: "matias@example.com" }),
        token: expect.any(String),
      })
    );
  });

  test("❌ Login tradicional falla", async () => {
    userModel.validateTraditionalLogin.mockRejectedValueOnce(
      new Error("Credenciales inválidas")
    );

    const req = {
      body: { email: "matias@example.com", password: "wrong" },
    };
    const res = mockRes();

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Credenciales inválidas" });
  });

  test("✅ Obtener todos los usuarios", async () => {
    userModel.getAllUsers.mockResolvedValueOnce([
      { id: 1, name: "Matías" },
      { id: 2, name: "Lucía" },
    ]);

    const res = mockRes();
    await getUsers({}, res);

    expect(res.json).toHaveBeenCalledWith([
      { id: 1, name: "Matías" },
      { id: 2, name: "Lucía" },
    ]);
  });

  test("✅ Obtener un usuario por email", async () => {
    userModel.getUserByEmail.mockResolvedValueOnce({
      name: "Matías",
      email: "matias@example.com",
    });

    const req = { params: { email: "matias@example.com" } };
    const res = mockRes();

    await getUser(req, res);

    expect(userModel.getUserByEmail).toHaveBeenCalledWith("matias@example.com");
    expect(res.json).toHaveBeenCalledWith({
      name: "Matías",
      email: "matias@example.com",
    });
  });

  test("❌ Usuario no encontrado", async () => {
    userModel.getUserByEmail.mockResolvedValueOnce(null);

    const req = { params: { email: "noexiste@example.com" } };
    const res = mockRes();

    await getUser(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Usuario no encontrado" });
  });

  test("✅ Editar usuario", async () => {
    userModel.updateUser.mockResolvedValueOnce({ updated: true });

    const req = { params: { email: "lucia@example.com" }, body: { name: "Luz" } };
    const res = mockRes();

    await editUser(req, res);

    expect(userModel.updateUser).toHaveBeenCalledWith("lucia@example.com", {
      name: "Luz",
    });
    expect(res.json).toHaveBeenCalledWith({ updated: true });
  });

  test("✅ Eliminar usuario", async () => {
    userModel.deleteUser.mockResolvedValueOnce({ deleted: true });

    const req = { params: { email: "lucia@example.com" } };
    const res = mockRes();

    await removeUser(req, res);

    expect(userModel.deleteUser).toHaveBeenCalledWith("lucia@example.com");
    expect(res.json).toHaveBeenCalledWith({ deleted: true });
  });
});
