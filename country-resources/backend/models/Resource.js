import mongoose from "mongoose";

const ResourceSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    index: true
  },
  category: {
    type: String,
    enum: ['legal', 'food', 'education', 'shelter', 'medical', 'safety'],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: String,
  website: String,
  verified: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date,
  isDeleted: {
    type: Boolean,
    default: false
  }
});

const Resource = mongoose.model("Resource", ResourceSchema);
export default Resource;
