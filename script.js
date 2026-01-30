/**
 * ATLAS Landing Page - Interactions
 * ==================================
 * Smooth micro-interactions and animations
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  initCursorGlow();
  initScrollAnimations();
  initCounters();
  initTypingAnimation();
  initSmoothScroll();
  initNavHighlight();
});

/**
 * Cursor Glow Effect (Desktop Only)
 * Follows cursor with a soft emerald glow
 */
function initCursorGlow() {
  const cursorGlow = document.getElementById('cursorGlow');
  if (!cursorGlow) return;

  // Only enable on devices with hover capability
  if (!window.matchMedia('(hover: hover)').matches) return;

  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;
  let isActive = false;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isActive) {
      isActive = true;
      cursorGlow.classList.add('active');
      requestAnimationFrame(updateCursor);
    }
  });

  document.addEventListener('mouseleave', () => {
    isActive = false;
    cursorGlow.classList.remove('active');
  });

  function updateCursor() {
    if (!isActive) return;

    // Smooth interpolation
    const ease = 0.08;
    currentX += (mouseX - currentX) * ease;
    currentY += (mouseY - currentY) * ease;

    cursorGlow.style.left = `${currentX}px`;
    cursorGlow.style.top = `${currentY}px`;

    requestAnimationFrame(updateCursor);
  }
}

/**
 * Scroll-triggered Animations
 * Reveals elements as they enter the viewport
 */
function initScrollAnimations() {
  // Add data-animate to sections
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.setAttribute('data-animate', '');
  });

  // Add stagger animation to grids
  const grids = document.querySelectorAll('.features-grid, .use-cases-grid, .metrics-grid, .commands-grid');
  grids.forEach(grid => {
    grid.setAttribute('data-animate-stagger', '');
  });

  // Intersection Observer
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Trigger counters when metrics section is visible
        if (entry.target.classList.contains('metrics')) {
          triggerCounters();
        }
      }
    });
  }, observerOptions);

  // Observe all animated elements
  document.querySelectorAll('[data-animate], [data-animate-stagger]').forEach(el => {
    observer.observe(el);
  });
}

/**
 * Animated Counters
 * Count up animation for metrics
 */
let countersTriggered = false;

function initCounters() {
  // Counters will be triggered by scroll animation
}

function triggerCounters() {
  if (countersTriggered) return;
  countersTriggered = true;

  const counters = document.querySelectorAll('.metric-number[data-target]');

  counters.forEach(counter => {
    const target = parseInt(counter.dataset.target);
    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      const current = Math.floor(target * easeProgress);
      counter.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    }

    requestAnimationFrame(updateCounter);
  });
}

/**
 * Terminal Demo Scenarios
 * Shows different use cases in a loop
 */
const demoScenarios = [
  {
    question: 'Atlas: status do projeto Alpha?',
    answer: `📊 Projeto Alpha — Status Consolidado:

• Progresso: 73% concluído (+12% essa semana)
• Margem projetada: R$ 45k (+39% vs estimativa)
• 3 entregas pendentes até sexta-feira
• ⚠️ Rodrigo aguardando aprovação do orçamento

Quer que eu detalhe as entregas pendentes?`
  },
  {
    question: 'Atlas: me lembre do aniversário da Carol no sábado de manhã',
    answer: `✅ Lembrete agendado!

🎂 Aniversário da Carol
📅 Sábado, 08:00

Vou te avisar no sábado às 8h da manhã.

Quer que eu sugira uma mensagem de parabéns?`
  },
  {
    question: 'Atlas: agende um alerta para emitir notas todo dia 1',
    answer: `✅ Alerta recorrente criado!

📋 Emitir notas fiscais
🔄 Todo dia 1 de cada mês, às 09:00

Próximo alerta: 01/02 às 09:00

Posso adicionar mais detalhes ao lembrete?`
  },
  {
    question: 'Atlas: previsão do tempo em Floripa esse fim de semana?',
    answer: `🌤️ Florianópolis — Fim de Semana:

Sábado:
• ☀️ 28°C, sol com algumas nuvens
• 💧 10% chance de chuva
• 🌊 Mar calmo, ótimo pra praia!

Domingo:
• ⛅ 26°C, parcialmente nublado
• 💧 30% chance de chuva à tarde

Quer que eu avise se a previsão mudar?`
  },
  {
    question: 'Atlas: posta no Twitter: Lançando o Atlas em breve! 🚀',
    answer: `✅ Tweet publicado com sucesso!

🐦 @seuuser:
"Lançando o Atlas em breve! 🚀"

📊 Você pode acompanhar as métricas depois.

Quer agendar mais posts?`
  },
  {
    question: 'Atlas: resumo da reunião de ontem?',
    answer: `📝 Reunião de Alinhamento (ontem, 15h):

• Decisão: lançamento adiado para dia 20
• Budget aprovado: R$ 32k para marketing
• Próximos passos: João faz cronograma até sexta
• Pendência: aguardando contrato assinado

Participantes: João, Maria, Pedro, Cliente`
  }
];

