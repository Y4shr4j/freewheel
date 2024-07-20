import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("https://freewheel-emmm.onrender.com/api/v1/blog/get-blog");
      setBlogs(response.data.blogs || []);  // Ensure blogs is set to an array
      setTotal(response.data.total || 0);   // Ensure total is set properly
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <Helmet title="Blogs">
      <CommonSection title="Blogs" showButton={true} />
      <div className="container mt-4">
        <div className="row">
          <div className="col-12">
            <div className="row">
              {blogs.length > 0 ? (
                blogs.map((b) => (
                  <div className="col-md-3 col-sm-6" key={b._id}>
                    <div className="card m-2" style={{ width: "100%" }}>
                      <img
                        src={`https://freewheel-emmm.onrender.com/api/v1/blog/blog-photo/${b._id}`}
                        className="card-img-top"
                        alt={b.name}
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{b.title}</h5>
                        <div className="d-flex justify-content-between align-items-center">
                          <Link to={`/blog/${b.slug}`} className="btn ">
                            Read More
                          </Link>
                          <p className="card-text mb-0">{new Date(b.publishDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No blogs available</p>
              )}
            </div>
            {blogs && blogs.length < total && (
              <div className="text-center mt-4">
                <button
                  className="btn btn-primary loadmore"
                  onClick={(e) => {
                    e.preventDefault();
                    // loadMore();
                  }}
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default HomePage;
