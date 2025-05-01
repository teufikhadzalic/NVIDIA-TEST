import "./about.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>
          About <span className="nvidia-text">NVIDIA</span>
        </h1>
        <p className="about-subtitle">Pioneering Accelerated Computing</p>
      </div>

      <div className="about-section">
        <h2>Our Story</h2>
        <p>
          NVIDIA is the result of the decades-long pursuit of a vision and the life’s work of our employees. The company is well
          known for the caliber of our people, who have worked together for a long time, and our determined and resilient
          culture that prioritizes our people. We are a company of NVIDIA pioneered accelerated computing to solve challenges no one else can. 
          Our work in AI and computer graphics is transforming industries valued at more than $100 trillion.
        </p>
      </div>

      <div className="about-section">
        <h2>Our Mission</h2>
        <p>
          NVIDIA's invention of the GPU in 1999 sparked the growth of the PC gaming market, redefined computer graphics,
          and revolutionized parallel computing. More recently, GPU deep learning ignited modern AI — the next era of
          computing — with the GPU acting as the brain of computers, robots, and self-driving cars that can perceive and
          understand the world.
        </p>
      </div>

      <div className="about-section">
        <h2>Leadership</h2>
        <div className="leadership-grid">
          <div className="leadership-card">
            <div className="leadership-avatar">
              {/* Placeholder for avatar */}
            </div>
            <h3>Jensen Huang</h3>
            <p>Founder and CEO</p>
          </div>
          <div className="leadership-card">
            <div className="leadership-avatar">
              {/* Placeholder for avatar */}
            </div>
            <h3>Colette Kress</h3>
            <p>Executive Vice President and CFO</p>
          </div>
          <div className="leadership-card">
            <div className="leadership-avatar">
              {/* Placeholder for avatar */}
            </div>
            <h3>Jay Puri</h3>
            <p>Executive Vice President, Worldwide Field Operations</p>
          </div>
        </div>
      </div>

      <div className="about-section">
        <h2>Innovation</h2>
        <div className="innovation-grid">
          <div className="innovation-card">
            <h3>3D Graphics</h3>
            <p>
              Founded on April 5, 1993, by Jensen Huang, Chris Malachowsky, and Curtis Priem, with a vision to bring 3D graphics to the gaming and multimedia markets.
            </p>
          </div>
          <div className="innovation-card">
            <h3>NVIDIA GPU</h3>
            <p>
              <strong>1999 - GPU:</strong> Invents the GPU, the graphics processing unit, which sets the stage to reshape the computing industry.
            </p>
          </div>
          <div className="innovation-card">
            <h3>NVIDIA CUDA Architecture</h3>
            <p>
              <strong>2006 - CUDA:</strong> Opens parallel processing capabilities of GPUs to science and research with unveiling of CUDA® architecture.
            </p>
          </div>
          <div className="innovation-card">
            <h3>NVIDIA AI Technologies</h3>
            <p>
              <strong>2012 - AI:</strong> Sparks the era of modern AI by powering the breakthrough AlexNet neural network.
            </p>
          </div>
          <div className="innovation-card">
            <h3>NVIDIA RTX</h3>
            <p>
              <strong>2018 - RTX:</strong> Reinvents computer graphics with NVIDIA RTX, the first GPU capable of real-time ray tracing.
            </p>
          </div>
          <div className="innovation-card">
            <h3>NVIDIA Omniverse Platform</h3>
            <p>
              <strong>2022 - Omniverse:</strong> Plays a foundational role in the building of the metaverse, the next stage of the internet, with the NVIDIA Omniverse platform.
            </p>
          </div>
        </div>
      </div>

      <div className="about-section">
        <h2>Our Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <h3>Innovation</h3>
            <p>We strive to build products that help our world</p>
          </div>
          <div className="value-card">
            <h3>Intellectual Honesty</h3>
            <p>We communicate with respect for the contributions of others.</p>
          </div>
          <div className="value-card">
            <h3>Speed</h3>
            <p>We pave the way for efficiency and simplicity</p>
          </div>
          <div className="value-card">
            <h3>Excellence</h3>
            <p>We set challenging goals, focus on impact, and perseverance.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;