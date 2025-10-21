import { jest, describe, test, expect, beforeEach } from "@jest/globals";

jest.unstable_mockModule("../../config/db.js", () => ({
  getDB: jest.fn(),
}));

jest.unstable_mockModule("bcrypt", () => ({
  default: {
    hash: jest.fn(),
    compare: jest.fn(),
  },
}));

const {
  createUser,
  getUserByEmail,
  getAllUsers,
  updateUser,
  deleteUser,
  createTraditionalUser,
  validateTraditionalLogin,
} = await import("../../models/userModel.js");

const { getDB } = await import("../../config/db.js");
const { default: bcrypt } = await import("bcrypt");

function mockCollection() {
  return {
    insertOne: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(() => ({ toArray: jest.fn() })),
    updateOne: jest.fn(),
    deleteOne: jest.fn(),
  };
}

let mockDb;
let mockCol;

beforeEach(() => {
  mockCol = mockCollection();
  mockDb = { collection: jest.fn(() => mockCol) };
  getDB.mockReturnValue(mockDb);
  jest.clearAllMocks();
});

describe("🧩 userModel.js", () => {
  test("✅ createUser inserta un usuario correctamente", async () => {
    const userData = { name: "Lucía" };
    await createUser(userData);

    expect(mockDb.collection).toHaveBeenCalled();
    expect(mockCol.insertOne).toHaveBeenCalledWith(userData);
  });

  test("✅ getUserByEmail obtiene un usuario por email", async () => {
    mockCol.findOne.mockResolvedValueOnce({ email: "lucia@example.com" });
    const user = await getUserByEmail("lucia@example.com");

    expect(mockCol.findOne).toHaveBeenCalledWith({ email: "lucia@example.com" });
    expect(user).toEqual({ email: "lucia@example.com" });
  });

  test("✅ getAllUsers obtiene todos los usuarios", async () => {
    const fakeArray = [{ name: "Lucía" }, { name: "Matías" }];
    mockCol.find.mockReturnValueOnce({ toArray: jest.fn().mockResolvedValue(fakeArray) });

    const users = await getAllUsers();

    expect(mockCol.find).toHaveBeenCalledWith({});
    expect(users).toEqual(fakeArray);
  });

  test("✅ updateUser actualiza correctamente un usuario", async () => {
    await updateUser("lucia@example.com", { name: "Luz" });

    expect(mockCol.updateOne).toHaveBeenCalledWith(
      { email: "lucia@example.com" },
      { $set: { name: "Luz" } }
    );
  });

  test("✅ deleteUser elimina un usuario", async () => {
    await deleteUser("lucia@example.com");

    expect(mockCol.deleteOne).toHaveBeenCalledWith({ email: "lucia@example.com" });
  });

  test("✅ createTraditionalUser crea usuario con contraseña encriptada", async () => {
    mockCol.findOne.mockResolvedValueOnce(null);
    bcrypt.hash.mockResolvedValueOnce("hashed123");
    mockCol.insertOne.mockResolvedValueOnce({ insertedId: "123" });

    const result = await createTraditionalUser({
      name: "Lucía",
      email: "lucia@example.com",
      password: "123456",
    });

    expect(bcrypt.hash).toHaveBeenCalledWith("123456", 10);
    expect(mockCol.insertOne).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Lucía",
        email: "lucia@example.com",
        password: "hashed123",
        authType: "local",
      })
    );
    expect(result).toMatchObject({
      name: "Lucía",
      email: "lucia@example.com",
      password: "hashed123",
    });
  });

  test("❌ createTraditionalUser lanza error si el usuario ya existe", async () => {
    mockCol.findOne.mockResolvedValueOnce({ email: "lucia@example.com" });

    await expect(
      createTraditionalUser({
        name: "Lucía",
        email: "lucia@example.com",
        password: "123456",
      })
    ).rejects.toThrow("El usuario ya existe");
  });

  test("✅ validateTraditionalLogin valida credenciales correctamente", async () => {
    mockCol.findOne.mockResolvedValueOnce({
      email: "lucia@example.com",
      password: "hashed123",
    });
    bcrypt.compare.mockResolvedValueOnce(true);

    const result = await validateTraditionalLogin("lucia@example.com", "123456");

    expect(mockCol.findOne).toHaveBeenCalledWith({ email: "lucia@example.com" });
    expect(bcrypt.compare).toHaveBeenCalledWith("123456", "hashed123");
    expect(result).toMatchObject({ email: "lucia@example.com" });
  });

  test("❌ validateTraditionalLogin lanza error si el usuario no existe", async () => {
    mockCol.findOne.mockResolvedValueOnce(null);

    await expect(
      validateTraditionalLogin("noexiste@example.com", "123")
    ).rejects.toThrow("Usuario no encontrado");
  });

  test("❌ validateTraditionalLogin lanza error si no tiene password (Google login)", async () => {
    mockCol.findOne.mockResolvedValueOnce({ email: "google@example.com" });

    await expect(
      validateTraditionalLogin("google@example.com", "123")
    ).rejects.toThrow("Este usuario se registró con Google");
  });

  test("❌ validateTraditionalLogin lanza error si la contraseña es incorrecta", async () => {
    mockCol.findOne.mockResolvedValueOnce({
      email: "lucia@example.com",
      password: "hashed123",
    });
    bcrypt.compare.mockResolvedValueOnce(false);

    await expect(
      validateTraditionalLogin("lucia@example.com", "wrong")
    ).rejects.toThrow("Contraseña incorrecta");
  });
});
