/**
 * script.js — Solace Shared Script
 * Handles: Bottom Nav injection + active state
 */

(function() {
  const navHTML = `
<nav class="bottom-nav">
  <a href="dashboard.html" class="nav-item">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>
      <path d="M9 21V12h6v9"/>
    </svg>
    <span>Home</span>
  </a>
  <a href="mood-screen.html" class="nav-item">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
      <circle cx="12" cy="12" r="9"/>
      <path d="M8.5 14s1.5 2 3.5 2 3.5-2 3.5-2"/>
      <circle cx="9" cy="10" r="0.8" fill="currentColor"/>
      <circle cx="15" cy="10" r="0.8" fill="currentColor"/>
    </svg>
    <span>Mood</span>
  </a>
  <a href="journal.html" class="nav-item">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
    </svg>
    <span>Journal</span>
  </a>
  <a href="progress.html" class="nav-item">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
      <path d="M3 20h18M5 20V10m4 10V4m4 16v-7m4 7v-3"/>
    </svg>
    <span>Progress</span>
  </a>
  <a href="breathe.html" class="nav-item">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
      <path d="M12 2C6 2 3 7 3 12s3 10 9 10 9-5 9-10S18 2 12 2z"/>
      <path d="M8 12c0-2 1.5-4 4-4s4 2 4 4-1.5 4-4 4-4-2-4-4z"/>
    </svg>
    <span>Breathe</span>
  </a>
  <a href="support.html" class="nav-item">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
      <circle cx="12" cy="12" r="9"/>
      <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/>
      <circle cx="12" cy="17" r="0.6" fill="currentColor"/>
    </svg>
    <span>Help</span>
  </a>
</nav>
  `;

  // Only inject nav on pages that are NOT the landing page
  const isLanding = window.location.pathname.endsWith('index.html') ||
                    window.location.pathname === '/' ||
                    window.location.pathname.endsWith('/');

  if (!isLanding) {
    document.body.insertAdjacentHTML('beforeend', navHTML);

    // Set active state
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-item').forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage) {
        link.classList.add('active');
      }
    });
  }
})();
