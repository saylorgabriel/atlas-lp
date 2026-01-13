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
 * Typing Animation
 * Simulates ATLAS response in terminal
 */
function initTypingAnimation() {
  const atlasResponse = document.getElementById('atlasResponse');
  if (!atlasResponse) return;

  const responseText = `Aqui está o resumo das últimas 50 mensagens:

• 12 mensagens sobre o projeto Alpha
• 8 menções de reunião amanhã às 14h
• 5 action items pendentes
• Sentimento geral: positivo (78%)

Posso detalhar algum ponto específico?`;

  // Wait 3 seconds then show response
  setTimeout(() => {
    const messageText = atlasResponse.querySelector('.message-text');
    if (!messageText) return;

    // Clear typing indicator
    messageText.innerHTML = '';

    let charIndex = 0;
    const typeSpeed = 20; // ms per character

    function type() {
      if (charIndex < responseText.length) {
        const char = responseText[charIndex];

        if (char === '\n') {
          messageText.innerHTML += '<br>';
        } else {
          messageText.innerHTML += char;
        }

        charIndex++;
        setTimeout(type, typeSpeed);
      } else {
        // Add time after typing completes
        const timeSpan = document.createElement('span');
        timeSpan.className = 'message-time';
        timeSpan.textContent = '14:33';
        atlasResponse.appendChild(timeSpan);
      }
    }

    type();
  }, 3000);
}

/**
 * Smooth Scroll
 * Enhanced smooth scrolling for anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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
  card.addEventListener('mouseenter', function() {
    // Add slight scale to icon
    const icon = this.querySelector('.feature-icon');
    if (icon) {
      icon.style.transform = 'scale(1.1) rotate(5deg)';
    }
  });

  card.addEventListener('mouseleave', function() {
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
  button.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const strength = 0.15;
    this.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  });

  button.addEventListener('mouseleave', function() {
    this.style.transform = '';
  });
});

/**
 * Terminal Messages Animation
 * Add new messages periodically
 */
const terminalMessages = [
  { author: 'Maria', text: 'Atlas: quem mais falou hoje?', time: '14:35' },
  { author: '🤖 ATLAS', text: 'Os 3 mais ativos hoje:\n1. João (45 msgs)\n2. Pedro (32 msgs)\n3. Ana (28 msgs)', time: '14:35', isAtlas: true }
];

let messageIndex = 0;

function addTerminalMessage() {
  const terminalBody = document.querySelector('.terminal-body');
  if (!terminalBody || messageIndex >= terminalMessages.length) return;

  const msg = terminalMessages[messageIndex];

  const messageEl = document.createElement('div');
  messageEl.className = `message ${msg.isAtlas ? 'outgoing' : 'incoming'}`;
  messageEl.innerHTML = `
    <span class="message-author">${msg.author}</span>
    <span class="message-text">${msg.text.replace(/\n/g, '<br>')}</span>
    <span class="message-time">${msg.time}</span>
  `;

  terminalBody.appendChild(messageEl);
  messageIndex++;

  // Scroll to bottom
  terminalBody.scrollTop = terminalBody.scrollHeight;
}

// Add messages after initial typing animation
setTimeout(() => {
  setInterval(addTerminalMessage, 5000);
}, 10000);

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
console.log('%c🤖 ATLAS', 'font-size: 24px; font-weight: bold; color: #10b981;');
console.log('%cWhatsApp AI Copilot', 'font-size: 14px; color: #6ee7b7;');
console.log('%cOpen source: github.com/saylorgabriel/atlas', 'font-size: 12px; color: #888;');
