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

function setupAccountMenu() {
  const accountMenu = document.querySelector(".account-menu");

  if (!accountMenu) {
    return;
  }

  const toggle = accountMenu.querySelector(".account-toggle");
  const dropdown = accountMenu.querySelector(".account-dropdown");

  if (!toggle || !dropdown) {
    return;
  }

  const closeMenu = () => {
    accountMenu.classList.remove("is-open");
    dropdown.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
  };

  const openMenu = () => {
    accountMenu.classList.add("is-open");
    dropdown.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
  };

  toggle.addEventListener("click", (event) => {
    event.stopPropagation();

    if (dropdown.hidden) {
      openMenu();
      return;
    }

    closeMenu();
  });

  document.addEventListener("click", (event) => {
    if (!accountMenu.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  setupAccountMenu();
});
