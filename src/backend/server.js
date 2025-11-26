// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());

const PORT = process.env.PORT || 3001;
const COLLECTION_NAME = process.env.COLLECTION_NAME || "groupnotice";

app.use("/users", userRoutes);

app.get("/groupnotices", async (req, res) => {
  try {
    const db = req.app.locals.db;
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
    const db = req.app.locals.db;
    const { cluster } = req.params;
    const collection = db.collection(COLLECTION_NAME);
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

app.get("/groupnotices/category/:category", async (req, res) => {
  try {
    const db = req.app.locals.db;
    const { category } = req.params;
    const collection = db.collection(COLLECTION_NAME);
    const docs = await collection
      .find({
        $expr: { $eq: [{ $arrayElemAt: ["$elementos.category", 0] }, category] },
      })
      .toArray();

    if (!docs || docs.length === 0) {
      return res.status(404).json({ message: `No se encontraron documentos para la categoria ${cluster}` });
    }

    res.json(docs);
  } catch (err) {
    console.error("❌ Error al obtener documentos por categoria:", err);
    res.status(500).json({ error: "Error al obtener documentos" });
  }
});

connectDB()
  .then((db) => {
    app.locals.db = db;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error crítico al iniciar el servidor:", err);
  });
