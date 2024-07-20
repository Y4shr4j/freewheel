import React from "react";
import "../../styles/our-member.css";
import { Link } from "react-router-dom";
import ava01 from "../../assets/all-images/y.jpeg";
import ava02 from "../../assets/all-images/s.jpeg";

const OUR_MEMBERS = [
  {
    name: "Yash Raj",
    fbUrl: "https://www.facebook.com/profile.php?id=100085257384998",
    instUrl: "https://www.instagram.com/yashra4j/",
    linkedinUrl: "https://www.linkedin.com/in/yashra4j/",
    twitUrl: "https://x.com/YashRa4j",
    imgUrl: ava01,
  }, 
  {
    name: "Shreya Maurya",
    fbUrl: "https://www.facebook.com/profile.php?id=100076179082075 ",
    instUrl: "https://www.instagram.com/shrvi0239/",
    twitUrl: "https://x.com/ShrVi_0239 ",
    linkedinUrl: "https://www.linkedin.com/in/shreya-maurya-657b42226/ ",
    imgUrl: ava02,
  }
];

const OurMembers = () => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        {OUR_MEMBERS.map((item, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="single__member">
              <div className="single__member-img">
                <img src={item.imgUrl} alt={item.name} className="img-fluid rounded-circle" />
                <div className="single__member-social">
                  <Link to={item.fbUrl}>
                    <i className="ri-facebook-line"></i>
                  </Link>
                  <Link to={item.twitUrl}>
                    <i className="ri-twitter-line"></i>
                  </Link>
                  <Link to={item.linkedinUrl}>
                    <i className="ri-linkedin-line"></i>
                  </Link>
                  <Link to={item.instUrl}>
                    <i className="ri-instagram-line"></i>
                  </Link>
                </div>
              </div>
              <h6 className="text-center mb-0 mt-3">{item.name}</h6>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurMembers;
