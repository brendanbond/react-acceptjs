import React from 'react';

export const authorizeNetPopupScreenStyle: React.CSSProperties = {
  position: 'absolute',
  left: '0px',
  top: '0px',
  width: '100%',
  height: '100%',
  zIndex: 1,
  backgroundColor: '#808080',
  opacity: '0.5',
  filter: 'alpha(opacity=50)',
};

export const authorizeNetPopupStyle: React.CSSProperties = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  marginLeft: '-200px',
  marginTop: '-200px',
  zIndex: 2,
  overflow: 'visible',
};

export const authorizeNetPopupOuterStyle: React.CSSProperties = {
  backgroundColor: '#dddddd',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: '#a0a0a0 #909090 #909090 #a0a0a0',
  padding: '4px',
};

export const authorizeNetPopupTopStyle: React.CSSProperties = {
  height: '23px',
};

export const authorizeNetPopupCloseStyle: React.CSSProperties = {
  position: 'absolute',
  right: '7px',
  top: '7px',
};

export const authorizeNetPopupCloseLinkStyle: React.CSSProperties = {
  backgroundImage: 'url("content/closeButton1.png")',
  backgroundRepeat: 'no-repeat',
  height: '16px',
  width: '16px',
  display: 'inline-block',
};

export const authorizeNetPopupInnerStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderWidth: '2px',
  borderStyle: 'solid',
  borderColor: '#cfcfcf #ebebeb #ebebeb #cfcfcf',
};

export const authorizeNetPopupBottomStyle: React.CSSProperties = {
  height: '30px',
};

export const authorizeNetPopupLogoStyle: React.CSSProperties = {
  position: 'absolute',
  right: '9px',
  bottom: '4px',
  width: '200px',
  height: '25px',
  backgroundImage: 'url("content/powered_simple.png")',
};

// .AuthorizeNetPopupSimpleTheme .AuthorizeNetPopupOuter {
//   border: 1px solid #585858
//   background-color: #ffffff
//   }
