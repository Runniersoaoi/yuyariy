// server.js
import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors"

dotenv.config();

const app = express()
app.use(cors())
app.use(cors({
  origin: "https://yuyariy-frontend-production.up.railway.app/"
}))
const PORT = process.env.PORT || 3001;

// ===== CONFIG MONGO =====
const MONGO_URI = process.env.MONGO_URI; // tu cadena de conexión
const DB_NAME = process.env.DB_NAME || "TU_DB";
const COLLECTION_NAME = process.env.COLLECTION_NAME || "groupnotice";

// ===== CONEXIÓN MONGO =====
let db;
async function connectDB() {
  try {
    const client = new MongoClient(MONGO_URI, {
      tls: true,
      tlsAllowInvalidCertificates: true, // opcional
    });
    await client.connect();
    db = client.db(DB_NAME);
    console.log("✅ Conectado a MongoDB");
  } catch (err) {
    console.error("❌ Error al conectar a Mongo:", err);
    process.exit(1);
  }
}

// ===== RUTA API =====
app.get("/groupnotices", async (req, res) => {
  try {
    const collection = db.collection(COLLECTION_NAME);
    const docs = await collection.find({}).toArray();
    res.json(docs);
  } catch (err) {
    console.error("❌ Error al obtener documentos:", err);
    res.status(500).json({ error: "Error al obtener documentos" });
  }
});

app.get("/groupnotices/:cluster", async (req, res) => {
  try {
    const { cluster } = req.params;
    const collection = db.collection(COLLECTION_NAME);

    // El campo cluster es numérico, convertimos el param
    const docs = await collection.find({ cluster: Number(cluster) }).toArray();

    if (!docs || docs.length === 0) {
      return res.status(404).json({ message: `No se encontraron documentos para el cluster ${cluster}` });
    }

    res.json(docs);
  } catch (err) {
    console.error("❌ Error al obtener documentos por cluster:", err);
    res.status(500).json({ error: "Error al obtener documentos" });
  }
});

// ===== START SERVER =====
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
});
