import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './test'; // Import test file for debugging

// Load global scripts
const loadExternalScript = (url) => {
  const script = document.createElement('script');
  script.src = url;
  script.async = true;
  document.body.appendChild(script);
  return script;
};

// Ensure Hammer.js is available
if (typeof window.Hammer === 'undefined') {
  loadExternalScript('https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min.js');
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(); 

