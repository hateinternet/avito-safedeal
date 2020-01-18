import React from 'react';

import image from './error.svg';
import './error-indicator.css';

const ErrorIndicator = () => {
  return (
    <div className="error">
      <img className="error__image" src={image} alt="error" />
      <span className="error__text">something has gone terribly wrong</span>
      <a className="error__link" href="/">try starting over</a>
    </div>
  );
};

export default ErrorIndicator;
