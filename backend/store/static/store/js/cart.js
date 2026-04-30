const page = document.body.dataset.page;
document.querySelectorAll("[data-link]").forEach(a => {
  if (a.dataset.link === page) a.classList.add("active");
});

function loadCart(){

  let cart = getStoredCart();

  let cartDiv = document.getElementById("cart-items");
  let total = 0;

  cartDiv.innerHTML = "";

  cart.forEach((item,index)=>{

    let qty = item.qty || 1;
    let itemTotal = item.price * qty;

    total += itemTotal;

    cartDiv.innerHTML += `
  <article class="product-card">

    <!-- ✅ PRODUCT IMAGE -->
    <img src="${item.image || '/static/images/products/waterbottle.png'}" alt="${item.name}">

    <div class="product-info">

      <h2 class="product-name">${item.name}</h2>

      <div class="cart-controls">
        <button onclick="updateQty(${index}, -1)">-</button>
        <span class="qty">${qty}</span>
        <button onclick="updateQty(${index}, 1)">+</button>
      </div>

      <div class="product-price">$${itemTotal.toFixed(2)}</div>

      <button class="remove-btn" onclick="removeItem(${index})">Remove</button>

    </div>
  </article>
`;
  });

  document.getElementById("cart-total").innerText = total.toFixed(2);
}
function removeItem(index){
  let cart = getStoredCart();

  cart.splice(index,1);

  setStoredCart(cart);

  loadCart();
  updateCartCount();
}

function checkout(){
  alert("Payment successful!");

  clearStoredCart();

  loadCart();
  updateCartCount();
}

loadCart();


updateCartCount();

document.addEventListener("DOMContentLoaded", updateCartCount);

function updateQty(index, change){

  let cart = getStoredCart();

  cart[index].qty += change;

  if(cart[index].qty < 1){
    cart.splice(index,1);
  }

  setStoredCart(cart);

  loadCart();
  updateCartCount();
}

document.addEventListener("DOMContentLoaded", () => {

  const paymentSelect = document.getElementById("payment-method");
  const cardForm = document.getElementById("card-form");

  if (!paymentSelect || !cardForm) return;

  function togglePaymentUI() {
    const val = paymentSelect.value.trim();

    console.log("Selected:", val); // debug

    if (val === "card") {
      cardForm.style.display = "block";
    } else {
      cardForm.style.display = "none";
    }
  }

  // 🔥 FIX: use BOTH events (important)
  paymentSelect.addEventListener("change", togglePaymentUI);
  paymentSelect.addEventListener("input", togglePaymentUI);

  // 🔥 FORCE correct state AFTER render
  setTimeout(togglePaymentUI, 100);

});
function simulatePayment() {


  if (!isLoggedIn) {
    window.location.href = "/login/?next=/cart/";
    return;
  }

  const method = document.getElementById("payment-method").value;


  if (method === "card") {
    const inputs = document.querySelectorAll("#card-form input");

    let isValid = true;

    inputs.forEach(input => {
      if (input.value.trim() === "") {
        isValid = false;
        input.style.border = "2px solid red"; // highlight error
      } else {
        input.style.border = "1px solid #ccc";
      }
    });

    if (!isValid) {
      alert("Please fill all card details!");
      return;
    }
  }

  const popup = document.getElementById("success-popup");

  popup.classList.add("show");

  clearStoredCart();

  setTimeout(() => {
    popup.classList.remove("show");
    location.reload();
  }, 2000);
}