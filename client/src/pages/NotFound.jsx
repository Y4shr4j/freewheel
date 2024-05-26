import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return(
    <div className="pnf">
      <h1 className="pnf-title">404</h1>
      <h2 className="pnf-heading">NOT FOUND</h2>
      <Link to="/" className="pnf-button">Go Back</Link>
    </div>
  ); 
};

export default NotFound;
