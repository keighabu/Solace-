/**
 * script.js — Solace Shared Script
 * Handles: Wave Bottom Nav injection + active state
 */
(function() {

  var navHTML = '<nav class="bottom-nav">' +
    '<a href="mood-screen.html" class="nav-item" data-page="mood-screen.html">' +
      '<div class="nav-icon-wrap">' +
        '<div class="nav-icon-bg"></div>' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8">' +
          '<circle cx="12" cy="12" r="9"/>' +
          '<path d="M8.5 14s1.5 2 3.5 2 3.5-2 3.5-2"/>' +
          '<circle cx="9" cy="10" r="0.8" fill="white"/>' +
          '<circle cx="15" cy="10" r="0.8" fill="white"/>' +
        '</svg>' +
      '</div>' +
      '<span>Mood</span>' +
    '</a>' +
    '<a href="journal.html" class="nav-item" data-page="journal.html">' +
      '<div class="nav-icon-wrap">' +
        '<div class="nav-icon-bg"></div>' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8">' +
          '<path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>' +
          '<path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>' +
        '</svg>' +
      '</div>' +
      '<span>Journal</span>' +
    '</a>' +
    
    '<a href="progress.html" class="nav-item" data-page="progress.html">' +
      '<div class="nav-icon-wrap">' +
        '<div class="nav-icon-bg"></div>' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8">' +
          '<path d="M3 20h18M5 20V10m4 10V4m4 16v-7m4 7v-3"/>' +
        '</svg>' +
      '</div>' +
      '<span>Progress</span>' +
    '</a>' +
    '<a href="dashboard.html" class="nav-item nav-home" data-page="dashboard.html">' +
      '<div class="nav-icon-wrap">' +
        '<div class="nav-icon-bg"></div>' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8">' +
          '<path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>' +
          '<path d="M9 21V12h6v9"/>' +
        '</svg>' +
      '</div>' +
      '<span>Home</span>' +
    '</a>' +
    '<a href="breathe.html" class="nav-item" data-page="breathe.html">' +
      '<div class="nav-icon-wrap">' +
        '<div class="nav-icon-bg"></div>' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8">' +
          '<path d="M12 2C6 2 3 7 3 12s3 10 9 10 9-5 9-10S18 2 12 2z"/>' +
          '<path d="M8 12c0-2 1.5-4 4-4s4 2 4 4-1.5 4-4 4-4-2-4-4z"/>' +
        '</svg>' +
      '</div>' +
      '<span>Breathe</span>' +
    '</a>' +
    '<a href="support.html" class="nav-item" data-page="support.html">' +
      '<div class="nav-icon-wrap">' +
        '<div class="nav-icon-bg"></div>' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8">' +
          '<circle cx="12" cy="12" r="9"/>' +
          '<path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/>' +
          '<circle cx="12" cy="17" r="0.6" fill="white"/>' +
        '</svg>' +
      '</div>' +
      '<span>Help</span>' +
    '</a>' +
    '<a href="index.html" class="nav-item" data-page="logout" onclick="logout()">' +
      '<div class="nav-icon-wrap">' +
        '<div class="nav-icon-bg"></div>' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8">' +
          '<path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>' +
          '<polyline points="16 17 21 12 16 7"/>' +
          '<line x1="21" y1="12" x2="9" y2="12"/>' +
        '</svg>' +
      '</div>' +
      '<span>Logout</span>' +
    '</a>' +
  '</nav>';

  var styleHTML = '<style>' +
    ':root { --nav-height: 75px; }' +
    '.bottom-nav {' +
      'position: fixed;' +
      'bottom: 0; left: 0; right: 0;' +
      'height: var(--nav-height);' +
      'background: white;' +
      'display: flex;' +
      'justify-content: space-around;' +
      'align-items: flex-end;' +
      'padding-bottom: 10px;' +
      'padding-bottom: max(10px, env(safe-area-inset-bottom));' +
      'z-index: 1000;' +
      'box-shadow: 0 -4px 20px rgba(0,0,0,0.08);' +
    '}' +
    '.nav-item {' +
      'display: flex;' +
      'flex-direction: column;' +
      'align-items: center;' +
      'justify-content: flex-end;' +
      'gap: 3px;' +
      'text-decoration: none;' +
      'color: #888;' +
      'flex: 1;' +
      'padding-bottom: 4px;' +
      'position: relative;' +
      'transition: color 0.3s;' +
    '}' +
    '.nav-icon-wrap {' +
      'position: relative;' +
      'width: 46px;' +
      'height: 46px;' +
      'display: flex;' +
      'align-items: center;' +
      'justify-content: center;' +
      'transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);' +
    '}' +
    '.nav-icon-bg {' +
      'position: absolute;' +
      'inset: 0;' +
      'border-radius: 50%;' +
      'background: linear-gradient(135deg, #00CEC9, #00B894);' +
      'transform: scale(0);' +
      'transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);' +
      'z-index: 0;' +
    '}' +
    '.nav-icon-wrap svg {' +
      'width: 22px;' +
      'height: 22px;' +
      'position: relative;' +
      'z-index: 1;' +
      'stroke: #888;' +
      'transition: stroke 0.3s;' +
    '}' +
    '.nav-item span {' +
      'font-family: Montserrat, sans-serif;' +
      'font-size: 0.58rem;' +
      'font-weight: 500;' +
      'letter-spacing: 0.3px;' +
      'white-space: nowrap;' +
      'transition: color 0.3s;' +
    '}' +
    '.nav-item.active {' +
      'color: #2F3E2F;' +
    '}' +
    '.nav-item.active .nav-icon-wrap {' +
      'transform: translateY(-18px);' +
    '}' +
    '.nav-item.active .nav-icon-bg {' +
      'transform: scale(1);' +
    '}' +
    '.nav-item.active .nav-icon-wrap svg {' +
      'stroke: white;' +
    '}' +
    '.nav-item.active span {' +
      'color: #778E77;' +
      'font-weight: 700;' +
    '}' +
 
    '@media (max-width: 380px) {' +
      '.nav-item span { display: none; }' +
      '.nav-icon-wrap { width: 38px; height: 38px; }' +
    '}' +
  '</style>';

  var isLanding = window.location.pathname.endsWith('index.html') ||
                  window.location.pathname === '/' ||
                  window.location.pathname.endsWith('/');

  if (!isLanding) {
    document.head.insertAdjacentHTML('beforeend', styleHTML);
    document.body.insertAdjacentHTML('beforeend', navHTML);

    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-item').forEach(function(link) {
      if (link.getAttribute('data-page') === currentPage) {
        link.classList.add('active');
      }
    });
  }
})();

function logout() {
  localStorage.removeItem('user_name');
  window.location.href = 'index.html';
}