import React from "react";
import HeroSlider from "../components/UI/HeroSlider";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import FindCarForm from "../components/UI/FindCarForm";
import AboutSection from "../components/UI/AboutSection";
import ServicesList from "../components/UI/ServicesList";
import '../styles/hero-slider.css';

const Home = () => {
  return (
    <Helmet title="Home">
      <section className="p-0 hero__slider-section rounded">
        <div className="hero__slider">
          <HeroSlider />
        </div>
        <div className="hero__form">
          <Container>
              <div className="find__car-form">
                <FindCarForm />
              </div>
             
          </Container>
        </div>
      </section>

      <AboutSection />

      <section className="mt-4">
        <Container>
          <Row>
            <Col lg="12" className="mb-3 text-center">
              <h6 className="section__subtitle">See Our</h6>
              <h2 className="section__title">Popular Services</h2>
            </Col>
            <ServicesList />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
