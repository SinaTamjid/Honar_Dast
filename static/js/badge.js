let badge = document.querySelector(".badge");
let badge_basket = JSON.parse(localStorage.getItem("badge_basket")) || [];

let calculation = () => {
	if (badge_basket.map((i) => i.item).reduce((x, y) => x + y, 0) === 0) {
		badge.removeAttribute("style");
	} else {
		badge.style = "visibility: visible; opacity: 1;";
		badge.innerText = badge_basket
			.map((i) => i.item)
			.reduce((x, y) => x + y, 0);
	}
};

calculation();
