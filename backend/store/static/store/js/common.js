function getCartStorageKey() {
  const navbar = document.querySelector(".navbar");
  const scopedKey = navbar?.dataset?.cartKey;

  if (scopedKey) {
    return scopedKey;
  }

  return "cart:guest";
}

function getStoredCart() {
  const storageKey = getCartStorageKey();
  const cartJson = localStorage.getItem(storageKey);

  if (cartJson) {
    try {
      return JSON.parse(cartJson) || [];
    } catch (error) {
      localStorage.removeItem(storageKey);
      return [];
    }
  }

  // One-time migration from the legacy shared key.
  // This keeps old cached JS (writing to "cart") compatible with the
  // new scoped keys ("cart:guest", "cart:user:<id>").
  const legacyCartJson = localStorage.getItem("cart");
  if (legacyCartJson) {
    try {
      const legacyCart = JSON.parse(legacyCartJson) || [];
      localStorage.setItem(storageKey, JSON.stringify(legacyCart));
      localStorage.removeItem("cart");
      return legacyCart;
    } catch (error) {
      localStorage.removeItem("cart");
    }
  }

  return [];
}

function setStoredCart(cart) {
  localStorage.setItem(getCartStorageKey(), JSON.stringify(cart));
}

function clearStoredCart() {
  localStorage.removeItem(getCartStorageKey());
}

function updateCartCount(){

  let cart = getStoredCart();

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
