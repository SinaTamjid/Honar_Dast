let item = document.querySelector(
	"main.main > div.pro_list > div.products > div.header > div.content > p"
);

let title = document.querySelector(
	"main.main > div.pro_list > div.products > div.header > h3"
);

let pro_parent = document.querySelectorAll(
	"main.main > div.pro_list > div.products > div.products > div[class*='pro']"
);

let pro = document.querySelectorAll(
	"main.main > div.pro_list > div.products > div.products > div[class*='pro'] > div[class*='pro']"
);

let pro_item = document.querySelectorAll(
	"main.main > div.pro_list > div.products > div.products > div[class*='pro'] > div[class*='pro'] div.new_items"
);

let grouping = document.querySelectorAll(
	"main.main > div.pro_list > div.grouping > ul > li > a"
);

let pag_btn = document.querySelector(
	"main.main > div.pro_list > div.products > div.pag_btn"
);

let pag = document.querySelectorAll(
	"main.main > div.pro_list > div.products > div.pag_btn > nav > a"
);

let span = document.querySelectorAll(
	"main.main > div.pro_list > div.products > div.pag_btn > nav > span"
);

let mat = [
	null,
	"termeh",
	"khatam",
	"firooz",
	"javaher",
	"mina",
	"hasir",
	"farsh",
	"abgin",
	"sofal",
	"mes",
	"choob",
];

let badge = document.querySelector(".badge");

let badge_basket = JSON.parse(localStorage.getItem("badge_basket")) || [];

let activeIndex = 1;

function updatePagination() {
	pag.forEach((button, index) => {
		if (
			index === activeIndex &&
			activeIndex !== 0 &&
			activeIndex !== pag.length - 1
		) {
			button.classList.remove(
				"text-gray-900",
				"ring-1",
				"ring-inset",
				"ring-gray-300",
				"hover:bg-gray-100",
				"focus:z-20",
				"focus:outline-offset-0"
			);
			button.classList.add(
				"bg-[#1e6889]",
				"text-white",
				"focus:z-20",
				"focus-visible:outline",
				"focus-visible:outline-2",
				"focus-visible:outline-offset-2",
				"focus-visible:outline-[#1e6889]"
			);
		} else if (activeIndex === 0 || activeIndex === pag.length - 1) {
			return;
		} else {
			button.classList.remove(
				"bg-[#1e6889]",
				"text-white",
				"focus:z-20",
				"focus-visible:outline",
				"focus-visible:outline-2",
				"focus-visible:outline-offset-2",
				"focus-visible:outline-[#1e6889]"
			);
			button.classList.add(
				"text-gray-900",
				"ring-1",
				"ring-inset",
				"ring-gray-300",
				"hover:bg-gray-100",
				"focus:z-20",
				"focus:outline-offset-0"
			);
		}
	});
}

pag.forEach((button, index) => {
	button.addEventListener("click", (event) => {
		event.preventDefault();

		if (button.classList.contains("pre")) {
			activeIndex = Math.max(0, activeIndex - 1);
			pag[activeIndex + 2].classList.replace("md:inline-flex", "md:hidden");
			if (activeIndex === 7) {
				span[0].classList.replace("md:inline-flex", "md:hidden");
				pag[activeIndex - 3].classList.replace("md:hidden", "md:inline-flex");
				pag[activeIndex - 2].classList.replace("md:hidden", "md:inline-flex");
				pag[activeIndex - 1].classList.replace("md:hidden", "md:inline-flex");
			} else if (activeIndex === 10) {
				pag[activeIndex - 7].classList.replace("md:hidden", "md:inline-flex");
			} else if (activeIndex === 11) {
				pag[activeIndex - (activeIndex - 2)].classList.replace(
					"md:hidden",
					"md:inline-flex"
				);
				pag[activeIndex - 4].classList.replace("md:hidden", "md:inline-flex");
				pag[activeIndex - 3].classList.replace("md:hidden", "md:inline-flex");
				pag[activeIndex - 2].classList.replace("md:hidden", "md:inline-flex");
			} else if (activeIndex > 11 && activeIndex < 20) {
				pag[activeIndex - 3].classList.replace("md:hidden", "md:inline-flex");
			} else if (activeIndex === 20) {
				span[1].classList.replace("md:hidden", "md:inline-flex");
				pag[activeIndex + 3].classList.replace("md:inline-flex", "md:hidden");
				pag[activeIndex + 2].classList.replace("md:inline-flex", "md:hidden");
				pag[activeIndex + 1].classList.replace("md:inline-flex", "md:hidden");
			} else {
				event.preventDefault();
			}
			if (activeIndex - 1 === 0 || activeIndex >= 21) {
				pag[activeIndex + 2].classList.replace("md:hidden", "md:inline-flex");
			}
		} else if (button.classList.contains("next")) {
			activeIndex = Math.min(pag.length - 1, activeIndex + 1);
			pag[activeIndex + 1].classList.replace("md:hidden", "md:inline-flex");
			if (activeIndex === 8) {
				span[0].classList.replace("md:hidden", "md:inline-flex");
				pag[activeIndex - 4].classList.replace("md:inline-flex", "md:hidden");
				pag[activeIndex - 3].classList.replace("md:inline-flex", "md:hidden");
				pag[activeIndex - 2].classList.replace("md:inline-flex", "md:hidden");
			} else if (activeIndex === 11) {
				pag[activeIndex - 8].classList.replace("md:inline-flex", "md:hidden");
			} else if (activeIndex > 11 && activeIndex < 21) {
				pag[activeIndex - (activeIndex - 2)].classList.replace(
					"md:inline-flex",
					"md:hidden"
				);
				pag[activeIndex - 6].classList.replace("md:inline-flex", "md:hidden");
				pag[activeIndex - 5].classList.replace("md:inline-flex", "md:hidden");
				pag[activeIndex - 4].classList.replace("md:inline-flex", "md:hidden");
			} else if (activeIndex === 21) {
				span[1].classList.replace("md:inline-flex", "md:hidden");
				pag[activeIndex + 2].classList.replace("md:hidden", "md:inline-flex");
				pag[activeIndex + 1].classList.replace("md:hidden", "md:inline-flex");
				pag[activeIndex].classList.replace("md:hidden", "md:inline-flex");
			} else {
				event.preventDefault();
			}
		} else if (activeIndex === 3) {
			pag[4].classList.replace("md:hidden", "md:inline-flex");
		} else {
			activeIndex = index;
		}

		updatePagination();
		window.scrollTo(0, 0);
	});
});

