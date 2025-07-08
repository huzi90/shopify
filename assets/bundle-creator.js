(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const Btn = document.querySelector(".bundleBtn");
    if (!Btn) return;

    Btn.addEventListener("click", () => {
      const bundleEl = document.getElementById("bundleCreator");
      if (!bundleEl) return;

      const productId = Number(bundleEl.dataset.products);
      if (!productId) return;

      // Step 1: Add product to cart
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
        .then(() => {
          // Step 2: Fetch only necessary sections (cart-drawer and cart-icon-bubble)
          return fetch('/?sections=cart-drawer,cart-icon-bubble');
        })
        .then(res => res.json())
        .then((sections) => {
          const cartDrawer = document.querySelector('cart-drawer');
          if (cartDrawer && typeof cartDrawer.renderContents === 'function') {
            cartDrawer.renderContents({ sections });
          }
        })
        .catch(err => {
          console.error('Error updating cart drawer:', err);
        });
    });
  });
})();
