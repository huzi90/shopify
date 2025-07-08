// cart-drawer.js - mini's safe mini cart drawer logic

(function minicart() {
  const drawer = document.getElementById('mini-cart-drawer');
  const openBtn = document.querySelector('[data-mini-open-cart]');
  const closeBtn = document.getElementById('mini-close-drawer');

  if (!drawer) return;

  function openDrawer() {
    drawer.classList.remove('mini-hidden');
    setTimeout(() => drawer.classList.add('open'), 10);
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    setTimeout(() => drawer.classList.add('mini-hidden'), 300);
  }

  // Open Button
  if (openBtn) {
    openBtn.addEventListener('click', openDrawer);
  }

  // Close Button
  if (closeBtn) {
    closeBtn.addEventListener('click', closeDrawer);
  }

  // Click outside drawer closes it
  drawer.addEventListener('click', function (e) {
    if (e.target.classList.contains('mini-overlay')) {
      closeDrawer();
    }
  });
})();
