(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const Btn = document.querySelector(".bundleBtn");

    if (!Btn) return;

    Btn.addEventListener("click", () => {
      const bundleEl = document.getElementById("bundleCreator");
      if (!bundleEl) return;

      const productId = Number(bundleEl.dataset.products);

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
        .then(() => {
          // Now fetch updated cart
          return fetch('/cart.js');
        })
        .then(response => response.json())
        .then(cart => {
          const countBubble = document.querySelector('[data-cart-count]');
          if (countBubble) {
            countBubble.textContent = cart.item_count;
            countBubble.classList.remove('hidden');
          }

          // Now force refresh cart drawer component
          const drawer = document.querySelector('cart-drawer');
          if (drawer) {
            // This will force it to re-render using the latest cart state
            drawer.fetchCartContents();
          } else {
            // fallback click if drawer not found
            document.querySelector('.header__icon--cart')?.click();
          }
        })
        .catch(err => {
          console.error("Error adding to cart", err);
        });
    });
  });
})();
