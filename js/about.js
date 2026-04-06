/**const page = document.body.dataset.page;
document.querySelectorAll("[data-link]").forEach(a => {
  if (a.dataset.link === page) a.classList.add("active");
});
<<<<<<< HEAD
**/
const page = document.body.dataset.page;

document.querySelectorAll("[data-link]").forEach(a => {
  if (a.dataset.link === page) a.classList.add("active");
});

document.querySelectorAll(".info-box").forEach((box, index) => {
  box.style.animationDelay = `${index * 0.15}s`;
});
=======

document.addEventListener("DOMContentLoaded", function(){
  if(typeof updateCartCount === "function"){
    updateCartCount();
  }
});
>>>>>>> 4b9a1df6c1b1a0849736e47729aa5ea607ad1a03
