(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const bundleBtn = document.querySelector(".bundleBtn");
    if (!bundleBtn) return;

    const bundleEl = document.getElementById("bundleCreator");
    if (!bundleEl) return;

    const productId = Number(bundleEl.dataset.products);
    if (!productId) return;

    const addToCart = async () => {
      try {
        bundleBtn.disabled = true; // Disable button to prevent multiple clicks

        // Step 1: Add product to cart
        const addResponse = await fetch('/cart/add.js', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: productId,
            quantity: 1
          })
        });

        if (!addResponse.ok) {
          const errorData = await addResponse.json().catch(() => ({}));
          console.error('Failed to add product to cart:', errorData);
          bundleBtn.disabled = false;
          return;
        }

        // Step 2: Fetch sections for cart UI
        const sectionsResponse = await fetch('/?sections=cart-drawer,cart-icon-bubble');
        if (!sectionsResponse.ok) {
          console.error('Failed to fetch cart sections');
          bundleBtn.disabled = false;
          return;
        }

        const sections = await sectionsResponse.json();

        const cartDrawer = document.querySelector('cart-drawer');
        if (cartDrawer && typeof cartDrawer.renderContents === 'function') {
          cartDrawer.renderContents({ sections });

          // Wait until next animation frame for DOM to settle, then safely open drawer
          requestAnimationFrame(() => {
            const drawerContent =
              cartDrawer.querySelector('#CartDrawer') ??
              cartDrawer.querySelector('.drawer__inner');

            if (drawerContent) {
              cartDrawer.open(); // Safe manual open
            } else {
              console.warn("CartDrawer content not found, not opening.");
            }
          });
        } else {
          console.warn("CartDrawer element or renderContents method not found.");
        }
      } catch (err) {
        console.error('Error updating cart drawer:', err);
      } finally {
        bundleBtn.disabled = false; // Re-enable button
      }
    };

    bundleBtn.addEventListener("click", addToCart);
  });
})();
