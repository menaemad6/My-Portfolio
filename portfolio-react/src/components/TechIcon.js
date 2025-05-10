import React, { useState } from 'react';

const TechIcon = ({ name, size = 40 }) => {
  const [imageError, setImageError] = useState(false);

  // Map of technology names to their icon URLs
  const iconMap = {
    // Programming languages
    'Python': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg',
    'JavaScript': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg',
    'TypeScript': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg',
    'HTML': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg',
    'HTML/CSS': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg',
    'CSS': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg',
    'PHP': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg',
    'C': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/c/c-original.svg',
    'C++': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg',
    'Java': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg',
    
    // Frameworks & Libraries
    'React': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg',
    'Django': 'https://cdn.worldvectorlogo.com/logos/django.svg',
    'Flask': 'https://www.vectorlogo.zone/logos/pocoo_flask/pocoo_flask-icon.svg',
    'Bootstrap': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg',
    'Tailwind': 'https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg',
    'Redux': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg',
    'Styled Components': 'https://miro.medium.com/v2/resize:fit:318/1*7jRD5QhgARucFKvRHFxpOg.png',
    'WebSocket': 'https://upload.wikimedia.org/wikipedia/commons/5/55/Websockets_logo.svg',
    'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    'Express': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
    'Electron': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/electron/electron-original.svg',
    'OpenAI API': 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
    
    // Databases
    'PostgreSQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    'MySQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    'MongoDB': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    'SQLite': 'https://www.vectorlogo.zone/logos/sqlite/sqlite-icon.svg',
    
    // Tools & Platforms
    'Git': 'https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg',
    'Linux': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/linux/linux-original.svg',
    'Netlify': 'https://www.vectorlogo.zone/logos/netlify/netlify-icon.svg',
    'Heroku': 'https://www.vectorlogo.zone/logos/heroku/heroku-icon.svg',
    'Docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  };

  // Documentation links
  const docLinks = {
    'Python': 'https://www.python.org',
    'JavaScript': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    'TypeScript': 'https://www.typescriptlang.org',
    'HTML': 'https://developer.mozilla.org/en-US/docs/Web/HTML',
    'HTML/CSS': 'https://developer.mozilla.org/en-US/docs/Web/HTML',
    'CSS': 'https://developer.mozilla.org/en-US/docs/Web/CSS',
    'PHP': 'https://www.php.net',
    'React': 'https://reactjs.org',
    'Django': 'https://www.djangoproject.com',
    'Flask': 'https://flask.palletsprojects.com',
    'Bootstrap': 'https://getbootstrap.com',
    'Tailwind': 'https://tailwindcss.com',
    'PostgreSQL': 'https://www.postgresql.org',
    'MySQL': 'https://www.mysql.com',
    'MongoDB': 'https://www.mongodb.com',
    'SQLite': 'https://www.sqlite.org',
    'Redux': 'https://redux.js.org',
    'Styled Components': 'https://styled-components.com',
    'Node.js': 'https://nodejs.org',
    'Express': 'https://expressjs.com',
    'WebSocket': 'https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API',
    'Netlify': 'https://www.netlify.com',
    'Git': 'https://git-scm.com',
    'Linux': 'https://www.linux.org',
    'C': 'https://www.cprogramming.com',
    'C++': 'https://www.w3schools.com/cpp',
    'Java': 'https://www.java.com',
    'Docker': 'https://www.docker.com',
    'Electron': 'https://www.electronjs.org',
    'OpenAI API': 'https://openai.com/api',
  };

  // Get icon URL from map or use default icon
  const iconUrl = iconMap[name] || `https://via.placeholder.com/40x40.png?text=${name[0]}`;
  
  // Get documentation link or use a default
  const docLink = docLinks[name] || '#';

  // Handle image loading errors
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="tech-icon-wrapper" title={name}>
      <a 
        href={docLink} 
        target="_blank" 
        rel="noopener noreferrer"
        className="tech-icon-link"
      >
        {imageError ? (
          <div className="tech-icon-fallback">
            {name.charAt(0)}
          </div>
        ) : (
          <img 
            src={iconUrl} 
            alt={name} 
            width={size} 
            height={size} 
            className="tech-icon"
            onError={handleImageError}
          />
        )}
        <span className="tech-name">{name}</span>
      </a>
    </div>
  );
};

export default TechIcon; 