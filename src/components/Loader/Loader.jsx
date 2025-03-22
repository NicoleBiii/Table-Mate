import React from 'react';
import './Loader.scss';

export default function Loader() {
  return (
    <div className="loader-container">
      <div className="spinner">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>
      <span className="loading-text">Loading...</span>
    </div>
  );
}