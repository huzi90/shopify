(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const Btn = document.querySelector(".bundleBtn");

    if (!Btn) return;

    Btn.addEventListener("click", () => {
      const bundleContainer = document.getElementById("bundleCreator");
      if (!bundleContainer) return;

      const productId = Number(bundleContainer.dataset.products); // Ensure it's a number

      fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: productId,
          quantity: 1
        })
      })
        .then(res => res.json())
        .then(data => {
          console.log('Added to cart:', data);

          // Delay slightly to ensure Shopify updates cart before fetching it
          setTimeout(() => {
            fetch('/cart.js')
              .then(res => res.json())
              .then(cart => {
                // ✅ Update cart count
                const count = cart.item_count;
                const countBubble = document.querySelector('[data-cart-count]');
                if (countBubble) {
                  countBubble.textContent = count;
                  countBubble.classList.remove('hidden');
                }

                // ✅ Optionally trigger custom event
                document.dispatchEvent(new CustomEvent('cart:updated', { detail: cart }));

                // ✅ Open cart drawer if it exists
                const drawer = document.querySelector('cart-drawer');
                if (drawer && typeof drawer.open === 'function') {
                  drawer.open();
                } else {
                  // Fallback: simulate click on cart icon
                  document.querySelector('.header__icon--cart')?.click();
                }
              });
          }, 300); // Slight delay to wait for server update
        })
        .catch(error => {
          console.error('Error adding to cart:', error);
          alert("There was a problem adding the product to the cart.");
        });
    });
  });
})();
