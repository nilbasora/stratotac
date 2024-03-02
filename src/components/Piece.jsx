import React from 'react';

// Styles for the different sizes
const sizeStyles = {
  small: { width: '30px', height: '30px' },
  medium: { width: '45px', height: '45px' },
  big: { width: '60px', height: '60px' },
};

// The Piece component
export const Piece = ({ shape, color, size, isSelected, isSelectable, isPlaced}) => {
  const baseStyles = {
    ...sizeStyles[size],
    display: 'inline-block',
  };

  const styles = isSelectable || isPlaced ? {
    ...baseStyles,
    backgroundColor: color, // Original color if the piece is selectable
    boxShadow: isSelected ? '0 0 10px 2px rgba(255, 0, 0, 0.8)' : 'none', // Conditionally apply shadow
  } : {
    ...baseStyles,
    backgroundColor: '#cccccc', // Gray color or pattern if the piece is not selectable
    filter: 'grayscale(100%)', // Optional: adds a grayscale filter
    opacity: 0.5, // Optional: makes it semi-transparent
  };

  if (shape === 'circle') {
    styles.borderRadius = '50%'; // Make the shape a circle
  }
  // For squares, the default shape (no borderRadius) is fine

  return <div style={styles}></div>;
};

// Usage example
// <Piece shape="square" color="green" size="medium" />
// <Piece shape="circle" color="red" size="small" />
