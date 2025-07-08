(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const Btn = document.querySelector(".bundleBtn");
    if (!Btn) return;

    Btn.addEventListener("click", () => {
      const bundleEl = document.getElementById("bundleCreator");
      if (!bundleEl) return;

      const productId = Number(bundleEl.dataset.products);
      if (!productId) return;

      // Add product to cart
      fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: productId,
          quantity: 1
        })
      })
        .then(response => response.json())
        .then(() => fetch(window.location.href)) // Fetch full page HTML
        .then(res => res.text())
        .then(html => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');

          const newCartDrawer = doc.querySelector('#CartDrawer');
          const currentCartDrawer = document.querySelector('cart-drawer');

          const newCartCount = doc.querySelector('.cart-count');
          const currentCartCount = document.querySelector('.cart-count');

          if (newCartDrawer && currentCartDrawer) {
            currentCartDrawer.innerHTML = newCartDrawer.innerHTML;
            currentCartDrawer.classList.remove("is-empty");
            currentCartDrawer.classList.add("active");

            // Force images to reload
            const imgs = currentCartDrawer.querySelectorAll('img');
            imgs.forEach(img => {
              if (img.src) img.src = img.src;
            });

            // Hide empty message
            const emptyMessage = currentCartDrawer.querySelector('.drawer__inner-empty');
            if (emptyMessage) emptyMessage.style.display = 'none';
          }

          // Update cart count
          if (newCartCount && currentCartCount) {
            currentCartCount.textContent = newCartCount.textContent;
          }
        })
        .catch(err => {
          console.error("Error adding to cart:", err);
        });
    });
  });
})();