let currentScenario = 0;

function initTypingAnimation() {
  const terminalBody = document.querySelector('.terminal-body');
  if (!terminalBody) return;

  function showScenario(index) {
    const scenario = demoScenarios[index];

    // Clear terminal
    terminalBody.innerHTML = '';

    // Create question message
    const questionMsg = document.createElement('div');
    questionMsg.className = 'message incoming';
    questionMsg.innerHTML = `
      <span class="message-author">João</span>
      <span class="message-text">${scenario.question}</span>
      <span class="message-time">14:32</span>
    `;
    terminalBody.appendChild(questionMsg);

    // Create answer message with typing indicator
    const answerMsg = document.createElement('div');
    answerMsg.className = 'message outgoing typing';
    answerMsg.innerHTML = `
      <span class="message-author">🤖 ATLAS COPILOT</span>
      <span class="message-text">
        <span class="typing-indicator">
          <span></span><span></span><span></span>
        </span>
      </span>
    `;
    terminalBody.appendChild(answerMsg);

    // Start typing after delay
    setTimeout(() => {
      const messageText = answerMsg.querySelector('.message-text');
      messageText.innerHTML = '';
      answerMsg.classList.remove('typing');

      let charIndex = 0;
      const typeSpeed = 18;

      function type() {
        if (charIndex < scenario.answer.length) {
          const char = scenario.answer[charIndex];
          messageText.innerHTML += char === '\n' ? '<br>' : char;
          charIndex++;
          setTimeout(type, typeSpeed);
        } else {
          // Add time after typing
          const timeSpan = document.createElement('span');
          timeSpan.className = 'message-time';
          timeSpan.textContent = '14:33';
          answerMsg.appendChild(timeSpan);

          // Wait then show next scenario
          setTimeout(() => {
            currentScenario = (currentScenario + 1) % demoScenarios.length;
            showScenario(currentScenario);
          }, 5000); // 5s pause before next
        }
      }

      type();
    }, 2000); // 2s typing indicator
  }

  // Start first scenario
  setTimeout(() => showScenario(0), 1000);
}

/**
 * Smooth Scroll
 * Enhanced smooth scrolling for anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      const navHeight = 80; // Account for fixed nav
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      // Update URL without jumping
      history.pushState(null, null, targetId);
    });
  });
}

/**
 * Navigation Highlight
 * Highlights current section in navigation
 */
function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');

        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });
}

/**
 * Parallax Effect on Floating Cards
 * Subtle movement based on scroll
 */
function initParallax() {
  const floatingCards = document.querySelectorAll('.floating-card');
  if (!floatingCards.length) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.pageYOffset;

        floatingCards.forEach((card, index) => {
          const speed = 0.05 * (index + 1);
          const yPos = scrollY * speed;
          card.style.transform = `translateY(${yPos}px)`;
        });

        ticking = false;
      });
      ticking = true;
    }
  });
}

/**
 * Feature Card Hover Effects
 * Enhanced interactions on hover
 */
document.querySelectorAll('.feature-card').forEach(card => {
  card.addEventListener('mouseenter', function () {
    // Add slight scale to icon
    const icon = this.querySelector('.feature-icon');
    if (icon) {
      icon.style.transform = 'scale(1.1) rotate(5deg)';
    }
  });

  card.addEventListener('mouseleave', function () {
    const icon = this.querySelector('.feature-icon');
    if (icon) {
      icon.style.transform = '';
    }
  });
});

/**
 * Magnetic Button Effect
 * Buttons slightly follow cursor
 */
