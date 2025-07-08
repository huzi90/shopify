(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const Btn = document.querySelector(".bundleBtn");
    if (!Btn) return;

    Btn.addEventListener("click", () => {
      const bundleEl = document.getElementById("bundleCreator");
      if (!bundleEl) return;

      const productId = Number(bundleEl.dataset.products);
      const productImage = bundleEl.dataset.image; // Optional image URL
      if (!productId) return;

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
        .then(() => fetch('/?sections=cart-drawer,cart-icon-bubble'))
        .then(res => res.json()) // ✅ Return as JSON directly
        .then((sections) => {
          const cartDrawer = document.querySelector('cart-drawer');
          if (!cartDrawer) return;

          // ✅ Directly update drawer content
          cartDrawer.innerHTML = sections['cart-drawer'];
          cartDrawer.classList.remove("is-empty");

          // ✅ Optional: Update image manually if needed
          setTimeout(() => {
            const mediaCell = cartDrawer.querySelector('.cart-item__media');
            if (mediaCell && productImage && !mediaCell.querySelector('img')) {
              mediaCell.innerHTML = `
                <a href="#" class="cart-item__link" tabindex="-1" aria-hidden="true"></a>
                <img class="cart-item__image" src="${productImage}" alt="Product image" width="150" loading="lazy" />
              `;
            }
          }, 100);
        })
        .catch(err => {
          console.error('Error updating cart drawer:', err);
        });
    });
  });
})();
