let new_items = document.querySelector(
	"main > div.new_content_item > div.new_items"
);
let badge = document.querySelector(".badge");

let badge_basket = JSON.parse(localStorage.getItem("badge_basket")) || [];

let items = () => {
	return (new_items.innerHTML = items_new_data
		.filter((item) => item.id <= 5)
		.map((elem) => {
			let { id, title, desc, price, img } = elem;
			return `
				<div
					class="new_item_${id} w-1/4 pb-2.5 shadow-[1px_3px_10px_2px_#8b8b8b] text-zinc-800 flex flex-col rounded-xl">
					<img
						class="new_img rounded-lg h-52 m-3"
						src="${img}"
						title="${title}"
						alt="new_item_${id}" />
					<p class="m-3">${title}</p>
					<p class="m-3 text-[13px] font-bold">${desc}</p>
					<p class="m-3 mb-6">${price.toLocaleString()} تومان</p>
					<input
						class="add_buy_btn p-2.5 text-center text-white bg-[#1e6889] rounded-md mx-2.5 transition-all cursor-pointer hover:bg-[#2ea4c2] hover:border-[#2ea4c2] hover:text-zinc-800"
						type="button"
						onclick="add(${id})"
						title="افزودن به سبد خرید"
						value="افزودن به سبد خرید" />
				</div>
			`;
		})
		.join(""));
};

items();

let add = (id) => {
	let search = badge_basket.find((item) => item.id === id);

	if (search === undefined) {
		badge_basket.push({
			id,
			item: 1,
		});
	} else {
		search.item += 1;
	}
	calculation();
	localStorage.setItem("badge_basket", JSON.stringify(badge_basket));
};

let calculation = () => {
	let total = badge_basket.map((i) => i.item).reduce((x, y) => x + y, 0);

	if (total === 0) {
		badge.removeAttribute("style");
	} else {
		badge.style = "visibility: visible; opacity: 1;";
		badge.innerText = total;
	}
};

calculation();
