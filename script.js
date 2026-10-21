  // ── SCRIPT DU MODE SOMBRE / CLAIR CORRIGÉ (Multi-boutons) ──
  const themeToggleBtns = document.querySelectorAll('.platform-theme-toggle');
  const currentTheme = localStorage.getItem('theme');
  
  if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
  }

  function toggleTheme() {
    let theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
  }

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', toggleTheme);
  });

  // Gestion de l'ouverture/fermeture du menu mobile
  function toggleMobileMenu(open) {
    const mobileMenu = document.getElementById('mobileMenu');
    if (open) {
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden'; 
    } else {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = ''; 
    }
  }

  // Gestion du Header lors du scroll
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // Toggle d'apparition du bouton au clic sur l'image
  function toggleProject(card, event) {
    if (event.target.closest('.btn-view-project')) return;

    const isActive = card.classList.contains('active-click');
    document.querySelectorAll('.gallery-card').forEach(c => c.classList.remove('active-click'));

    if (!isActive) {
      card.classList.add('active-click');
    }
  }

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.gallery-card')) {
      document.querySelectorAll('.gallery-card').forEach(card => card.classList.remove('active-click'));
    }
  });

  // Interversion des groupes de cartes au clic
  function changeGalleryView(index) {
    const dots = document.querySelectorAll('#galleryButtons .gallery-dot');
    const firstGroup = document.querySelectorAll('.gallery-card.page-1');
    const secondGroup = document.querySelectorAll('.gallery-card.page-2');
    
    dots.forEach((dot, idx) => {
      if(idx === index) dot.classList.add('active');
      else dot.classList.remove('active');
    });

    if (index === 0) {
      firstGroup.forEach(card => card.classList.remove('hidden-card'));
      secondGroup.forEach(card => card.classList.add('hidden-card'));
    } else {
      firstGroup.forEach(card => card.classList.add('hidden-card'));
      secondGroup.forEach(card => card.classList.remove('hidden-card'));
    }
  }

  // Accordéon FAQ Animé personnalisé
  function toggleFaq(trigger) {
    const item = trigger.parentElement;
    const isActive = item.classList.contains('active');
    
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
    
    if (!isActive) {
      item.classList.add('active');
    }
  }

  // ── JS DE DEFILEMENT (HIGHLIGHT DU MENU AU SCROLL) ──
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav-links .nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px'
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            if (id === 'gallery' && link.textContent.trim() === 'Projets') {
              link.classList.add('active');
            } else if (link.textContent.trim() !== 'Projets' || id !== 'gallery') {
              link.classList.remove('active');
            }
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));