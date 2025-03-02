import React from 'react';

const AboutPage: React.FC = () => {
  const aboutStyle = {
    padding: '4rem 2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  };
  
  const contentStyle = {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: '2rem',
    alignItems: 'center' as const,
  };
  
  const headingStyle = {
    fontSize: '2.5rem',
    color: '#2c3e50',
    marginBottom: '2rem',
    textAlign: 'center' as const,
  };
  
  const cardStyle = {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    padding: '2rem',
    width: '100%',
  };
  
  const cardHeadingStyle = {
    color: '#3498db',
    marginBottom: '1rem',
    fontSize: '1.5rem',
  };
  
  const paragraphStyle = {
    color: '#555',
    lineHeight: 1.6,
    fontSize: '1.1rem',
  };

  return (
    <section style={aboutStyle}>
      <div style={contentStyle}>
        <h1 style={headingStyle}>About Us</h1>
        
        <div style={cardStyle}>
          <h2 style={cardHeadingStyle}>Who We Are</h2>
          <p style={paragraphStyle}>Welcome to Our Store, your one-stop shop for high-quality products at unbeatable prices. We are committed to providing a seamless shopping experience with fast delivery and excellent customer support.</p>
        </div>
        
        <div style={cardStyle}>
          <h2 style={cardHeadingStyle}>Our Mission</h2>
          <p style={paragraphStyle}>Our mission is to create a reliable and user-friendly online marketplace where customers can find everything they need with ease.</p>
        </div>
        
        <div style={cardStyle}>
          <h2 style={cardHeadingStyle}>Meet Our Team</h2>
          <p style={paragraphStyle}>We are a passionate team of developers, designers, and business experts dedicated to making online shopping simple and enjoyable.</p>
        </div>
      </div>
    </section>
  );
};

export default AboutPage; 