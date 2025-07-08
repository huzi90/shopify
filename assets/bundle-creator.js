(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const Btn = document.querySelector(".bundleBtn");
    if (!Btn) return;

    Btn.addEventListener("click", () => {
      const bundleEl = document.getElementById("bundleCreator");
      if (!bundleEl) return;

      const productId = Number(bundleEl.dataset.products);
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
        .then(() => {
          return fetch('/?sections=cart-drawer,cart-icon-bubble');
        })
        .then(res => res.json())
        .then((sections) => {
         const cartDrawerEl = document.querySelector('[data-cart-drawer]');
          const cartIconBubbleEl = document.querySelector('[data-cart-icon-bubble]');

          if (cartDrawerEl && sections['cart-drawer']) {
            cartDrawerEl.innerHTML = sections['cart-drawer'];
            cartDrawerEl.classList.add('active');
            cartDrawerEl.classList.remove('is-empty');
          }

          if (cartIconBubbleEl && sections['cart-icon-bubble']) {
            cartIconBubbleEl.innerHTML = sections['cart-icon-bubble'];
          }

        })
        .catch(err => {
          console.error('Error updating cart drawer:', err);
        });
    });
  });
})();