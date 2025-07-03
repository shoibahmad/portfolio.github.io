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
});