import React from 'react';

export const defaultBackdropStyle: React.CSSProperties = {
  position: 'fixed',
  left: '0px',
  top: '0px',
  width: '100%',
  height: '100%',
  zIndex: 1,
  backgroundColor: '#808080',
  opacity: '0.5',
  filter: 'alpha(opacity=50)',
};

export const defaultContainerStyle: React.CSSProperties = {
  borderRadius: '6px',
  position: 'fixed',
  boxShadow: 'rgba(0, 0, 0, 0.4) 5px 5px 16px',
  zIndex: 999999,
  display: 'block',
  overflow: 'hidden',
  left: '50%',
  top: '50%',
  backgroundColor: '#ffffff',
};
