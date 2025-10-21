import { getDB } from "../config/db.js";
import bcrypt from "bcrypt";

const COLLECTION_NAME = process.env.USER_COLLECTION || "users";

export async function createUser(userData) {
  const db = getDB();
  const collection = db.collection(COLLECTION_NAME);
  return await collection.insertOne(userData);
}

export async function getUserByEmail(email) {
  const db = getDB();
  const collection = db.collection(COLLECTION_NAME);
  return await collection.findOne({ email });
}

export async function getAllUsers() {
  const db = getDB();
  const collection = db.collection(COLLECTION_NAME);
  return await collection.find({}).toArray();
}

export async function updateUser(email, updates) {
  const db = getDB();
  const collection = db.collection(COLLECTION_NAME);
  return await collection.updateOne({ email }, { $set: updates });
}

export async function deleteUser(email) {
  const db = getDB();
  const collection = db.collection(COLLECTION_NAME);
  return await collection.deleteOne({ email });
}

export async function createTraditionalUser({ name, email, password }) {
  const db = getDB();
  const collection = db.collection(COLLECTION_NAME);

  const existingUser = await collection.findOne({ email });
  if (existingUser) throw new Error("El usuario ya existe");

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    name,
    email,
    password: hashedPassword,
    authType: "local",
    createdAt: new Date(),
  };

  await collection.insertOne(newUser);
  return newUser;
}

export async function validateTraditionalLogin(email, password) {
  const db = getDB();
  const collection = db.collection(COLLECTION_NAME);
  const user = await collection.findOne({ email });

  if (!user) throw new Error("Usuario no encontrado");
  if (!user.password) throw new Error("Este usuario se registró con Google");

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error("Contraseña incorrecta");

  return user;
}