document.querySelectorAll('.btn-primary, .nav-cta').forEach(button => {
  button.addEventListener('mousemove', function (e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const strength = 0.15;
    this.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  });

  button.addEventListener('mouseleave', function () {
    this.style.transform = '';
  });
});

// Terminal demo scenarios are now handled by initTypingAnimation() with loop

/**
 * Performance: Reduce animations on low-power devices
 */
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.style.setProperty('--transition-default', 'none');
  document.documentElement.style.setProperty('--transition-fast', 'none');
  document.documentElement.style.setProperty('--transition-slow', 'none');
}

/**
 * Console Easter Egg
 */
console.log('%c🤖 ATLAS COPILOT', 'font-size: 24px; font-weight: bold; color: #10b981;');
console.log('%cWhatsApp AI Copilot', 'font-size: 14px; color: #6ee7b7;');
// console.log('%cOpen source: github.com/saylorgabriel/atlas', 'font-size: 12px; color: #888;');

/**
 * Lead Capture Modal
 * Handles modal open/close and form submission to Google Sheets
 */

// IMPORTANTE: Substitua esta URL pela URL do seu Google Apps Script
// Veja as instruções no README para configurar
const GOOGLE_SHEETS_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbwtAsYewMkjhyAC7ocwYZqtuwKnoTfXhTBYJm7rUad4wgWbZ54Nqo4lPCEHSwGh6WUC/exec';

function initLeadModal() {
  const modal = document.getElementById('leadModal');
  const modalClose = document.getElementById('modalClose');
  const leadForm = document.getElementById('leadForm');
  const submitBtn = document.getElementById('submitBtn');
  const modalSuccess = document.getElementById('modalSuccess');

  if (!modal || !leadForm) return;

  // Open modal function
  window.openLeadModal = function () {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Track event in GA4
    if (typeof gtag !== 'undefined') {
      gtag('event', 'modal_open', {
        'event_category': 'lead_capture',
        'event_label': 'lead_modal'
      });
    }
  };

  // Close modal function
  window.closeLeadModal = function () {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  // Close button click
  modalClose.addEventListener('click', closeLeadModal);

  // Click outside to close
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeLeadModal();
    }
  });

  // ESC key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeLeadModal();
    }
  });

  // Intercept CTA button clicks
  document.querySelectorAll('a[href="#cta"], .nav-cta').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openLeadModal();
    });
  });

  // Form submission
  leadForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('leadEmail').value.trim();
    const whatsapp = document.getElementById('leadWhatsapp').value.trim();

    if (!email) return;

    // Show loading state
    submitBtn.classList.add('loading');

    try {
      // Send to Google Sheets
      if (GOOGLE_SHEETS_WEBHOOK_URL !== 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
        await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            whatsapp: whatsapp,
            timestamp: new Date().toISOString(),
            source: window.location.href
          })
        });
      }

      // Track conversion in GA4
      if (typeof gtag !== 'undefined') {
        gtag('event', 'lead_captured', {
          'event_category': 'lead_capture',
          'event_label': email
        });
        // Google Ads conversion tracking
        gtag('event', 'conversion', { 'send_to': 'AW-975619354/E3PzCPqp9OYBEJqKm9ED' });
      }

      // Show success state
      leadForm.classList.add('hidden');
      modalSuccess.classList.add('show');

      // Auto close after 3 seconds
      setTimeout(() => {
        closeLeadModal();
        // Reset form for next use
        setTimeout(() => {
          leadForm.classList.remove('hidden');
          modalSuccess.classList.remove('show');
          leadForm.reset();
        }, 300);
      }, 3000);

    } catch (error) {
      console.error('Error submitting lead:', error);
      // Still show success (form submitted via no-cors)
      leadForm.classList.add('hidden');
      modalSuccess.classList.add('show');
    } finally {
      submitBtn.classList.remove('loading');
    }
  });

  // Phone input mask (Brazilian format)
  const whatsappInput = document.getElementById('leadWhatsapp');
  whatsappInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');

    if (value.length > 11) {
      value = value.slice(0, 11);
    }

    if (value.length > 0) {
      if (value.length <= 2) {
        value = `(${value}`;
      } else if (value.length <= 7) {
        value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      } else {
        value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
      }
    }

    e.target.value = value;
  });
}

// Initialize modal when DOM is ready
document.addEventListener('DOMContentLoaded', initLeadModal);
