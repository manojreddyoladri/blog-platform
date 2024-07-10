import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';

const LandingPage = () => (
  <div className="landing-page">
    <div className="overlay">
      <h1>Welcome to blogIT</h1>
      <p>Your go-to platform for writing and reading blogs.</p>
      <Link to="/login" className="login-button">Sign In</Link>
    </div>
  </div>
);

export default LandingPage;
