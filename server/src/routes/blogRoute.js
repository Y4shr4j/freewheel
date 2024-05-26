import express from "express";
import {
  createBlogController,
  updateBlogController,
  getBlogController,
  getSingleBlogController,
  deleteBlogController,
  blogPhotoController,
  // searchBlogController,
} from "../controllers/blogController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

// Create blog
router.post(
  "/create-blog",
  requireSignIn,
  formidable(),
  createBlogController
);

// Update blog
router.put(
  "/update-blog/:bid",
  requireSignIn,
  formidable(),
  updateBlogController
);

// Get all blogs
router.get("/get-blog", getBlogController);

// Get single blog
router.get("/get-blog/:slug", getSingleBlogController);

// Delete blog
router.delete("/delete-blog/:bid", requireSignIn, deleteBlogController);

//get photo
router.get("/blog-photo/:bid", blogPhotoController);

export default router;
