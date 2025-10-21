// __tests__/routes/userRoutes.test.mjs
import request from "supertest";
import express from "express";
import { jest, test, expect } from '@jest/globals';

jest.unstable_mockModule("../../controllers/userController.js", () => ({
  googleLogin: jest.fn((req, res) => res.json({ message: "Google login" })),
  registerUser: jest.fn((req, res) => res.json({ message: "User registered" })),
  loginUser: jest.fn((req, res) => res.json({ message: "User logged in" })),
  getUsers: jest.fn((req, res) => res.json([{ email: "test@example.com" }])),
  getUser: jest.fn((req, res) => res.json({ email: req.params.email })),
  editUser: jest.fn((req, res) =>
    res.json({ email: req.params.email, updated: true })
  ),
  removeUser: jest.fn((req, res) =>
    res.json({ email: req.params.email, deleted: true })
  ),
}));

const { default: userRoutes } = await import("../../routes/userRoutes.js");

describe("🧪 User Routes", () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use("/users", userRoutes);
  });

  test("POST /users/auth/google -> Google login", async () => {
    const res = await request(app).post("/users/auth/google");
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Google login");
  });

  test("POST /users/auth/register -> Register user", async () => {
    const res = await request(app)
      .post("/users/auth/register")
      .send({ email: "user@test.com", password: "1234" });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("User registered");
  });

  test("POST /users/auth/login -> Login user", async () => {
    const res = await request(app)
      .post("/users/auth/login")
      .send({ email: "user@test.com", password: "1234" });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("User logged in");
  });

  test("GET /users -> Get all users", async () => {
    const res = await request(app).get("/users");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("GET /users/:email -> Get one user", async () => {
    const res = await request(app).get("/users/test@example.com");
    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe("test@example.com");
  });

  test("PUT /users/:email -> Edit user", async () => {
    const res = await request(app)
      .put("/users/test@example.com")
      .send({ name: "Nuevo Nombre" });
    expect(res.statusCode).toBe(200);
    expect(res.body.updated).toBe(true);
  });

  test("DELETE /users/:email -> Remove user", async () => {
    const res = await request(app).delete("/users/test@example.com");
    expect(res.statusCode).toBe(200);
    expect(res.body.deleted).toBe(true);
  });
});
