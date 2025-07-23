import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import resourceRoutes from "./routes/resourceRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/resources", resourceRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("mongoDB connection error:", err);
  });

  mongoose.connection.once("open", () => {
  console.log("✅ Connected to MongoDB:", mongoose.connection.name);
});
