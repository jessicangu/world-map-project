import Resource from "../models/Resource.js";

export const getAllResources = async (req, res) => {
  try {
    const { country, category } = req.query;
    const filter = { isDeleted: false };
    if (country) filter.country = country;
    if (category) filter.category = category;

    const resources = await Resource.find(filter).sort({ verified: -1, createdAt: -1 });
    res.json(resources);
  } catch (err) {
    res.status(500).json({ error: "server error" });
  }
};

export const getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource || resource.isDeleted)
      return res.status(404).json({ error: "not found" });
    res.json(resource);
  } catch (err) {
    res.status(500).json({ error: "server error" });
  }
};

export const createResource = async (req, res) => {
  try {
    // haven't implemented auth quite yet
    // const data = { ...req.body, createdBy: req.user._id };
    const data = req.body;
    const newResource = new Resource(data);
    await newResource.save();
    res.status(201).json(newResource);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateResource = async (req, res) => {
  try {
    const updated = await Resource.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const softDeleteResource = async (req, res) => {
  try {
    await Resource.findByIdAndUpdate(req.params.id, { isDeleted: true });
    res.json({ message: "resource deleted (soft)" });
  } catch (err) {
    res.status(500).json({ error: "server error" });
  }
};