updatePagination();

let items_pro = () => {
	item.children[0].innerText = "1";
	item.children[1].innerText = "10";
	pro_item[0].innerHTML = items_new_data
		.filter((item) => item.id >= 6 && item.id <= 15)
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
	pag.forEach((elem) => {
		elem.addEventListener("click", () => {
			pag.forEach((elem2, index) => {
				if (elem2.classList.contains("bg-[#1e6889]")) {
					item.children[0].innerText = index * 9 + (index - 4) - 5;
					item.children[1].innerText = index * 9 + (index + 5) - 5;
					pro_item[0].innerHTML = items_new_data
						.filter(
							(item) =>
								item.id >= index * 9 + (index - 4) &&
								item.id <= index * 9 + (index + 5)
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
				}
			});
		});
	});

	grouping.forEach((elem, index) => {
		elem.addEventListener("click", () => {
			if (index === 0) {
				grouping.forEach((elem2) => {
					elem2.classList.remove("text-[#2ea4c2]");
					grouping[index].classList.add("text-[#2ea4c2]");
				});
				pro_parent.forEach((elem3) => {
					if (elem3.classList.contains("flex")) {
						elem3.classList.replace("flex", "hidden");
						pro_parent[0].classList.replace("hidden", "flex");
					}
				});
				pag_btn.classList.remove("hidden");
				item.children[0].innerText = "1";
				item.children[1].innerText = "10";
				item.children[2].innerText = "110";
				title.innerText = "محصولات";
			} else {
				grouping.forEach((elem2) => {
					elem2.classList.remove("text-[#2ea4c2]");
					grouping[index].classList.add("text-[#2ea4c2]");
				});
				if (pro_parent[0].classList.contains("flex")) {
					pro_parent[0].classList.replace("flex", "hidden");
					pro_parent[index].classList.replace("hidden", "flex");
				} else {
					pro_parent.forEach((elem3) => {
						if (elem3.classList.contains("flex")) {
							elem3.classList.replace("flex", "hidden");
							pro_parent[index].classList.replace("hidden", "flex");
						}
					});
				}
				pag_btn.classList.add("hidden");
				item.children[0].innerText = 1;
				item.children[1].innerText = items_new_data.filter(
					(item) => item.mat === mat[index] && item.id >= 6
				).length;
				item.children[2].innerText = items_new_data.filter(
					(item) => item.mat === mat[index] && item.id >= 6
				).length;
				title.innerText = grouping[index].innerText;
				pro_item[index].innerHTML = items_new_data
					.filter((item) => item.mat === mat[index] && item.id >= 6)
					.map((e) => {
						let { id, title, desc, price, img } = e;
						return `
				<div
					class="new_item_${id} w-[18.5%] pb-2.5 shadow-[1px_3px_10px_2px_#8b8b8b] text-zinc-800 flex flex-col justify-between rounded-xl">
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
			}
		});
	});
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
