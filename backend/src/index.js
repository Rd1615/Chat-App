// const express = require("express");
// if you want like this import go to tha pakage.json and add Line "Type : 'module' "
import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app,server} from "./lib/socket.js";
import path from "path"
import { connectDB } from "./lib/db.js";

dotenv.config();
const PORT = process.env.PORT;
const __dirname = path.resolve();

// 🛠 Increase payload size limits (apply BEFORE routes)
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));
app.use(cookieParser());

// for api routes
app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT , () => {
    console.log(`server runing on ${PORT} `);
    connectDB()
})