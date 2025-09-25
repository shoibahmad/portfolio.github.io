document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Smooth Scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.skill-card, .project-card, .certificate-card, .stat-card, .contact-item');
    animateElements.forEach(el => observer.observe(el));

    // Counter Animation for Stats
    const statCards = document.querySelectorAll('.stat-card');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('h3');
                const target = parseInt(statNumber.textContent);
                animateCounter(statNumber, target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statCards.forEach(card => statsObserver.observe(card));

    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, 30);
    }

    // Contact Form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            try {
                // Initialize EmailJS
                if (typeof emailjs !== 'undefined') {
                    emailjs.init('W-1fxkwC0rOyOEvqa');
                    
                    await emailjs.sendForm('service_489558u', 'template_yufxy7b', contactForm);
                    
                    if (typeof Swal !== 'undefined') {
                        Swal.fire({
                            title: 'Message Sent!',
                            text: 'Thank you for your message. I\'ll get back to you soon!',
                            icon: 'success',
                            confirmButtonColor: '#667eea'
                        });
                    } else {
                        alert('Message sent successfully!');
                    }
                    
                    contactForm.reset();
                } else {
                    throw new Error('EmailJS not available');
                }
            } catch (error) {
                console.error('Error:', error);
                
                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        title: 'Message Received!',
                        text: 'Thank you! Please contact me directly at shoibsahmad@gmail.com',
                        icon: 'info',
                        confirmButtonColor: '#667eea'
                    });
                } else {
                    alert('Thank you! Please contact me directly at shoibsahmad@gmail.com');
                }
                
                contactForm.reset();
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // Resume Modal
    const resumeBtn = document.getElementById('resume-btn');
    if (resumeBtn) {
        resumeBtn.addEventListener('click', showResume);
    }

    function showResume() {
        const resumeHTML = `
            <div class="resume-modal" id="resume-modal">
                <div class="resume-content">
                    <div class="resume-header">
                        <h2>Shoib Ahmad - Resume</h2>
                        <button class="resume-close" onclick="closeResume()">&times;</button>
                    </div>
                    <div class="resume-body">
                        <div class="resume-section">
                            <h3>Contact Information</h3>
                            <p><strong>Email:</strong> shoibsahmad@gmail.com</p>
                            <p><strong>Phone:</strong> +91 8840324043</p>
                            <p><strong>Location:</strong> Lucknow, India</p>
                        </div>
                        
                        <div class="resume-section">
                            <h3>Professional Summary</h3>
                            <p>Passionate Software Engineer specializing in Flutter development, backend architecture, and machine learning. Experienced in building high-performance mobile applications and scalable systems.</p>
                        </div>
                        
                        <div class="resume-section">
                            <h3>Technical Skills</h3>
                            <div class="skills-list">
                                <div><strong>Mobile:</strong> Flutter, Dart, Android, iOS</div>
                                <div><strong>Backend:</strong> Firebase, REST APIs, Node.js, Python</div>
                                <div><strong>ML:</strong> Python, Flask, Scikit-learn, TensorFlow</div>
                                <div><strong>Other:</strong> Clean Architecture, SOLID Principles</div>
                            </div>
                        </div>
                        
                        <div class="resume-section">
                            <h3>Experience</h3>
                            <div class="experience-item">
                                <h4>Software Development Intern</h4>
                                <p><em>Jan 2025 - Jun 2025</em></p>
                                <p>Contributed to commercial Flutter codebases, implementing features and optimizing application performance.</p>
                            </div>
                            <div class="experience-item">
                                <h4>Technical Content Intern</h4>
                                <p><em>Jun 2023</em></p>
                                <p>Authored technical documentation and user guides, refining communication of complex system functionalities.</p>
                            </div>
                        </div>
                        
                        <div class="resume-section">
                            <h3>Projects</h3>
                            <div class="project-item">
                                <h4>IU CA Department App</h4>
                                <p>Comprehensive mobile application for Computer Applications department with student management and course tracking.</p>
                            </div>
                            <div class="project-item">
                                <h4>Finance Management App</h4>
                                <p>Personal finance tracking application with expense categorization and budget planning.</p>
                            </div>
                            <div class="project-item">
                                <h4>Salary Predictor ML</h4>
                                <p>Machine learning web application predicting employee salaries using advanced regression models.</p>
                            </div>
                        </div>
                        
                        <div class="resume-section">
                            <h3>Education</h3>
                            <p><strong>Master's in Computer Application</strong> - Currently Pursuing</p>
                        </div>
                        
                        <div class="resume-section">
                            <h3>Certificates</h3>
                            <ul>
                                <li>Deloitte Virtual Experience - Cyber Security, Tech Strategy, Data Analytics (2025)</li>
                                <li>Flutter Development Certification (2024)</li>
                                <li>Firebase Backend Development (2024)</li>
                                <li>Machine Learning with Python (2023)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', resumeHTML);
        document.body.style.overflow = 'hidden';
        
        // Add resume modal styles
        const resumeStyles = `
            <style>
                .resume-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.8);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    padding: 20px;
                }
                
                .resume-content {
                    background: white;
                    border-radius: 15px;
                    max-width: 800px;
                    width: 100%;
                    max-height: 90vh;
                    overflow-y: auto;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                }
                
                .resume-header {
                    padding: 2rem;
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    color: white;
                    border-radius: 15px 15px 0 0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .resume-close {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 2rem;
                    cursor: pointer;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background 0.3s;
                }
                
                .resume-close:hover {
                    background: rgba(255,255,255,0.2);
                }
                
                .resume-body {
                    padding: 2rem;
                }
                
                .resume-section {
                    margin-bottom: 2rem;
                }
                
                .resume-section h3 {
                    color: #667eea;
                    border-bottom: 2px solid #667eea;
                    padding-bottom: 0.5rem;
                    margin-bottom: 1rem;
                }
                
                .skills-list {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 0.5rem;
                }
                
                .experience-item, .project-item {
                    margin-bottom: 1.5rem;
                    padding: 1rem;
                    background: #f7fafc;
                    border-radius: 10px;
                    border-left: 4px solid #667eea;
                }
                
                .experience-item h4, .project-item h4 {
                    color: #2d3748;
                    margin-bottom: 0.5rem;
                }
                
                .experience-item em {
                    color: #667eea;
                    font-weight: 600;
                }
                
                .resume-section ul {
                    list-style: none;
                    padding-left: 0;
                }
                
                .resume-section li {
                    padding: 0.5rem 0;
                    border-bottom: 1px solid #e2e8f0;
                }
                
                @media (max-width: 768px) {
                    .resume-modal {
                        padding: 10px;
                    }
                    
                    .resume-header, .resume-body {
                        padding: 1.5rem;
                    }
                    
                    .skills-list {
                        grid-template-columns: 1fr;
                    }
                }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', resumeStyles);
    }

    window.closeResume = function() {
        const modal = document.getElementById('resume-modal');
        if (modal) {
            modal.remove();
            document.body.style.overflow = '';
        }
    }

    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        }
    });

    console.log('Portfolio loaded successfully! 🚀');
});