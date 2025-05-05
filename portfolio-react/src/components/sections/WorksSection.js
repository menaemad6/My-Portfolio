import React, { useState, useEffect, useContext, useRef } from 'react';
import { ModalContext } from '../../App';
import ProjectCard from '../ProjectCard';
import './ProjectModal.css';

const WorksSection = () => {
  // Get global modal context
  const { setModalOpen } = useContext(ModalContext);
  
  // State for modal
  const [modalOpen, setLocalModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [animatedClass, setAnimatedClass] = useState('');
  const [activeTab, setActiveTab] = useState('info');
  
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

  // Project data - add your project details here
  const projectsData = [
    {
      id: 1,
      title: "Drosak Academy",
      shortDescription: "Educational Website",
      description: "Educational Website built with a modern tech stack. Features include course management, student dashboards, interactive learning materials, and assessment tools.",
      image: "assets/img/web1.png",
      link: "https://drosak.xyz",
      previewUrl: "https://drosak.xyz",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      features: ["User authentication", "Course enrollment", "Progress tracking", "Interactive quizzes"]
    },
    {
      id: 2,
      title: "Wang Team Website",
      shortDescription: "Team Portfolio",
      description: "Collaborative portfolio site for a creative team. Showcases team members, projects, skills, and services offered.",
      image: "assets/img/web2.png",
      link: "https://wang-team.online",
      previewUrl: "https://wang-team.online",
      technologies: ["HTML/CSS", "JavaScript", "PHP", "MySQL"],
      features: ["Team profiles", "Project gallery", "Contact form", "Client testimonials"]
    },
    {
      id: 3,
      title: "Ektashef",
      shortDescription: "Information Website",
      description: "Information discovery platform for educational resources. Helps users find learning materials, courses, and educational content.",
      image: "assets/img/web3.png",
      link: "https://ektashef.pythonanywhere.com",
      previewUrl: "https://ektashef.pythonanywhere.com",
      technologies: ["Python", "Django", "PostgreSQL", "Bootstrap"],
      features: ["Advanced search", "Resource categorization", "User reviews", "Bookmarking"]
    },
    {
      id: 4,
      title: "Personal Portfolio",
      shortDescription: "Portfolio Site",
      description: "Custom designed portfolio website with interactive elements and responsive layout.",
      image: "assets/img/web4.png",
      link: "https://bero-joseph.netlify.app",
      previewUrl: "https://bero-joseph.netlify.app",
      technologies: ["React", "CSS3", "JavaScript", "Netlify"],
      features: ["Animations", "Project showcase", "Contact form", "Responsive design"]
    },
    {
      id: 5,
      title: "Personal Portfolio",
      shortDescription: "Portfolio Site",
      description: "Modern portfolio website featuring clean design and interactive elements.",
      image: "assets/img/work5.png",
      link: "https://mario-amgad.netlify.app",
      previewUrl: "https://mario-amgad.netlify.app",
      technologies: ["HTML5", "CSS3", "JavaScript", "Netlify"],
      features: ["Project gallery", "Skill showcase", "Contact form", "Responsive layout"]
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
          <>
            <div className="project-modal-image">
              <img src={currentProject.image} alt={currentProject.title} />
              <div className="image-overlay"></div>
            </div>
            <div className="project-modal-info">
              <p className="project-description">{currentProject.description}</p>
              
              <div className="project-details">
                <div className="project-technologies">
                  <h4>Technologies</h4>
                  <ul>
                    {currentProject.technologies.map((tech, index) => (
                      <li key={index}>{tech}</li>
                    ))}
                  </ul>
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
                className="project-link-button"
              >
                Visit Project
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 150 118">
                  <g transform="translate(0.000000,118.000000) scale(0.100000,-0.100000)">
                    <path d="M870,1167c-34-17-55-57-46-90c3-15,81-100,194-211l187-185l-565-1c-431,0-571-3-590-13c-55-28-64-94-18-137c21-20,33-20,597-20h575l-192-193C800,103,794,94,849,39c20-20,39-29,61-29c28,0,63,30,298,262c147,144,272,271,279,282c30,51,23,60-219,304C947,1180,926,1196,870,1167z" />
                  </g>
                </svg>
              </a>
            </div>
          </>
        );
      case 'preview':
        return (
          <div className="project-preview-container">
            <div className="preview-header">
              <h4>Live Preview</h4>
              <div className="preview-controls">
                <a 
                  href={currentProject.previewUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="open-in-new-tab-button"
                >
                  Open in new tab
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </div>
            </div>
            <div className="iframe-container">
              <iframe
                src={currentProject.previewUrl}
                title={`${currentProject.title} Live Preview`}
                className="project-iframe"
                allowFullScreen
              />
            </div>
          </div>
        );
      case 'code':
        return (
          <div className="coming-soon-container">
            <div className="coming-soon-content">
              <div className="coming-soon-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
              </div>
              <h3>Code Preview Coming Soon</h3>
              <p>We're working on implementing CodeSandbox embeds to showcase the code for this project. Stay tuned for updates!</p>
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

      {/* Project Modal */}
      {modalOpen && currentProject && (
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
        </div>
      )}
    </div>
  );
};

export default WorksSection; 