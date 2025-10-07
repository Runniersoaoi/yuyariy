// app.js
import express from "express";
import cors from "cors";
import groupNoticeRoutes from "./routes/groupNoticeRoutes.js";

const app = express();
app.use(cors({ origin: "https://yuyariy-frontend-production.up.railway.app" }));
app.use("/groupnotices", groupNoticeRoutes);

export default app;
