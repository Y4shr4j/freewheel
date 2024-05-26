import blogModel from "../models/blogModel.js";
import fs from "fs";
import slugify from "slugify";

// Create blog
export const createBlogController = async (req, res) => {
  try {
    const { title, description, publishDate, publisherName } = req.fields;
    const { photo } = req.files;

    // Validation
    switch (true) {
      case !title:
        return res.status(500).send({ error: "Title is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !publishDate:
        return res.status(500).send({ error: "Publish Date is Required" });
      case !publisherName:
        return res.status(500).send({ error: "Publisher Name is Required" }); // Validate publisherName
      case photo && photo.size > 2000000:
        return res.status(500).send({ error: "Photo should be less than 1MB" });
    }

    const blog = new blogModel({
      ...req.fields,
      slug: slugify(title),
    });

    if (photo) {
      blog.photo.data = fs.readFileSync(photo.path);
      blog.photo.contentType = photo.type;
    }

    await blog.save();
    res.status(201).send({
      success: true,
      message: "Blog Created Successfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating blog",
    });
  }
};

// Get all blogs
export const getBlogController = async (req, res) => {
  try {
    const blogs = await blogModel.find({}).select("-photo").sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      countTotal: blogs.length,
      message: "All Blogs",
      blogs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting blogs",
      error: error.message,
    });
  }
};



// Get single blog
export const getSingleBlogController = async (req, res) => {
  try {
    const blog = await blogModel.findOne({ slug: req.params.slug }).select("-photo");
    res.status(200).send({
      success: true,
      message: "Single Blog Fetched",
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single blog",
      error,
    });
  }
};

// Get blog photo
export const blogPhotoController = async (req, res) => {
  try {
    const blog = await blogModel.findById(req.params.bid).select("photo");
    if (blog.photo.data) {
      res.set("Content-type", blog.photo.contentType);
      return res.status(200).send(blog.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting photo",
      error,
    });
  }
};



// Delete blog
export const deleteBlogController = async (req, res) => {
  try {
    await blogModel.findByIdAndDelete(req.params.bid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Blog Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting blog",
      error,
    });
  }
};

// Update blog
export const updateBlogController = async (req, res) => {
  try {
    const { name, title, description, publishDate } = req.fields;
    const { photo } = req.files;

    // Validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !title:
        return res.status(500).send({ error: "Title is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !publishDate:
        return res.status(500).send({ error: "Publish Date is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "Photo should be less than 1MB" });
    }

    const blog = await blogModel.findByIdAndUpdate(
      req.params.bid,
      { ...req.fields, slug: slugify(title) },
      { new: true }
    );

    if (photo) {
      blog.photo.data = fs.readFileSync(photo.path);
      blog.photo.contentType = photo.type;
    }

    await blog.save();
    res.status(201).send({
      success: true,
      message: "Blog Updated Successfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in updating blog",
    });
  }
};

// product count
export const blogCountController = async (req, res) => {
  try {
    const total = await blogModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};
