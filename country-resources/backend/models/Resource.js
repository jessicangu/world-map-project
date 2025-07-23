import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
  country: { type: String, required: true },
  category: { type: String, required: true }, // e.g. 'legal', 'shelter', 'food'
  name: { type: String, required: true },
  url: { type: String, required: true },
  description: { type: String },
  language: [String], // e.g. ['en', 'ar']
  verified: { type: Boolean, default: false }
}, { timestamps: true });

const Resource = mongoose.model("Resource", resourceSchema);
export default Resource;
