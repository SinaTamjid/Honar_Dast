let pro_item = document.querySelector(
	"main.main > div.pro_list > div.products > div.products > div[class*='pro'] > div[class*='pro'] div.new_items"
);

let badge = document.querySelector(".badge");

let badge_basket = JSON.parse(localStorage.getItem("badge_basket")) || [];

let items_pro = () => {
	pro_item.innerHTML = items_new_data
		.filter(
			(item) =>
				(item.id >= 1 && item.id <= 5) ||
				item.id === 15 ||
				item.id === 18 ||
				item.id === 23 ||
				item.id === 88 ||
				item.id === 106
		)
		.map((e) => {
			let { id, title, desc, price, img } = e;
			return `
				<div
					class="new_item_${
						id - 5
					} w-[18.5%] pb-2.5 shadow-[1px_3px_10px_2px_#8b8b8b] text-zinc-800 flex flex-col justify-between rounded-xl">
					<img
						class="new_img rounded-lg h-52 m-3"
						src="${img}"
						title="${title}"
						alt="new_item_${id}" />
					<p class="m-2.5">
						${title}
						<br />
						<span class="text-[11px] pt-3 inline-block font-[IranYekanBold]"
							>${desc}</span
						>
					</p>
					<p class="m-2.5">${price.toLocaleString()} تومان</p>
					<input
						class="add_buy_btn p-2.5 text-center text-white bg-[#1e6889] rounded-md mx-2.5 transition-all cursor-pointer hover:bg-[#2ea4c2] hover:border-[#2ea4c2] hover:text-zinc-800"
						type="button"
						onclick="add(${id})"
						title="افزودن به سبد خرید"
						value="افزودن به سبد خرید" />
				</div>
			`;
		})
		.join("");
};

items_pro();

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
