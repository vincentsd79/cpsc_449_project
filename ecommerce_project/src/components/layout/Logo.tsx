import React from 'react';
import logoImg from '../../assets/logo.svg';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'medium', showText = true }) => {
  // Define sizes for the logo
  const sizeMap = {
    small: { width: 24, height: 24, fontSize: '1rem' },
    medium: { width: 32, height: 32, fontSize: '1.5rem' },
    large: { width: 48, height: 48, fontSize: '2rem' }
  };

  const { width, height, fontSize } = sizeMap[size];

  return (
    <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <img 
        src={logoImg} 
        alt="CPSC 449 Logo" 
        width={width} 
        height={height} 
        style={{ borderRadius: '50%' }}
      />
      {showText && (
        <h2 style={{ 
          margin: 0, 
          fontSize,
          fontWeight: 'bold',
          color: 'inherit' 
        }}>
          CPSC 449
        </h2>
      )}
    </div>
  );
};

export default Logo; 