document.addEventListener('DOMContentLoaded', () => {
  // 1. Typing Effect
  const words = ["Aspiring Software Developer", "Web & AI Enthusiast", "Data Analyst", "UI/UX Designer"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeTarget = document.getElementById('typewriter');

  function typeEffect() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typeTarget.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typeTarget.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 2000; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 500; // Pause before new word
    }

    setTimeout(typeEffect, typeSpeed);
  }

  // Start typing effect
  if (typeTarget) {
    setTimeout(typeEffect, 1000);
  }

  // 2. Scroll Reveal Animations (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal, .timeline-item');

  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add('active');
      // Optional: stop observing once revealed
      // observer.unobserve(entry.target);
    });
  }, revealOptions);

  revealElements.forEach(el => revealObserver.observe(el));

  // 3. 3D Tilt Effect for Cards
  const tiltElements = document.querySelectorAll('.tilt');

  tiltElements.forEach(tilt => {
    tilt.addEventListener('mousemove', handleTilt);
    tilt.addEventListener('mouseleave', resetTilt);
  });

  function handleTilt(e) {
    const card = this;
    const cardRect = card.getBoundingClientRect();
    const cardWidth = cardRect.width;
    const cardHeight = cardRect.height;
    const centerX = cardRect.left + cardWidth / 2;
    const centerY = cardRect.top + cardHeight / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const tiltX = (mouseY / (cardHeight / 2)) * -10; // Max tilt 10deg
    const tiltY = (mouseX / (cardWidth / 2)) * 10;

    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.transition = 'transform 0.1s ease';
  }

  function resetTilt() {
    this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    this.style.transition = 'transform 0.5s ease';
  }

  // 4. Smooth Scrolling for Navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetEl = document.querySelector(targetId);

      if (targetEl) {
        // Offset for sticky header
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  // 5. Mobile Menu Toggle (Hamburger)
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      // Very basic toggle, you can enhance this with a proper mobile menu slide
      if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
      } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'rgba(255, 255, 255, 0.95)';
        navLinks.style.padding = '2rem';
      }
    });
  }

  // 6. Contact Form Local Interceptor
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      if (window.location.protocol === 'file:') {
        e.preventDefault();
        alert("Success! \n\nNote: You are viewing this site locally (file://). The form submission was intercepted because FormSubmit requires the site to be hosted on a web server (like GitHub Pages or a live server). Once you publish the site online, the form will send emails directly to your inbox!");
        contactForm.reset();
      }
    });
  }
});
