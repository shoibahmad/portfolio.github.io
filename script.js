document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navToggle) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Smooth Scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
    }, { passive: true });

    // Scroll reveal animations
    const revealElements = document.querySelectorAll('.experience-item, .education-item, .skill-category, .project-item, .certification-item');
    
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

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            if (scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        }, { passive: true });
    }

    // Contact Form Enhancement
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input, textarea');
        
        // Add focus effects
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.style.transform = 'scale(1.02)';
                input.parentElement.style.transition = 'transform 0.3s ease';
            });
            
            input.addEventListener('blur', () => {
                input.parentElement.style.transform = 'scale(1)';
            });
        });

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            submitBtn.style.transform = 'scale(0.95)';
            
            try {
                if (typeof emailjs !== 'undefined') {
                    emailjs.init('W-1fxkwC0rOyOEvqa');
                    await emailjs.sendForm('service_489558u', 'template_yufxy7b', contactForm);
                    
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                    submitBtn.style.background = 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)';
                    submitBtn.style.transform = 'scale(1)';
                    
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
                
                submitBtn.innerHTML = '<i class="fas fa-exclamation"></i> Error';
                submitBtn.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
                
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
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    submitBtn.style.transform = 'scale(1)';
                }, 2000);
            }
        });
    }

    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            });
        }
    });

    // Resume Modal Functionality
    const resumeBtn = document.getElementById('resume-btn');
    const resumeModal = document.getElementById('resume-modal');
    const closeResumeBtn = document.getElementById('close-resume');
    const resumeOverlay = document.querySelector('.resume-overlay');

    if (resumeBtn && resumeModal) {
        resumeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            resumeModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    const closeResume = () => {
        if (resumeModal) {
            resumeModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    if (closeResumeBtn) {
        closeResumeBtn.addEventListener('click', closeResume);
    }

    if (resumeOverlay) {
        resumeOverlay.addEventListener('click', closeResume);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && resumeModal && resumeModal.classList.contains('active')) {
            closeResume();
        }
    });

    // Scroll Progress Indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    }, { passive: true });

    // Magnetic Button Effect
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });

    // Tilt Effect for Cards
    const cards = document.querySelectorAll('.project-item, .skill-category, .education-item');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // Cursor Trail Effect
    let particles = [];
    const maxParticles = 20;
    
    document.addEventListener('mousemove', (e) => {
        if (window.innerWidth > 768 && particles.length < maxParticles && Math.random() > 0.95) {
            createParticle(e.clientX, e.clientY);
        }
    });

    function createParticle(x, y) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        particle.style.opacity = '0.6';
        particle.style.transition = 'all 1s ease-out';
        
        document.body.appendChild(particle);
        particles.push(particle);
        
        setTimeout(() => {
            particle.style.transform = `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px)`;
            particle.style.opacity = '0';
        }, 10);
        
        setTimeout(() => {
            particle.remove();
            particles = particles.filter(p => p !== particle);
        }, 1000);
    }

    // Typing effect for hero subtitle
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        let i = 0;
        
        const typeWriter = () => {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        setTimeout(typeWriter, 500);
    }

    // Add ripple effect to buttons
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            ripple.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    console.log('%c✨ Portfolio Loaded Successfully!', 'color: #667eea; font-size: 20px; font-weight: bold;');
    console.log('%c🚀 Built with passion by Shoib Ahmad', 'color: #764ba2; font-size: 14px;');
});
