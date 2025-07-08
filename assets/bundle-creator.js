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
          // Refresh the cart drawer content
          return fetch(window.location.href);
        })
        .then(res => res.text())
        .then(html => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          const newCartDrawer = doc.querySelector('#CartDrawer');
          const currentCartDrawer = document.querySelector('cart-drawer');

          if (newCartDrawer && currentCartDrawer) {
            currentCartDrawer.innerHTML = newCartDrawer.innerHTML;
          }
        })
        .catch(err => {
          console.error("Error adding to cart", err);
        });
    });
  });
})();
