const page = document.body.dataset.page;
document.querySelectorAll("[data-link]").forEach(a => {
  if (a.dataset.link === page) a.classList.add("active");
});

function loadCart(){

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let cartDiv = document.getElementById("cart-items");
  let total = 0;

  cartDiv.innerHTML = "";   // clear before rendering

  cart.forEach((item, index) => {

    let qty = item.qty || 1;
    let itemTotal = item.price * qty;

    total += itemTotal;

    cartDiv.innerHTML += `
      <article class="product-card">

        <img src="${item.image || ''}" alt="${item.name}" class="cart-img">

        <div class="product-name">${item.name}</div>

        <div class="cart-controls">
          <button onclick="updateQty(${index}, -1)">-</button>
          <span class="qty">${qty}</span>
          <button onclick="updateQty(${index}, 1)">+</button>
        </div>

        <div class="product-price">$${itemTotal.toFixed(2)}</div>

        <button class="remove-btn" onclick="removeItem(${index})">Remove</button>

      </article>
    `;
  });

  document.getElementById("cart-total").innerText = total.toFixed(2);
}
function removeItem(index){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.splice(index,1);

  localStorage.setItem("cart",JSON.stringify(cart));

  loadCart();
  updateCartCount();
}

function checkout(){
  alert("Payment successful!");

  localStorage.removeItem("cart");

  loadCart();
  updateCartCount();
}

loadCart();


updateCartCount();

document.addEventListener("DOMContentLoaded", updateCartCount);

function updateQty(index, change){

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart[index].qty += change;

  if(cart[index].qty < 1){
    cart.splice(index,1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  loadCart();
  updateCartCount();
}