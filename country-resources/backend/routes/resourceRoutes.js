import express from "express";
import {
  getAllResources,
  getResourceById,
  createResource,
  updateResource,
  softDeleteResource
} from "../controllers/resourceController.js";

const router = express.Router();

router.get("/", getAllResources);
router.get("/:id", getResourceById);
router.post("/", createResource);
router.put("/:id", updateResource);
router.delete("/:id", softDeleteResource);

export default router;
