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
          const cartDrawer = document.querySelector('cart-drawer');
          if (cartDrawer && typeof cartDrawer.renderContents === 'function') {
            setTimeout(() => {
                cartDrawer.renderContents({ sections });
                }, 3000);
          }
        })
        .catch(err => {
          console.error('Error updating cart drawer:', err);
        });
    });
  });
})();
