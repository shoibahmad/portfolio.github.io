document.addEventListener('DOMContentLoaded', () => {

    // --- GRACEFUL LOADER REMOVAL ---
    const loader = document.querySelector('.loader');
    if (loader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.body.classList.remove('loading');
            }, 500); // Small delay for visual smoothness
        });
        // Failsafe: remove loader after 4 seconds regardless
        setTimeout(() => {
            document.body.classList.remove('loading');
        }, 4000);
    }

    // --- HEADER SCROLL EFFECT ---
    const header = document.querySelector('.header');
    if (header) {
        const handleScroll = () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check
    }

    // --- SMOOTH & ACCESSIBLE MOBILE NAVIGATION ---
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (navToggle && navMenu) {
        const toggleNav = () => {
            document.body.classList.toggle('nav-open');
            navToggle.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', document.body.classList.contains('nav-open'));
        };

        navToggle.addEventListener('click', toggleNav);

        // Close nav when a link is clicked
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (document.body.classList.contains('nav-open')) {
                    toggleNav();
                }
            });
        });
    }

    // --- INTERACTIVE "AURORA" CARD EFFECT ---
    const interactiveCards = document.querySelectorAll('.interactive-card');
    interactiveCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // --- SECTION REVEAL ON SCROLL ---
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: "0px 0px -100px 0px" });

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // --- UNIVERSAL OVERLAY/MODAL LOGIC ---
    const setupOverlay = (triggerSelector, overlayId, closeBtnSelector) => {
        const overlay = document.getElementById(overlayId);
        if (!overlay) return;

        const triggers = document.querySelectorAll(triggerSelector);
        const closeBtn = overlay.querySelector(closeBtnSelector);

        const openOverlay = (e) => {
            e.preventDefault();
            overlay.classList.add('visible');
            document.body.classList.add('overlay-open');
        };

        const closeOverlay = () => {
            overlay.classList.remove('visible');
            document.body.classList.remove('overlay-open');
        };

        triggers.forEach(trigger => trigger.addEventListener('click', openOverlay));
        if (closeBtn) closeBtn.addEventListener('click', closeOverlay);
        overlay.addEventListener('click', e => {
            if (e.target === overlay) closeOverlay();
        });
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && overlay.classList.contains('visible')) {
                closeOverlay();
            }
        });
    };

    setupOverlay('.resume-trigger', 'resume-overlay', '.resume-close-btn');

    // --- CONTACT FORM (EMAILJS + SWEETALERT) ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm && typeof emailjs !== 'undefined' && typeof Swal !== 'undefined') {
        emailjs.init({ publicKey: 'W-1fxkwC0rOyOEvqa' }); // YOUR PUBLIC KEY

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const serviceID = 'service_489558u'; // YOUR SERVICE ID
            const templateID = 'template_yufxy7b'; // YOUR TEMPLATE ID

            const swalOptions = {
                background: '#1e293b', // var(--color-surface)
                color: '#f8fafc', // var(--color-text-primary)
                confirmButtonColor: '#3b82f6', // var(--color-primary)
            };

            Swal.fire({
                title: 'Sending Message...',
                ...swalOptions,
                didOpen: () => Swal.showLoading(),
                allowOutsideClick: false
            });

            emailjs.sendForm(serviceID, templateID, this).then(() => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Your message has been sent. I will get back to you shortly.',
                    icon: 'success',
                    ...swalOptions
                });
                contactForm.reset();
            }, (err) => {
                Swal.fire({
                    title: 'Oops!',
                    text: 'Something went wrong. Please try again later.',
                    icon: 'error',
                    ...swalOptions
                });
                console.error('EmailJS Error:', JSON.stringify(err));
            });
        });
    }

    // === Terminal Typing Animation ===
    const typedElem = document.getElementById('terminal-typed');
    const cursorElem = document.getElementById('terminal-cursor');
    if (typedElem && cursorElem) {
        const lines = [
            'Hi, I\'m Shoib Ahmad',
            'Software Engineer',
            'Mobile & Backend Specialist'
        ];
        let line = 0, char = 0;
        function typeLine() {
            if (line < lines.length) {
                if (char < lines[line].length) {
                    typedElem.textContent += lines[line][char++];
                    setTimeout(typeLine, 60);
                } else {
                    typedElem.textContent += '\n';
                    char = 0;
                    line++;
                    setTimeout(typeLine, 700);
                }
            } else {
                cursorElem.style.display = 'inline-block';
            }
        }
        typedElem.textContent = '';
        cursorElem.style.display = 'inline-block';
        typeLine();
    }

    // === Particle Background ===
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    // === Project Filters ===
    function setupProjectFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Filter projects
                projectCards.forEach(card => {
                    const categories = card.dataset.category?.split(' ') || [];
                    if (filter === 'all' || categories.includes(filter)) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeIn 0.5s ease-out';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // === Interactive Timeline ===
    function toggleTimelineDetails(button) {
        const content = button.parentElement;
        const isExpanded = content.classList.contains('expanded');
        
        if (isExpanded) {
            content.classList.remove('expanded');
            button.innerHTML = '<span>View Details</span><i class="fas fa-chevron-down"></i>';
        } else {
            content.classList.add('expanded');
            button.innerHTML = '<span>Hide Details</span><i class="fas fa-chevron-up"></i>';
        }
    }

    // === Floating Action Button ===
    function setupFAB() {
        const fab = document.getElementById('scroll-to-top');
        if (!fab) return;
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                fab.classList.add('visible');
            } else {
                fab.classList.remove('visible');
            }
        });
        
        fab.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // === Custom Cursor ===
    function setupCustomCursor() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
        // Add hover effect for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .interactive-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }

    // === Enhanced Loader ===
    function setupEnhancedLoader() {
        const loaderText = document.getElementById('loader-text');
        const loaderCursor = document.getElementById('loader-cursor');
        const loaderProgress = document.getElementById('loader-progress');
        
        if (!loaderText || !loaderCursor || !loaderProgress) return;
        
        const messages = [
            'Initializing portfolio...',
            'Loading components...',
            'Setting up animations...',
            'Almost ready...',
            'Welcome!'
        ];
        
        let messageIndex = 0;
        let charIndex = 0;
        
        function typeMessage() {
            if (messageIndex < messages.length) {
                if (charIndex < messages[messageIndex].length) {
                    loaderText.textContent = messages[messageIndex].substring(0, charIndex + 1);
                    charIndex++;
                    setTimeout(typeMessage, 50);
                } else {
                    charIndex = 0;
                    messageIndex++;
                    setTimeout(typeMessage, 1000);
                }
            }
        }
        
        typeMessage();
    }

    // === Initialize All Features ===
    createParticles();
    setupProjectFilters();
    setupFAB();
    setupCustomCursor();
    setupEnhancedLoader();

    // Make timeline function global
    window.toggleTimelineDetails = toggleTimelineDetails;
});