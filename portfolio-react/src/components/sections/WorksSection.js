import React, { useState, useEffect, useContext, useRef } from 'react';
import { ModalContext } from '../../App';
import ProjectCard from '../ProjectCard';
import TechIcon from '../TechIcon';
import './ProjectModal.css';
import ReactDOM from 'react-dom';

const WorksSection = () => {
  // Get global modal context
  const { setModalOpen } = useContext(ModalContext);
  
  // State for modal
  const [modalOpen, setLocalModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [animatedClass, setAnimatedClass] = useState('');
  const [activeTab, setActiveTab] = useState('info');
  
  // State for GitHub data
  const [commits, setCommits] = useState([]);
  const [repoStats, setRepoStats] = useState(null);
  const [isLoadingRepoData, setIsLoadingRepoData] = useState(false);
  
  // State for slider
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const sliderRef = useRef(null);
  
  // This effect updates the global modal state when the local modal state changes
  useEffect(() => {
    setModalOpen(modalOpen);
  }, [modalOpen, setModalOpen]);
  
  // Handle modal animation classes
  useEffect(() => {
    if (modalOpen) {
      // Small delay to ensure CSS transition works properly
      setTimeout(() => {
        setAnimatedClass('modal-animated');
      }, 50);
      
      // Lock body position
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.overflowY = 'scroll';
    } else {
      // Restore body position
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      document.body.style.overflowY = '';
      
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      
      setAnimatedClass('');
      // Reset tab to info when modal closes
      setActiveTab('info');
    }
  }, [modalOpen]);

  // Fetch GitHub repo data when a project is selected
  useEffect(() => {
    if (currentProject && currentProject.girhubRepoName) {
      fetchGitHubData(currentProject.girhubRepoName);
    }
  }, [currentProject]);

  // Function to fetch GitHub data
  const fetchGitHubData = async (repoName) => {
    setIsLoadingRepoData(true);
    try {
      // Fetch repository data
      const repoResponse = await fetch(`https://api.github.com/repos/menaemad6/${repoName}`);
      const repoData = await repoResponse.json();
      
      // Fetch latest commits
      const commitsResponse = await fetch(`https://api.github.com/repos/menaemad6/${repoName}/commits?per_page=3`);
      const commitsData = await commitsResponse.json();
      
      setRepoStats({
        stars: repoData.stargazers_count,
        forks: repoData.forks_count,
        issues: repoData.open_issues_count
      });
      
      setCommits(commitsData.map(commit => ({
        message: commit.commit.message,
        author: commit.commit.author.name,
        date: new Date(commit.commit.author.date).toLocaleDateString(),
        url: commit.html_url
      })));
    } catch (error) {
      console.error("Error fetching GitHub data:", error);
      // Set fallback data
      setRepoStats({ stars: 0, forks: 0, issues: 0 });
      setCommits([
        {
          message: "Initial project setup",
          author: "Mena Emad",
          date: "3 days ago",
          url: "#"
        },
        {
          message: "Core functionality implementation",
          author: "Mena Emad",
          date: "2 days ago",
          url: "#" 
        },
        {
          message: "UI/UX improvements",
          author: "Mena Emad",
          date: "1 day ago",
          url: "#"
        }
      ]);
    } finally {
      setIsLoadingRepoData(false);
    }
  };

  // Project data - add your project details here
  const projectsData = [
    {
      id: 1,
      title: "Es3af",
      shortDescription: "AI Tool for Medical Students",
      description: "An innovative AI-powered platform designed specifically for medical students. Features include intelligent study assistance, medical concept explanations, and interactive learning tools to enhance medical education.",
      image: "assets/img/es3af-home.png",
      link: "https://es3af.pro",
      previewUrl: "https://es3af.pro",
      technologies: ["Python", "Django", "OpenAI API", "Bootstrap", "JavaScript"],
      features: ["AI-powered study assistance", "Medical concept explanations", "Interactive learning tools", "Personalized study plans"],
      codeSandboxUrl: "https://codesandbox.io/p/github/menaemad6/es3af/main?import=true&embed=1",
      girhubRepoName: "es3af",
    },
    {
      id: 2,
      title: "Hootdi Online Store",
      shortDescription: "E-commerce Platform",
      description: "A modern e-commerce platform built with React and TypeScript. Features include product catalog, shopping cart, user authentication, and secure payment processing. The platform offers a seamless shopping experience with responsive design and intuitive navigation.",
      image: "assets/img/hoodti-home.png",
      link: "https://hoodti.netlify.app",
      previewUrl: "https://hoodti.netlify.app",
      technologies: ["React", "TypeScript", "Redux", "Styled Components", "Netlify"],
      features: ["Product catalog", "Shopping cart", "User authentication", "Secure payments", "Responsive design"],
      codeSandboxUrl: "https://codesandbox.io/p/github/menaemad6/hoodti/main?import=true&embed=1&file=%2Fsrc%2FApp.tsx",
      girhubRepoName: "hoodti",
    },
    {
      id: 3,
      title: "Kero Goda Platform",
      shortDescription: "Physics Online Learning Platform",
      description: "A comprehensive online learning platform for physics education. Features include interactive lectures, homework assistance, flexible learning solutions, and expert support. The platform makes physics accessible and engaging through interactive lessons and real-world applications.",
      image: "assets/img/kero-goda-home.png",
      link: "https://kerogoda.pythonanywhere.com/en/",
      previewUrl: "https://kerogoda.pythonanywhere.com/en/",
      technologies: ["Python", "Django", "Bootstrap", "JavaScript", "PostgreSQL"],
      features: ["Interactive lectures", "Homework assistance", "Flexible learning", "Expert support", "Multi-language support"],
      codeSandboxUrl: "https://codesandbox.io/p/github/menaemad6/kerogoda/main?import=true&embed=1",
      girhubRepoName: "kerogoda",
    },
    {
      id: 4,
      title: "Wang Team Website",
      shortDescription: "Team Portfolio",
      description: "Collaborative portfolio site for a creative team. Showcases team members, projects, skills, and services offered.",
      image: "assets/img/wang-team-home.png",
      link: "https://wang-team-online.netlify.app",
      previewUrl: "https://wang-team-online.netlify.app",
      technologies: ["HTML/CSS", "JavaScript", "PHP", "MySQL"],
      features: ["Team profiles", "Project gallery", "Contact form", "Client testimonials"],
      codeSandboxUrl: "https://codesandbox.io/p/github/menaemad6/wang-team/main?import=true&embed=1&file=%2Findex.html",
      girhubRepoName: "wang-team",
    },
    {
      id: 5,
      title: "Ektashef",
      shortDescription: "Information Website",
      description: "Information discovery platform for educational resources. Helps users find learning materials, courses, and educational content.",
      image: "assets/img/ektashef-home.png",
      link: "https://ektashef.pythonanywhere.com",
      previewUrl: "https://ektashef.pythonanywhere.com",
      technologies: ["Python", "Django", "PostgreSQL", "Bootstrap"],
      features: ["Advanced search", "Resource categorization", "User reviews", "Bookmarking"],
      codeSandboxUrl: "https://codesandbox.io/p/github/menaemad6/estakshef/main?import=true&embed=1",
      girhubRepoName: "estakshef",
    },
    {
      id: 6,
      title: "Bero Portfolio",
      shortDescription: "Photographer Portfolio",
      description: "A professional portfolio website for a photographer showcasing their work, skills, and services. Features include a gallery of photography work, contact information, and a clean, modern design that highlights the visual content.",
      image: "assets/img/bero-joseph-home.png",
      link: "https://bero-joseph.netlify.app/",
      previewUrl: "https://bero-joseph.netlify.app/",
      technologies: ["HTML", "CSS", "JavaScript", "Netlify"],
      features: ["Photo gallery", "Contact form", "Skills showcase", "Responsive design"],
      codeSandboxUrl: "https://codesandbox.io/p/github/menaemad6/bero-portfolio/main?import=true&embed=1&file=%2Findex.html",
      girhubRepoName: "bero-portfolio",
    },
    {
      id: 7,
      title: "Ta3meya Chat",
      shortDescription: "Funny Chat Application",
      description: "A fun and interactive chat application with a unique Egyptian twist. Features include real-time messaging, user authentication, and a playful interface that brings Egyptian humor to online communication.",
      image: "assets/img/ta3meya-home.png",
      link: "https://ta3meya.pythonanywhere.com/",
      previewUrl: "https://ta3meya.pythonanywhere.com/",
      technologies: ["Python", "Django", "WebSocket", "Bootstrap"],
      features: ["Real-time messaging", "User authentication", "Private chats", "Profile customization"],
      codeSandboxUrl: "https://codesandbox.io/p/github/menaemad6/Ta3meya-Chat/main?import=true&embed=1",
      girhubRepoName: "Ta3meya-Chat",
    },
    {
      id: 8,
      title: "Mario Portfolio",
      shortDescription: "Graphic Designer Portfolio",
      description: "A creative portfolio website for a graphic designer featuring their work, services, and professional background. The site includes a showcase of design projects, skills, and contact information with an artistic and modern interface.",
      image: "assets/img/mario-amgad-home.png",
      link: "https://mario-amgad.netlify.app",
      previewUrl: "https://mario-amgad.netlify.app",
      technologies: ["HTML", "CSS", "JavaScript", "Netlify"],
      features: ["Project showcase", "Skills display", "Contact section", "Responsive layout"],
      codeSandboxUrl: "https://codesandbox.io/p/github/menaemad6/mario-amgad-portfolio/main?import=true&embed=1&file=%2Findex.html",
      girhubRepoName: "mario-amgad-portfolio",
    },
    {
      id: 9,
      title: "Drosak Academy",
      shortDescription: "Educational Website",
      description: "Educational Website built with a modern tech stack. Features include course management, student dashboards, interactive learning materials, and assessment tools.",
      image: "assets/img/drosak-home.png",
      link: "https://drosak-v2.netlify.app",
      previewUrl: "https://drosak-v2.netlify.app",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      features: ["User authentication", "Course enrollment", "Progress tracking", "Interactive quizzes"],
      codeSandboxUrl: "https://codesandbox.io/p/github/menaemad6/drosak/main?import=true&embed=1&file=%2Findex.html",
      girhubRepoName: "drosak",
    }
  ];

  // Open project modal
  const openProjectModal = (project) => {
    setCurrentProject(project);
    setLocalModalOpen(true);
  };

  // Close project modal
  const closeProjectModal = () => {
    setAnimatedClass('modal-closing');
    // Add a small delay before actually closing the modal for animation
    setTimeout(() => {
      setLocalModalOpen(false);
    }, 300);
  };

  // Handler to stop propagation for modal content to prevent closing
  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  // Tab switcher
  const switchTab = (tab) => {
    setActiveTab(tab);
  };
  
  // Slider navigation
  const goToNextSlide = () => {
    const newIndex = (currentSlideIndex + 1) % projectsData.length;
    updateSlider(newIndex);
  };
  
  const goToPrevSlide = () => {
    const newIndex = (currentSlideIndex - 1 + projectsData.length) % projectsData.length;
    updateSlider(newIndex);
  };
  
  const updateSlider = (newIndex) => {
    // First remove all position classes
    if (sliderRef.current) {
      const items = sliderRef.current.querySelectorAll('.slider--item');
      items.forEach(item => {
        item.classList.remove('slider--item-left', 'slider--item-center', 'slider--item-right');
      });
      
      // Add position classes based on new index
      const totalItems = items.length;
      
      // Calculate indexes for left, center, and right items
      const leftIndex = (newIndex - 1 + totalItems) % totalItems;
      const centerIndex = newIndex;
      const rightIndex = (newIndex + 1) % totalItems;
      
      // Apply classes
      items[leftIndex].classList.add('slider--item-left');
      items[centerIndex].classList.add('slider--item-center');
      items[rightIndex].classList.add('slider--item-right');
      
      // Update state
      setCurrentSlideIndex(newIndex);
    }
  };
  
  // Set initial slider positions on component mount
  useEffect(() => {
    updateSlider(currentSlideIndex);
  }, []);

  // Render the correct tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'info':
        return (
          <div className="project-modal-info">
            {/* Left Column */}
            <div className="project-modal-left-column">
              {/* Banner Image */}
              <div className="project-modal-image">
                <img 
                  src={currentProject.image} 
                  alt={currentProject.title} 
                  loading="lazy"
                  style={{ display: 'block', width: '100%' }}
                />
                <div className="image-overlay">
                  <a 
                    href={currentProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="overlay-project-btn"
                  >
                    Visit Project
                  </a>
                </div>
              </div>
              
              {/* GitHub Repository Card */}
              {currentProject.girhubRepoName && (
                <div className="github-repo-card">
                  <h4>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    {currentProject.girhubRepoName}
                  </h4>
                  
                  <div className="repo-stats">
                    <div className="repo-stat">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
                        <path fillRule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"/>
                      </svg>
                      {repoStats ? repoStats.stars : '...'} stars
                    </div>
                    <div className="repo-stat">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
                        <path fillRule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"/>
                      </svg>
                      {repoStats ? repoStats.forks : '...'} forks
                    </div>
                    <div className="repo-stat">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
                        <path fillRule="evenodd" d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"/>
                      </svg>
                      {repoStats ? repoStats.issues : '...'} issues
                    </div>
                  </div>
                  
                  <p className="repo-description">
                    {currentProject.description}
                  </p>
                  
                  <div className="repo-actions">
                    <a 
                      href={`https://github.com/menaemad6/${currentProject.girhubRepoName}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="repo-action-btn primary"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                      </svg>
                      View Code
                    </a>
                    <a 
                      href={`https://github1s.com/menaemad6/${currentProject.girhubRepoName}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="repo-action-btn"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Github1s Explorer
                    </a>
                  </div>
                  
                  <div className="repo-commits">
                    <div className="repo-commits-title">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Recent Commits
                    </div>
                    {isLoadingRepoData ? (
                      <div className="loading-commits">Loading commit history...</div>
                    ) : (
                      <div className="commit-timeline">
                        {commits.map((commit, index) => (
                          <a 
                            key={index} 
                            href={commit.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="commit-item"
                          >
                            <div className="commit-message">{commit.message}</div>
                            <div className="commit-details">
                              <span className="commit-author">{commit.author}</span>
                              <span className="commit-date">{commit.date}</span>
                            </div>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {/* Right Column */}
            <div className="project-modal-right-column">
              <div className="project-description">
                <h4>Description</h4>
                <p>{currentProject.description}</p>
              </div>
              <div className="project-details">
                <div className="project-technologies">
                  <h4>Technologies</h4>
                  <div className="tech-icons-container">
                    {currentProject.technologies.map((tech, index) => (
                      <TechIcon key={index} name={tech} size={40} />
                    ))}
                  </div>
                </div>
                <div className="project-features">
                  <h4>Features</h4>
                  <ul>
                    {currentProject.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <a 
                href={currentProject.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="visit-btn"
              >
                Visit Project
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>
          </div>
        );
      case 'preview':
        return (
          <div className="iframe-container">
            <iframe
              src={currentProject.previewUrl}
              title={`${currentProject.title} Preview`}
              className="project-iframe"
              loading="lazy"
            />
          </div>
        );
      case 'code':
        return currentProject.codeSandboxUrl ? (
          <div className="iframe-container">
            <iframe
              src={currentProject.codeSandboxUrl}
              title={`${currentProject.title} Code`}
              className="project-iframe"
              loading="lazy"
              allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
              sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
            />
          </div>
        ) : (
          <div className="coming-soon-container">
            <div className="coming-soon-content">
              <div className="coming-soon-icon">👨‍💻</div>
              <h3>Code Preview Coming Soon</h3>
              <p>We're working on making the code available for this project. Check back later!</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="work">
      <h2>Selected work</h2>
      <div className="work--lockup">
        <ul className="slider" ref={sliderRef}>
          {projectsData.map((project, index) => (
            <ProjectCard 
              key={project.id}
              project={project}
              onClick={openProjectModal}
              className={
                index === 0 ? 'slider--item-left' : 
                index === 1 ? 'slider--item-center' : 
                index === 2 ? 'slider--item-right' : ''
              }
            />
          ))}
        </ul>
        <div className="slider--prev" onClick={goToPrevSlide}>
          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 150 118" style={{ enableBackground: 'new 0 0 150 118' }} xmlSpace="preserve">
            <g transform="translate(0.000000,118.000000) scale(0.100000,-0.100000)">
              <path d="M561,1169C525,1155,10,640,3,612c-3-13,1-36,8-52c8-15,134-145,281-289C527,41,562,10,590,10c22,0,41,9,61,29
              c55,55,49,64-163,278L296,510h575c564,0,576,0,597,20c46,43,37,109-18,137c-19,10-159,13-590,13l-565,1l182,180
              c101,99,187,188,193,199c16,30,12,57-12,84C631,1174,595,1183,561,1169z" />
            </g>
          </svg>
        </div>
        <div className="slider--next" onClick={goToNextSlide}>
          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 150 118" style={{ enableBackground: 'new 0 0 150 118' }} xmlSpace="preserve">
            <g transform="translate(0.000000,118.000000) scale(0.100000,-0.100000)">
              <path d="M870,1167c-34-17-55-57-46-90c3-15,81-100,194-211l187-185l-565-1c-431,0-571-3-590-13c-55-28-64-94-18-137c21-20,33-20,597-20h575l-192-193C800,103,794,94,849,39c20-20,39-29,61-29c28,0,63,30,298,262c147,144,272,271,279,282c30,51,23,60-219,304C947,1180,926,1196,870,1167z" />
            </g>
          </svg>
        </div>
      </div>

      {/* Project Modal - Render using Portal */}
      {modalOpen && currentProject && ReactDOM.createPortal(
        <div 
          className={`project-modal-overlay ${animatedClass}`} 
          onClick={closeProjectModal}
        >
          <div className="project-modal" onClick={handleModalContentClick}>
            <div className="project-modal-header">
              <h3>{currentProject.title}</h3>
              <button className="modal-close" onClick={closeProjectModal}>
                <span></span>
                <span></span>
              </button>
            </div>
            
            <div className="modal-tabs">
              <button 
                className={`tab-button ${activeTab === 'info' ? 'active' : ''}`}
                onClick={() => switchTab('info')}
              >
                Info
              </button>
              <button 
                className={`tab-button ${activeTab === 'preview' ? 'active' : ''}`}
                onClick={() => switchTab('preview')}
              >
                Preview
              </button>
              <button 
                className={`tab-button ${activeTab === 'code' ? 'active' : ''}`}
                onClick={() => switchTab('code')}
              >
                Code
              </button>
            </div>
            
            <div className="project-modal-content">
              {currentProject && renderTabContent()}
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default WorksSection; 