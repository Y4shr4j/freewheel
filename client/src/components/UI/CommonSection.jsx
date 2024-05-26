import React from "react";
import { Container } from "reactstrap";
import { Link } from "react-router-dom"; 
import "../../styles/common-section.css";

const CommonSection = ({ title, showButton }) => {
  return (
    <section className="common__section mb-5">
      <Container className="text-center">
        <h1 className="text-light">{title}</h1>
        {showButton && ( // Render button only if showButton is true
          <Link to="/addBlog" className="btn btn-primary">Create Blog</Link>
        )}
      </Container>
    </section>
  );
};
export default CommonSection;
