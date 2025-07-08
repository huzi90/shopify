(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const Btn = document.querySelector(".bundleBtn")
    Btn.addEventListener("click",()=>{
        const productId = document.getElementById("bundleCreator").dataset.products
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
  .then(data => {
    console.log('Added to cart:', data);
    alert("Product added to cart!");
  })
  .catch(error => {
    console.error('Error adding to cart:', error);
    alert("There was a problem adding the product to the cart.");
  })
    })
  })
})()