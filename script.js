const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const contactForm = document.querySelector('#contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(contactForm);
    const name = String(data.get('name') || '').trim();
    const company = String(data.get('company') || '').trim();
    const project = String(data.get('project') || '').trim();

    const message = [
      'Olá! Quero conversar sobre um projeto com a SYNQORA.',
      '',
      `Nome: ${name}`,
      company ? `Empresa/projeto: ${company}` : '',
      `Ideia/objetivo: ${project}`,
    ]
      .filter(Boolean)
      .join('\n');

    const whatsappUrl = `https://wa.me/5561995289436?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  });
}

const revealTargets = document.querySelectorAll(
  '.solution-card, .process-item, .project-card, .map-node, .about-copy, .faq details'
);

if ('IntersectionObserver' in window) {
  revealTargets.forEach((element) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(18px)';
    element.style.transition = 'opacity .55s ease, transform .55s ease';
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  revealTargets.forEach((element) => observer.observe(element));
}
