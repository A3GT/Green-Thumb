function updateCartCount(){

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let totalItems = 0;

  cart.forEach(item => {
    totalItems += item.qty || 1;
  });

  let badge = document.getElementById("cart-count");
  if(badge){
    badge.innerText = totalItems;
  }
}

document.addEventListener("DOMContentLoaded", updateCartCount);