import React from 'react';

// Styles for the different sizes
const sizeStyles = {
  small: { width: '25px', height: '25px' },
  medium: { width: '45px', height: '45px' },
  big: { width: '65px', height: '65px' },
};

// The Piece component
export const Piece = ({ shape, color, size, isSelected, isSelectable, isPlaced }) => {
  const baseStyles = {
    ...sizeStyles[size],
    display: 'inline-block',
    transition: 'all 0.3s ease', // Smooth transition for any changes
  };

  const gradientColor = `linear-gradient(145deg, ${color}, ${shadeColor(color, -20)})`; // Enhance color with gradient

  const styles = isSelectable || isPlaced ? {
    ...baseStyles,
    background: gradientColor, // Apply gradient color
    boxShadow: isSelected ? `0 0 10px 2px rgba(255, 0, 0, 0.8), 0 8px 15px rgba(0, 0, 0, 0.1)` : `0 4px 8px rgba(0, 0, 0, 0.1)`, // Enhanced shadow for 3D effect
    border: '1px solid rgba(255,255,255,0.5)', // Optional: adds a subtle border
  } : {
    ...baseStyles,
    backgroundColor: '#cccccc',
    filter: 'grayscale(100%)',
    opacity: 0.5,
  };

  if (shape === 'circle') {
    styles.borderRadius = '50%';
  }
  // For squares, the default shape (no borderRadius) is fine

  return <div style={styles}></div>;
};

// Helper function to adjust color brightness
function shadeColor(color, percent) {
  let R = parseInt(color.substring(1,3),16);
  let G = parseInt(color.substring(3,5),16);
  let B = parseInt(color.substring(5,7),16);

  R = parseInt(R * (100 + percent) / 100);
  G = parseInt(G * (100 + percent) / 100);
  B = parseInt(B * (100 + percent) / 100);

  R = (R<255)?R:255;
  G = (G<255)?G:255;
  B = (B<255)?B:255;

  let RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
  let GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
  let BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

  return "#"+RR+GG+BB;
}

// Usage example
// <Piece shape="square" color="green" size="medium" />
// <Piece shape="circle" color="red" size="small" />
