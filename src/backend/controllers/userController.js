import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import {
  createUser,
  getUserByEmail,
  getAllUsers,
  updateUser,
  deleteUser,
  createTraditionalUser,
  validateTraditionalLogin,
} from "../models/userModel.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const JWT_SECRET = process.env.JWT_SECRET || "clave_super_segura";

export async function googleLogin(req, res) {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    let user = await getUserByEmail(email);
    if (!user) {
      await createUser({ email, name, picture, authType: "google", createdAt: new Date() });
      user = await getUserByEmail(email);
    }

    const appToken = jwt.sign({ email, name }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token: appToken, user });
  } catch (err) {
    console.error("❌ Error en login con Google:", err);
    res.status(400).json({ error: "Token inválido o error en autenticación" });
  }
}

export async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Faltan datos" });

    const user = await createTraditionalUser({ name, email, password });
    res.json({ message: "Usuario registrado exitosamente", user });
  } catch (err) {
    console.error("❌ Error en registro:", err.message);
    res.status(400).json({ error: err.message });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await validateTraditionalLogin(email, password);

    const token = jwt.sign({ email, name: user.name }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user });
  } catch (err) {
    console.error("❌ Error en login:", err.message);
    res.status(401).json({ error: err.message });
  }
}

export async function getUsers(req, res) {
  const users = await getAllUsers();
  res.json(users);
}

export async function getUser(req, res) {
  const { email } = req.params;
  const user = await getUserByEmail(email);
  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
  res.json(user);
}

export async function editUser(req, res) {
  const { email } = req.params;
  const updates = req.body;
  const result = await updateUser(email, updates);
  res.json(result);
}

export async function removeUser(req, res) {
  const { email } = req.params;
  const result = await deleteUser(email);
  res.json(result);
}
