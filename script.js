document.addEventListener('DOMContentLoaded', () => {
    // Remove loading class after page loads
    window.addEventListener('load', () => {
        document.body.classList.remove('loading');
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        lastScrollY = currentScrollY;
    }, { passive: true });

    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');

    if (navToggle && navList) {
        navToggle.addEventListener('click', () => {
            const isActive = navList.classList.contains('active');
            
            if (isActive) {
                navList.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            } else {
                navList.classList.add('active');
                navToggle.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navList.contains(e.target)) {
                navList.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Smooth scrolling for navigation links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for animations
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
    const animateElements = document.querySelectorAll('.skill-card, .project-card, .stat, .timeline-item');
    animateElements.forEach(el => observer.observe(el));

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        // Initialize EmailJS if available
        if (typeof emailjs !== 'undefined') {
            emailjs.init({ publicKey: 'W-1fxkwC0rOyOEvqa' });
        }

        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            try {
                if (typeof emailjs !== 'undefined' && typeof Swal !== 'undefined') {
                    // Use EmailJS if available
                    const serviceID = 'service_489558u';
                    const templateID = 'template_yufxy7b';
                    
                    await emailjs.sendForm(serviceID, templateID, this);
                    
                    // Show success message
                    Swal.fire({
                        title: 'Message Sent!',
                        text: 'Thank you for your message. I\'ll get back to you soon!',
                        icon: 'success',
                        confirmButtonColor: '#3b82f6',
                        confirmButtonText: 'Great!'
                    });
                    
                    // Reset form
                    contactForm.reset();
                } else {
                    // Fallback for when EmailJS is not available
                    throw new Error('EmailJS not available');
                }
            } catch (error) {
                console.error('Error sending email:', error);
                
                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        title: 'Message Received!',
                        text: 'Thank you for your message! Please contact me directly at shoibsahmad@gmail.com',
                        icon: 'info',
                        confirmButtonColor: '#3b82f6',
                        confirmButtonText: 'Got it!'
                    });
                } else {
                    alert('Thank you for your message! Please contact me directly at shoibsahmad@gmail.com');
                }
                
                // Reset form
                contactForm.reset();
            } finally {
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        const highlightStart = text.indexOf('Shoib Ahmad');
        
        if (highlightStart !== -1) {
            const beforeHighlight = text.substring(0, highlightStart);
            const highlightText = 'Shoib Ahmad';
            const afterHighlight = text.substring(highlightStart + highlightText.length);
            
            heroTitle.innerHTML = `${beforeHighlight}<span class="highlight">${highlightText}</span>${afterHighlight}`;
        }
    }

    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Add counter animation for stats
    const stats = document.querySelectorAll('.stat h3');
    const animateCounter = (element) => {
        const target = parseInt(element.textContent);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, 16);
    };

    // Observe stats for counter animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('h3');
                if (statNumber && !statNumber.classList.contains('animated')) {
                    statNumber.classList.add('animated');
                    animateCounter(statNumber);
                }
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat').forEach(stat => {
        statsObserver.observe(stat);
    });

    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }, { passive: true });
    }

    // Add active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }, { passive: true });

    // Add smooth reveal animations
    const revealElements = document.querySelectorAll('.skill-card, .project-card, .stat, .timeline-entry, .contact-item');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });



    // Add typing effect for hero subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroSubtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }



    // Resume functionality
    const resumeBtn = document.getElementById('resume-btn');
    if (resumeBtn) {
        resumeBtn.addEventListener('click', () => {
            showResume();
        });
    }

    function showResume() {
        const resumeHTML = `
            <div class="resume-modal" id="resume-modal">
                <div class="resume-content">
                    <div class="resume-header">
                        <button class="resume-close" onclick="closeResume()">&times;</button>
                        <h2>Shoib Ahmad - Resume</h2>
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
                            <div class="skills-grid">
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
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', resumeHTML);
        document.body.style.overflow = 'hidden';
    }

    window.closeResume = function() {
        const modal = document.getElementById('resume-modal');
        if (modal) {
            modal.remove();
            document.body.style.overflow = '';
        }
    }

    console.log('Portfolio loaded successfully! 🚀');
});