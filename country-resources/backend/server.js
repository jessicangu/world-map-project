import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import resourceRoutes from "./routes/resourceRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/resources", resourceRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("connected to MongoDB:", mongoose.connection.db.databaseName);
  app.listen(PORT, () => console.log(`server running on port ${PORT}`));
})
.catch((err) => {
  console.error("connection error:", err);
});
