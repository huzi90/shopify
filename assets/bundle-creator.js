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
          // Step 2: Fetch sections for cart UI
          return fetch('/?sections=cart-drawer,cart-icon-bubble');
        })
        .then(res => res.json())
        .then((sections) => {
          const cartDrawer = document.querySelector('cart-drawer');

          if (cartDrawer && typeof cartDrawer.renderContents === 'function') {
            cartDrawer.renderContents({ sections });

            // Wait until next animation frame for DOM to settle, then safely open drawer
            requestAnimationFrame(() => {
              const drawerContent =
                cartDrawer.querySelector('#CartDrawer') ||
                cartDrawer.querySelector('.drawer__inner');

              if (drawerContent) {
                cartDrawer.classList.remove("is-empty")
                cartDrawer.open(); // Safe manual open
              } else {
                console.log("CartDrawer content not found, not opening.");
              }
            });
          }
        })
        .catch(err => {
          console.error('Error updating cart drawer:', err)
        })
    })
  })
})()