const page = document.body.dataset.page;
document.querySelectorAll("[data-link]").forEach(a => {
  if (a.dataset.link === page) a.classList.add("active");
});

function loadCart(){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let cartDiv = document.getElementById("cart-items");
  let total = 0;

  cartDiv.innerHTML = "";

  cart.forEach((item,index)=>{
    total += item.price;

    cartDiv.innerHTML += `
      <article class="product-card">
        <div class="product-info">
          <h2 class="product-name">${item.name}</h2>
          <div class="product-price">$${item.price}</div>
          <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
        </div>
      </article>
    `;
  });

  document.getElementById("cart-total").innerText = total;
}

function removeItem(index){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.splice(index,1);

  localStorage.setItem("cart",JSON.stringify(cart));

  loadCart();
}

function checkout(){
  alert("Payment successful!");

  localStorage.removeItem("cart");

  loadCart();
}

loadCart();
