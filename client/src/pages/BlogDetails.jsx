import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Helmet from "../components/Helmet/Helmet";

const BlogDetails = () => {
  const params = useParams();
  const [blog, setBlog] = useState(null);

  // Fetch blog details
  useEffect(() => {
    const getBlog = async () => {
      try {
        const { data } = await axios.get(`/api/v1/blog/get-blog/${params.slug}`);
        setBlog(data?.blog);
      } catch (error) {
        console.log(error);
      }
    };

    if (params?.slug) {
      getBlog();
    }
  }, [params?.slug]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <Helmet title={blog.title}>
  <div className="container mt-4">
    <div className="row justify-content-center">
      <div className="col-md-8">
        <h1 className="mb-4">{blog.title}</h1>
        {/* Align publishDate and publisherName on the same line */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <p className="text-muted mb-0">
            Published on: {new Date(blog.publishDate).toLocaleDateString()}
          </p>
          <p className="text-muted mb-0">
            Published by: {blog.publisherName}
          </p>
        </div>
        <img
          src={`/api/v1/blog/blog-photo/${blog._id}`}
          alt={blog.title}
          className="img-fluid mb-4"
          style={{ width: "100%", height: "auto" }}
        />
        <div className="blog-description mb-4">
          {blog.description}
        </div>
      </div>
    </div>
  </div>
</Helmet>

  

  );
};

export default BlogDetails;
