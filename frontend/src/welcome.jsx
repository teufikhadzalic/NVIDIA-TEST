import { Link } from "react-router-dom";
import "./welcome.css";

const Welcome = () => {
  return (
    <div className="welcome-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>
            Welcome to <span className="nvidia-text">NVIDIA</span>
          </h1>
          <p className="hero-description">
            Discover cutting-edge GPUs and gaming experiences that redefine performance.
          </p>
          <div className="cta-buttons">
            <Link to="/shop" className="cta-button primary">
              Shop Now
            </Link>
            <a href="#features" className="cta-button secondary">
              Learn More
            </a>
          </div>
        </div>
        <div className="hero-image">
          {/* Hapus elemen gambar */}
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section" id="features">
        <h2>Why Choose NVIDIA?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Unmatched Performance</h3>
            <p>Experience the power of the latest GPU technology.</p>
          </div>
          <div className="feature-card">
            <h3>Immersive Gaming</h3>
            <p>Enjoy ray tracing and AI-powered DLSS for next-gen gaming.</p>
          </div>
          <div className="feature-card">
            <h3>Professional Tools</h3>
            <p>Empower creators with industry-leading hardware and software.</p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="contact-section" id="contact">
        <h2>Contact Us</h2>
        <p>Have questions? Reach out to us!</p>
        <p>Email: support@nvidia.com</p>
        <p>Phone: +1 800 123 4567</p>
      </div>
    </div>
  );
};

export default Welcome;