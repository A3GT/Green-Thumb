const page = document.body.dataset.page;
document.querySelectorAll("[data-link]").forEach(a => {
  if (a.dataset.link === page) a.classList.add("active");
});

const searchInput = document.getElementById("product-search-input");
const searchButton = document.getElementById("product-search-button");
const productsGrid = document.getElementById("products-grid");
const productCards = Array.from(document.querySelectorAll(".product-card"));
const emptyState = document.getElementById("search-empty");

function filterProducts() {
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  productsGrid.classList.toggle("search-results", query !== "");

  productCards.forEach(card => {
    const searchableText = card.innerText.toLowerCase();
    const matches = searchableText.includes(query);

    card.hidden = !matches;
    if (matches) {
      visibleCount += 1;
    }
  });

  emptyState.hidden = visibleCount !== 0;
}

searchButton.addEventListener("click", filterProducts);
searchInput.addEventListener("input", filterProducts);
searchInput.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    event.preventDefault();
    filterProducts();
  }
});

function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push({
    name: name,
    price: price
  });

  localStorage.setItem("cart", JSON.stringify(cart));

  alert(name + " added to cart!");
}
