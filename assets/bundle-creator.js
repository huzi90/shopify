(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const Btn = document.querySelector(".bundleBtn");

    Btn.addEventListener("click", () => {
      const productId = document.getElementById("bundleCreator").dataset.products;

      fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: productId, // ensure it's a number
          quantity: 1
        })
      })
        .then(res => res.json())
        .then(data => {
          console.log('Added to cart:', data);

          // Update cart count
          fetch('/cart.js')
            .then(res => res.json())
            .then(cart => {
              const count = cart.item_count;
              const countBubble = document.querySelector('[data-cart-count]');
              if (countBubble) countBubble.textContent = count;
            });

          // Open the cart drawer
          const drawer = document.querySelector('cart-drawer');
          if (drawer && typeof drawer.open === 'function') {
            drawer.open();
          } else {
            // Fallback if open() doesn't exist
            document.querySelector('.header__icon--cart')?.click();
          }
        })
        .catch(error => {
          console.error('Error adding to cart:', error);
          alert("There was a problem adding the product to the cart.");
        });
    });
  });
})();
