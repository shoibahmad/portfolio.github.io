document.addEventListener('DOMContentLoaded', function () {
    // --- Navbar Toggle ---
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');
    burgerMenu.addEventListener('click', function () {
      navLinks.classList.toggle('active');
    });
  
    // --- Typed Animation ---
    const typedTextSpan = document.getElementById('typed-text');
    const typedText = typedTextSpan?.textContent || '';
    typedTextSpan.textContent = '';
    let typedIndex = 0;
    function type() {
      if (typedIndex < typedText.length) {
        typedTextSpan.textContent += typedText.charAt(typedIndex);
        typedIndex++;
        setTimeout(type, 70);
      }
    }
    type();
  
    // --- GSAP Animations ---
    gsap.registerPlugin(ScrollTrigger);
  
    // Hero Section
    const heroTimeline = gsap.timeline();
    heroTimeline
      .fromTo(
        '#hero-section .hero-container h1',
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }
      )
      .fromTo(
        '#hero-section .hero-container p',
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        '-=0.2'
      )
      .fromTo(
        '#hero-section .social-links a',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, stagger: 0.2, duration: 0.5 },
        '-=0.4'
      );
  
    // Scroll-triggered Sections
    const sections = [
      { selector: '#about-section h2', duration: 0.6 },
      { selector: '#about-section .about-content', duration: 0.8 },
      { selector: '#about-section .skills', duration: 0.8 },
      { selector: '#projects-section h2', duration: 0.6 },
      { selector: '#projects-section .project-grid', duration: 0.8 },
      { selector: '#certificates-section h2', duration: 0.6 },
      { selector: '#certificates-section .certificate-grid', duration: 0.8 },
      { selector: '#contact-section h2', duration: 0.6 },
      { selector: '#contact-section .contact-form', duration: 0.8 },
      { selector: '#contact-section .contact-card', duration: 0.8 },
    ];
  
    sections.forEach((section) => {
      gsap.fromTo(
        section.selector,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: section.duration,
          scrollTrigger: {
            trigger: section.selector,
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  
    // --- Skill Bar Fill Animation ---
    const skillLevels = document.querySelectorAll('.skill-level');
    skillLevels.forEach((skillLevel) => {
      const percentage = skillLevel.dataset.level;
      skillLevel.style.width = percentage + '%';
    });
  
    // --- Certificate Image Zoom Handler ---
    const img = document.getElementById('certificate-card');
    const btn = document.getElementById('certi-button');
  
    if (btn && img) {
      btn.addEventListener('click', function () {
        img.classList.toggle('zooming-img');
      });
    }
  });
  