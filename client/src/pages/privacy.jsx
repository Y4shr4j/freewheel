import React from 'react';
import '../styles/privacy.css';


function Privacy() {
  return (
    <div className="privacy-container">
      <h1>Privacy Policy</h1>
      <p>
        This privacy policy explains how we collect, use, and share your personal
        information when you visit our website.
      </p>
      <h2>What information do we collect?</h2>
      <p>
        We collect the following information from you when you visit our website:
      </p>
      <ul>
        <li>Your name</li>
        <li>Your email address</li>
        <li>Your phone number</li>
        <li>Your IP address</li>
        <li>The pages you visit on our website</li>
      </ul>
      <h2>How do we use your information?</h2>
      <p>
        We use your information to provide you with the best possible experience
        on our website. We use your information to:
      </p>
      <ul>
        <li>Personalize your experience on our website</li>
        <li>Send you marketing emails</li>
        <li>Improve our website</li>
      </ul>
      <h2>How do we share your information?</h2>
      <p>
        We do not share your information with any third parties. We may share your
        information with our service providers, who help us provide our services
        to you. Our service providers are required to keep your information
        confidential.
      </p>
      <h2>Your choices</h2>
      <p>
        You have the following choices regarding your information:
      </p>
      <ul>
        <li>You can opt out of receiving marketing emails from us.</li>
        <li>You can request that we delete your information.</li>
      </ul>
      <h2>Contact us</h2>
      <p>
        If you have any questions about this privacy policy, please contact us at
        [email protected]
      </p>
    </div>
  );
}

export default Privacy;
