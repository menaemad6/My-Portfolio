import React from 'react';

const ContactSection = () => {
  return (
    <div className="contact">
      <div className="contact--lockup">
        <div className="modal">
          <div className="modal--information">
            <p>Al-Zahraa , Sohag</p>
            <a href="mailto:menaemadnasef@gmail.com">menaemadnasef@gmail.com</a>
            <a href="tel:+201226102013">+20 0122 610 2013</a>
          </div>
          <ul className="modal--options">
            <li><a href="https://www.facebook.com/bondok.emad" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://www.instagram.com/mena_emad6/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="mailto:menaemadnasef@gmail.com" target="_blank" rel="noopener noreferrer">Mail Me</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactSection; 