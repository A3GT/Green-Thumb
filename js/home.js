const page = document.body.dataset.page;
document.querySelectorAll("[data-link]").forEach(a => {
  if (a.dataset.link === page) a.classList.add("active");
});



const generated_plant = document.getElementById("generated_plant");
const generate_button = document.getElementById("generate_button");
const generated_plant_description = document.getElementById("generated_plant_description");
const cart_button = document.getElementById("shop_button");
const shop_url = new URL("./pages/shop.html", window.location.href);

class Plant {

    constructor(search_id, src, description) {
        this.search_id = search_id;
        this.src = src;
        this.description = description;
    }
}

// Marc's Description Section
let plants = [ 
	new Plant("Aloe Vera",
		"https://www.stockvault.net/data/2021/01/03/282191/preview16.jpg",
		"<b>Aloe Vera</b><br>Known for the soothing gel inside its leaves that helps treat burns and skin irritation. It is very easy to grow and requires little water."
	),
	new Plant("Snake Plant",
		"https://cdn.shopify.com/s/files/1/0619/1218/7051/files/1661954674-dsc-7058-1.jpg",
		"<b>Snake Plant</b><br>A hardy houseplant that survives in low light with minimal watering. It is known for helping improve indoor air quality."
	),

	new Plant("Peace Lily",
		"https://www.meadowsfarms.com/great-big-greenhouse-gardening-blog/wp-content/uploads/sites/2/2025/03/bonnie-blog-peace-lily.jpg.webp",
		"<b>Peace Lily</b><br>Known for its elegant white blooms and lush green leaves. It thrives indoors and is valued for helping filter certain pollutants from the air."
	),

	new Plant("Lavender",
		"https://www.provenwinners.com/sites/provenwinners.com/files/imagecache/low-resolution/ifa_upload/lavandula_summer_serenade_apj25_3.jpg",
		"<b>Lavender</b><br>Known for its fragrant purple flowers and use in aromatherapy. Its scent helps promote relaxation and reduce stress."
	),

	new Plant("Basil",
		"https://aanmc.org/wp-content/uploads/2021/08/987-1024x681.jpg",
		"<b>Basil</b><br>A popular culinary herb used in many Mediterranean dishes. Growing basil at home promotes sustainable cooking with fresh ingredients."
	),

	new Plant("Mint",
		"https://media.post.rvohealth.io/wp-content/uploads/sites/3/2025/06/mint-good-GettyImages-2216675819-Header-1024x575.jpg",
		"<b>Mint</b><br>Mint is a fast-growing herb known for its refreshing flavor. It is commonly used in teas, desserts, and beverages. It grows easily in home gardens."
	),

	new Plant("Rosemary",
		"https://lancaster.unl.edu/sites/unl.edu.ianr.extension.lancaster/files/2024-12/rosemary-gb8cd2e20e_1920.jpg",
		"<b>Rosemary</b><br>A fragrant herb widely used in cooking. It grows well in sunny conditions and requires very little water."
	),

	new Plant("Monstera",
		"https://cdn.mos.cms.futurecdn.net/w5g9MUrhQ8nRgAhRamAKvX.jpg",
		"<b>Monstera</b><br>A tropical plant known for its large split leaves. It is widely used as a decorative indoor plant."
	),

	new Plant("Spider Plant",
		"https://cdn.mos.cms.futurecdn.net/Rw63sJPwqukKneBYZkpjUn.jpg",
		"<b>Spider Plant</b><br>A resilient houseplant known for its long arching leaves. It is easy to care for and grows quickly indoors. It produces small plantlets that can be replanted."
	),
	new Plant("Chamomile",
		"https://cdn.mos.cms.futurecdn.net/v2sQs7MsmECNVGZBqXtwkH.jpg",
		"<b>Chamomile</b><br>A flowering herb commonly used to make calming herbal tea. It is known for its relaxing effects."
	),
	new Plant("Sunflower",
		"https://www.lunafloral.my/cdn/shop/articles/pexels-pixabay-54267.jpg?v=1724733421&width=2048",
		"<b>Sunflower</b><br>A bright plant that supports pollinators like bees. It produces seeds commonly used in food and cooking oil. Its tall stems and large flowers make it popular in gardens."
	)
];
// End of Marc's Section
// Grey's plant generator section

let plant_location = -1;
let spin_timer = null;

function reset_animation() {
  var el = document.getElementById('animated');
}

function generate_plant() {
	//This is janky but it lets the animation reset for each button press
	generated_plant.style.animation = "none";
	generated_plant.offsetHeight;
	generated_plant.style.animation = null;
	cart_button.style.visibility = false;
	spin();
}

//Generates a random number and sets the plant
function load_rand_plant() {
	//if there has not been a generated plant get any plant
	if(plant_location == -1) {
		plant_location = Math.floor(Math.random() * plants.length);
	} else {
		//Otherwise get a random plant besides the current one
		plant_location = (plant_location + Math.floor(Math.random() * (plants.length - 1) + 1)) % plants.length;
	}
	return plants[plant_location];
}

function get_plant() {
	let plant = load_rand_plant();
	cart_button.style.visibility = "visible";
	generated_plant.src = plant.src;
	generated_plant_description.innerHTML = plant.description;
}

//Starts spinning the wheel, at the end of the animation setting the plant randomly
function spin() {
	//Resets the spin timer if it is still spinning
	if(spin_timer != null){
		clearTimeout(spin_timer);
	}
	generated_plant.src = "assets/images/plants/wheel.png";
	generated_plant.style.animation = "spin .5s linear";
	generated_plant.style.animationDuration = "1s";
	generate_button.innerHTML = "Generate a new plant";
	cart_button.style.visibility = "hidden";
	//Sets a timer to load in the plant after the animation is finished
	spin_timer = setTimeout(get_plant, 1000);
}

function plant_in_shop() {
	if(cart_button.style.visibility != "visible") {
		return;
	}
	console.log("Test");
	window.location.replace(shop_url + "#search=" + plants[plant_location].search_id);
}
//End of Grey's section