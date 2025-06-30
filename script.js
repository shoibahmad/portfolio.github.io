document.addEventListener('DOMContentLoaded', () => {

    // --- LOADER LOGIC ---
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.classList.remove('loading');
        }, 600); // Slight delay for smoothness
    });

    // --- HEADER SCROLL EFFECT ---
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // --- MOBILE NAV TOGGLE ---
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            navToggle.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });
        // Close nav on link click (mobile)
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                navToggle.classList.remove('active');
                document.body.classList.remove('nav-open');
            });
        });
    }

    // --- SECTION REVEAL ANIMATIONS ---
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.delay) || 0;
                entry.target.style.transitionDelay = `${delay}ms`;
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: "0px 0px -100px 0px" });

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // --- UNIVERSAL OVERLAY/MODAL LOGIC ---
    function setupOverlay(triggerSelector, overlayId, closeBtnSelector) {
        const overlay = document.getElementById(overlayId);
        if (!overlay) return { openOverlay: () => {}, closeOverlay: () => {} };
        
        const triggers = document.querySelectorAll(triggerSelector);
        const closeBtn = overlay.querySelector(closeBtnSelector);
        
        const openOverlay = (e) => {
            e.preventDefault();
            overlay.classList.add('visible');
            document.body.classList.add('overlay-open');
            // Focus for accessibility
            setTimeout(() => closeBtn && closeBtn.focus(), 200);
            return e.currentTarget; 
        };
        
        const closeOverlay = () => {
            overlay.classList.remove('visible');
            document.body.classList.remove('overlay-open');
        };

        triggers.forEach(trigger => trigger.addEventListener('click', openOverlay));
        if (closeBtn) closeBtn.addEventListener('click', closeOverlay);
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeOverlay();
        });

        return { openOverlay, closeOverlay };
    }

    const { closeOverlay: closeResumeOverlay } = setupOverlay('.resume-trigger', 'resume-overlay', '.resume-close-btn');

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeResumeOverlay();
        }
    });

    // --- CONTACT FORM LOGIC (EMAILJS + SWEETALERT) ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm && typeof emailjs !== 'undefined') {
        emailjs.init({ publicKey: 'W-1fxkwC0rOyOEvqa' }); // YOUR PUBLIC KEY

        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const serviceID = 'service_489558u'; // YOUR SERVICE ID
            const templateID = 'template_yufxy7b'; // YOUR TEMPLATE ID

            const swalOptions = {
                background: 'var(--color-surface)',
                color: 'var(--color-text-primary)',
                confirmButtonColor: 'var(--color-primary)',
            };

            Swal.fire({
                title: 'Sending...',
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
                    title: 'Error!',
                    text: 'Something went wrong. Please try again later.',
                    icon: 'error',
                    ...swalOptions
                });
                console.error('EmailJS Error:', JSON.stringify(err));
            });
        });
    }

    // --- PROJECT CARD RIPPLE EFFECT ---
    document.querySelectorAll('.projects-grid .project-card').forEach(card => {
        card.addEventListener('click', function(e) {
            // Remove any existing ripple
            const oldRipple = this.querySelector('.ripple');
            if (oldRipple) oldRipple.remove();

            // Calculate position
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            this.appendChild(ripple);

            // Remove ripple after animation
            ripple.addEventListener('animationend', () => {
                ripple.remove();
            });
        });
    });
});