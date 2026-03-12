/* NAV ACTIVE LINK */
const page = document.body.dataset.page;
document.querySelectorAll("[data-link]").forEach(a=>{
if(a.dataset.link===page) a.classList.add("active");
});

/* STAR PICKER */
let selectedStars=0;
const stars=document.querySelectorAll("#star-picker span");

stars.forEach(star=>{
star.addEventListener("click",function(){
selectedStars=parseInt(this.dataset.val);
stars.forEach(s=>{
s.classList.toggle("selected",parseInt(s.dataset.val)<=selectedStars);
});
});

star.addEventListener("mouseover",function(){
const val=parseInt(this.dataset.val);
stars.forEach(s=>{
s.style.color=parseInt(s.dataset.val)<=val?"gold":"#ccc";
});
});

star.addEventListener("mouseout",function(){
stars.forEach(s=>{
s.style.color=parseInt(s.dataset.val)<=selectedStars?"gold":"#ccc";
});
});
});

/* SUBMIT REVIEW */
function submitReview(){
const name=document.getElementById("input-name").value.trim();
const text=document.getElementById("input-review").value.trim();

if(!name||!text||selectedStars===0){
alert("Please fill in your name, rating, and review!");
return;
}

let starDisplay="";
for(let i=1;i<=5;i++){
starDisplay+=i<=selectedStars?"&#9733;":"&#9734;";
}

const today=new Date().toLocaleDateString("en-US",{month:"short",year:"numeric"});

const card=document.createElement("div");
card.className="review-card";

card.innerHTML=`
<div class="stars">${starDisplay}</div>
<div class="review-text">"${text}"</div>
<div class="reviewer-name">${name}</div>
<div class="review-date">${today}</div>
`;

const container=document.getElementById("reviews-container");
container.insertBefore(card,container.firstChild);

document.getElementById("input-name").value="";
document.getElementById("input-review").value="";

selectedStars=0;
stars.forEach(s=>{s.style.color="#ccc";});

alert("Thank you for your review!");
}
