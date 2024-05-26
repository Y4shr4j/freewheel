import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";


const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [total] = useState(0);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("/api/v1/blog/get-blog");
      setBlogs(response.data.blogs);
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
              {blogs.map((b) => (
                <div className="col-md-3 col-sm-6" key={b._id}>
                  <div className="card m-2" style={{ width: "100%" }}>
                    <img
                      src={`/api/v1/blog/blog-photo/${b._id}`}
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
              ))}
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
                  
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      </Helmet>  );
};

export default HomePage;
