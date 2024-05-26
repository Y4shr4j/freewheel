import React, { useState, useEffect } from 'react';
import AdminMenu from "../../components/Layout/AdminMenu";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  // Get all blogs
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("/api/v1/blog/get-blog");
      setBlogs(data.blogs);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  // Delete blog
  const deleteBlog = async (id) => {
    try {
      await axios.delete(`/api/v1/blog/delete-blog/${id}`);
      toast.success("Blog deleted successfully");
      setBlogs(blogs.filter(blog => blog._id !== id));
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete blog");
    }
  };

  // Lifecycle method
  useEffect(() => {
    getAllBlogs();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
    //   if (window.confirm("This action cannot be undone. Do you really want to delete?")) {
        deleteBlog(id);
    //   }
    }
  };

  return (
    <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center mb-4">Blog Lists</h1>
          <div className="row">
            {blogs?.map((p) => (
              <div key={p._id} className="col-md-4 col-lg-3 mb-4 d-flex align-items-stretch">
                <Link to={`/blog/${p.slug}`} className="blog-link w-100">
                  <div className="card m-2 shadow-sm" style={{ width: '100%' }}>
                    <img
                      src={`/api/v1/blog/blog-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{p.title}</h5>
                      <p className="card-text">{p.description.substring(0, 34)}...</p>
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          handleDelete(p._id);
                        }} 
                        className="btn btn-danger mt-2"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blogs;
