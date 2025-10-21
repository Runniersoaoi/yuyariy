// config/db.js
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME || "TU_DB";

let db;
let client;

export async function connectDB() {
  if (db) return db;

  try {
    client = new MongoClient(MONGO_URI, {
      tls: true,
      tlsAllowInvalidCertificates: true,
    });
    await client.connect();
    db = client.db(DB_NAME);
    console.log("✅ Conectado a MongoDB");
    return db;
  } catch (err) {
    console.error("❌ Error al conectar a Mongo:", err);
    throw err;
  }
}

export function getDB() {
  if (!db) {
    throw new Error("❌ La base de datos no está conectada aún");
  }
  return db;
}
