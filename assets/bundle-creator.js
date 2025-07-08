(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("bundleCreator")
    const productId = document.querySelector('[data-products]')
    const Btn = document.querySelector(".bundleBtn")
    Btn.addEventListener("click",()=>{
        console.log(productId);
    })
  });
})();