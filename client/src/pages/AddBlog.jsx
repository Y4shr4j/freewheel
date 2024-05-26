import React, { useState } from 'react';
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateBlog() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState("");
  const [description, setDescription] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [publisherName, setPublisherName] = useState(""); // New state for publisher name

  //create blog function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const blogData = new FormData();
      blogData.append("title", title);
      blogData.append("description", description);
      blogData.append("publishDate", publishDate);
      blogData.append("publisherName", publisherName); // Append publisher name to FormData
      blogData.append("photo", photo);
      const { data } = await axios.post("/api/v1/blog/create-blog", blogData);
      if (data?.success) {
        toast.success(`Blog "${title}" created successfully`);
        navigate("/blog");
      } else {
        toast.error(data?.message || "Failed to create blog. Please try again.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to create blog. Please try again later.");
    }
  };

  return (
    <div className="container-fluid my-3 p-3">
      <h1 className="text-center mb-4">Create Blog</h1>
      <div className="mx-auto w-75">
        {/* Form */}
        <form onSubmit={handleCreate}>
          {/* Title */}
          <div className="mb-3">
            <input
              type="text"
              value={title}
              placeholder="Write a Title"
              className="form-control"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          {/* Photo */}
          <div className="mb-3">
            <label className="btn btn-outline-secondary col-md-12">
              {photo ? photo.name : "Upload Photo"}
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                hidden
              />
            </label>
          </div>
          {/* <h5>photo should be less than 4mb</h5> */}
          {photo && (
            <div className="mb-3 text-center">
              <img
                src={URL.createObjectURL(photo)}
                alt="product_photo"
                height={"200px"}
                className="img-fluid img-thumbnail"
              />
            </div>
          )}
          {/* Description */}
          <div className="mb-3">
            <textarea
              type="text"
              value={description}
              placeholder="Write a Description"
              className="form-control"
              onChange={(e) => setDescription(e.target.value)}
              rows="5"
            />
          </div>
          {/* Publisher Name */}
          <div className="mb-3">
            <input
              type="text"
              value={publisherName}
              placeholder="Enter Publisher Name"
              className="form-control"
              onChange={(e) => setPublisherName(e.target.value)}
            />
          </div>
          {/* Publish Date */}
          <div className="mb-3">
            <label>Publish Date:</label>
            <input
              type="date"
              value={publishDate}
              className="form-control"
              onChange={(e) => setPublishDate(e.target.value)}
            />
          </div>
          {/* Submit Button */}
          <div className="mb-3 text-center">
            <button type="submit" className="btn btn-primary">
              ADD BLOG
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateBlog;
