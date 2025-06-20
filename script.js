document.addEventListener('DOMContentLoaded', () => {

    // --- PRELOADER & PAGE LOAD LOGIC ---
    const preloader = document.getElementById('preloader');
    document.body.classList.add('loading');

    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.classList.remove('loading');
            document.querySelectorAll('.hero__content > *').forEach((el, index) => {
                el.style.transitionDelay = `${index * 100}ms`;
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            });
        }, 3000);
    });
    
    // --- RELIABLE SCROLL-IN ANIMATION USING INTERSECTION OBSERVER ---
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    revealElements.forEach(el => observer.observe(el));

    // --- MOBILE NAVIGATION ---
    const navToggle = document.querySelector('.nav__toggle');
    navToggle.addEventListener('click', () => document.body.classList.toggle('nav-open'));
    document.querySelectorAll('.fullscreen-nav__link, .fullscreen-nav .resume-trigger').forEach(link => {
        link.addEventListener('click', () => document.body.classList.remove('nav-open'));
    });

    // --- HEADER HIDE ON SCROLL ---
    let lastScrollY = window.scrollY;
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (lastScrollY < window.scrollY && window.scrollY > header.offsetHeight) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
        lastScrollY = window.scrollY;
    });

    // --- CERTIFICATE MODAL ---
    const certificateModal = document.getElementById('certificateModal');
    const modalImg = document.getElementById('modalImage');
    const certCloseBtn = document.querySelector('#certificateModal .modal-close');
    document.querySelectorAll('.certificate__view-btn').forEach(button => {
        button.addEventListener('click', () => {
            modalImg.src = button.dataset.certificateSrc;
            certificateModal.classList.add('active');
            document.body.classList.add('modal-open');
        });
    });
    const closeCertModal = () => {
        certificateModal.classList.remove('active');
        document.body.classList.remove('modal-open');
    }
    if (certCloseBtn) certCloseBtn.addEventListener('click', closeCertModal);
    if (certificateModal) certificateModal.addEventListener('click', (e) => { if (e.target === certificateModal) closeCertModal(); });
    
    // --- EMAILJS & SWEETALERT CONTACT FORM ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        (function() { emailjs.init({ publicKey: 'W-1fxkwC0rOyOEvqa' }); })(); // REPLACE WITH YOUR KEY
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const serviceID = 'service_489558u'; // REPLACE
            const templateID = 'template_yufxy7b'; // REPLACE
            Swal.fire({ title: 'Sending...', text: 'Please wait...', didOpen: () => Swal.showLoading(), background: 'var(--card-color)', color: 'var(--text-primary)', allowOutsideClick: false });
            emailjs.sendForm(serviceID, templateID, this).then(() => {
                Swal.fire({ title: 'Success!', text: 'Your message has been sent.', icon: 'success', confirmButtonColor: 'var(--accent-primary)', background: 'var(--card-color)', color: 'var(--text-primary)' });
                contactForm.reset();
            }, (err) => {
                Swal.fire({ title: 'Error!', text: 'Something went wrong.', icon: 'error', confirmButtonColor: 'var(--accent-primary)', background: 'var(--card-color)', color: 'var(--text-primary)' });
            });
        });
    }

    // --- NEW: RESUME MODAL LOGIC ---
    const resumeModal = document.getElementById('resume-modal');
    const resumeTriggers = document.querySelectorAll('.resume-trigger');
    const resumeCloseBtn = document.querySelector('.resume-close-btn');

    const openResumeModal = (e) => {
        e.preventDefault();
        resumeModal.classList.add('active');
        document.body.classList.add('modal-open');
    };

    const closeResumeModal = () => {
        resumeModal.classList.remove('active');
        document.body.classList.remove('modal-open');
    };

    resumeTriggers.forEach(trigger => trigger.addEventListener('click', openResumeModal));
    if (resumeCloseBtn) resumeCloseBtn.addEventListener('click', closeResumeModal);
    if (resumeModal) resumeModal.addEventListener('click', (e) => {
        if (e.target === resumeModal) closeResumeModal();
    });

    // Close modals with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeCertModal();
            closeResumeModal();
        }
    });
});