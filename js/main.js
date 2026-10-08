/**
 * BRUNO TAVARES - PSICÓLOGO (CRP 15/6694)
 * Interactive Landing Page Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Drawer Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      
      // Toggle icon between hamburger and close X
      const svg = mobileToggle.querySelector('svg');
      if (isOpen) {
        svg.innerHTML = `<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>`;
      } else {
        svg.innerHTML = `<line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>`;
      }
    });

    // Close menu when clicking link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const svg = mobileToggle.querySelector('svg');
        if (svg) {
          svg.innerHTML = `<line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>`;
        }
      });
    });
  }

  // 2. Header Scroll Effect
  const siteHeader = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  });

  // 3. FAQ Accordion Logic
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const button = item.querySelector('.faq-button');
    button.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other open FAQ items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });

      // Toggle clicked item
      item.classList.toggle('active', !isActive);
    });
  });

  // 4. WhatsApp Direct Links with Custom Pre-formatted Messages
  const defaultWhatsAppNumber = "5582991246860"; // Format: Country + Area + Phone
  
  window.openWhatsApp = function (topic = "") {
    let message = "Olá, Psicólogo Bruno Tavares! Vim pelo seu site e gostaria de tirar dúvidas e consultar horários disponíveis para atendimento.";
    
    if (topic && topic.trim() !== "") {
      message = `Olá, Psicólogo Bruno Tavares! Gostaria de mais informações sobre o tratamento de *${topic}* e consultar os horários para agendamento.`;
    }
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${defaultWhatsAppNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  // 5. Scroll Animations (IntersectionObserver)
  const fadeElements = document.querySelectorAll('.fade-in-up');
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));
  } else {
    fadeElements.forEach(el => el.classList.add('visible'));
  }
});
