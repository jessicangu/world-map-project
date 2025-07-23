import express from "express";
import Resource from "../models/Resource.js";

const router = express.Router();


router.get("/", async (req, res) => {
  const country = req.query.country?.trim();
  console.log("Query param country:", country);

  try {
    const resources = await Resource.find({
      country: { $regex: new RegExp(`^${country}$`, 'i') }
    });
    console.log("Resources found:", resources);
    res.json(resources);
  } catch (err) {
    console.error("❌ Error fetching resources:", err);
    res.status(500).json({ error: "Server error" });
  }
});




// POST /api/resources
router.post("/", async (req, res) => {
  try {
    const newResource = new Resource(req.body);
    await newResource.save();
    res.status(201).json(newResource);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
