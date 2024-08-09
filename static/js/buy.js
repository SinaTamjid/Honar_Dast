let summary = document.querySelector(
	"main > div.Contents > div.summary > div.prices"
);
let order = document.querySelector("main > div.Contents > div.Contents");
let badge = document.querySelector(".badge");

let badge_basket = JSON.parse(localStorage.getItem("badge_basket")) || [];

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

let buy_items = () => {
	if (badge_basket.length !== 0) {
		return (order.innerHTML = badge_basket
			.map((i) => {
				let { id, item } = i;
				let search = items_new_data.find((item) => item.id === id) || [];
				return `
					<div
						class="item_${
							search.id
						} w-full border border-zinc-200 rounded-xl p-3 flex flex-row justify-between items-center gap-4">
						<img
							class="w-[88px] !h-[88px] rounded-lg"
							src="${search.img}"
							alt="item_${search.id}" />
						<div
							class="w-2/5 subject font-[IranYekanMedium] flex flex-col justify-center items-start gap-3">
							<p class="title text-lg font-bold">${search.title}</p>
							<p class="description text-[11px]">${search.desc}</p>
						</div>
						<div class="count flex flex-row justify-center items-center gap-3">
							<button
								type="button"
								class="plus w-6 h-6 p-2 rounded-full flex flex-row justify-center items-center hover:bg-[#1e6889] hover:text-white transition-all"
                                onclick="add(${id})"
                                >
								<i class="fa-regular fa-plus"></i>
							</button>
							<input
								class="w-8 h-8 border border-zinc-200 rounded-md text-center font-[IranYekanMedium] text-sm text-[#2ea4c2] caret-[#2ea4c2] outline-none"
								type="number"
								id="${id}"
								name="count" 
                                value="${item}"/>
							<button
								type="button"
								class="minus w-6 h-6 p-2 rounded-full flex flex-row justify-center items-center hover:bg-[#1e6889] hover:text-white transition-all"
                                onclick="reduc(${id})"
                                >
								<i class="fa-regular fa-minus"></i>
							</button>
						</div>
						<p class="price mr-5 font-[IranYekanMedium] text-zinc-800">${search.price.toLocaleString()} تومان</p>
						<a
							class="w-7 h-7 p-4 ml-5 rounded-full flex flex-row justify-center items-center hover:bg-[#e29fb5] hover:text-white transition-all"
							href="#!"
                            onclick="remove(${id})"
                            >
							<i class="fa-regular fa-xmark"></i>
						</a>
					</div>
				`;
			})
			.join(""));
	} else {
		order.innerHTML = `<h2 class="font-bold font-[IranYekanMedium]">سفارشی وجود ندارد.</h2>`;
	}
};

buy_items();

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

	buy_items();
	update(id);
	localStorage.setItem("badge_basket", JSON.stringify(badge_basket));
};

let reduc = (id) => {
	let search = badge_basket.find((item) => item.id === id);

	if (search === undefined) return;
	else if (search.item === 0) return;
	else {
		search.item -= 1;
	}
	update(id);
	badge_basket = badge_basket.filter((i) => i.item !== 0);
	buy_items();
	localStorage.setItem("badge_basket", JSON.stringify(badge_basket));
};

let update = (id) => {
	let search = badge_basket.find((item) => item.id === id);
	document.getElementById(id).innerHTML = search.item;
	calculation();
	total();
};

let remove = (id) => {
	badge_basket = badge_basket.filter((item) => item.id !== id);
	buy_items();
	total();
	localStorage.setItem("badge_basket", JSON.stringify(badge_basket));
};

let total = () => {
	if (badge_basket.length !== 0) {
		let amount = badge_basket
			.map((i) => {
				let { item, id } = i;
				let search = items_new_data.find((item) => item.id === id) || [];

				return item * search.price;
			})
			.reduce((x, y) => x + y, 0);
		summary.innerHTML = `
			<div class="pro_price w-full flex flex-row justify-between items-center">
				<span class="title font-[IranYekanBold] text-lg">قیمت کالا ها : </span>
				<p class="price text-[15px]">
					${amount.toLocaleString()}
					<span class="unit">تومان</span>
				</p>
			</div>
			<div
				class="discount_code w-full flex flex-col justify-center items-start">
				<span class="title font-[IranYekanBold] text-lg">کد تخفیف : </span>
				<div class="discount w-full flex flex-row justify-end items-center">
					<button
						class="w-24 h-7 mx-2 bg-[#1e6889] text-[13px] text-white rounded-md hover:bg-[#2ea4c2] hover:text-black"
						type="button">
						اعمال تخفیف
					</button>
					<input
						class="discount w-40 h-7 pl-2 rounded-md text-[13px] outline-none caret-[#2ea4c2] border"
						type="text"
						id="discount"
						name="discount" />
				</div>
			</div>
			<div class="discount w-full flex flex-row justify-between items-center">
				<span class="title font-[IranYekanBold] text-lg">تخفیف : </span>
				<p class="price text-[15px]">
					10,000
					<span class="unit">تومان</span>
				</p>
			</div>
			<div
				class="total_price w-full mt-10 flex flex-row justify-between items-center">
				<span class="title font-[IranYekanBold] text-lg">جمع سبد خرید : </span>
				<p class="price text-[15px]">
					${(amount = amount > 0 ? (amount - 10000).toLocaleString() : 0)}
					<span class="unit">تومان</span>
				</p>
			</div>
		`;
	} else {
		summary.innerHTML = `
			<div class="pro_price w-full flex flex-row justify-between items-center">
				<span class="title font-[IranYekanBold] text-lg">قیمت کالا ها : </span>
				<p class="price text-[15px]">
					0
					<span class="unit">تومان</span>
				</p>
			</div>
			<div
				class="discount_code w-full flex flex-col justify-center items-start">
				<span class="title font-[IranYekanBold] text-lg">کد تخفیف : </span>
				<div class="discount w-full flex flex-row justify-end items-center">
					<button
						class="w-24 h-7 mx-2 bg-[#1e6889] text-[13px] text-white rounded-md hover:bg-[#2ea4c2] hover:text-black"
						type="button">
						اعمال تخفیف
					</button>
					<input
						class="discount w-40 h-7 pl-2 rounded-md text-[13px] outline-none caret-[#2ea4c2] border"
						type="text"
						id="discount"
						name="discount" />
				</div>
			</div>
			<div class="discount w-full flex flex-row justify-between items-center">
				<span class="title font-[IranYekanBold] text-lg">تخفیف : </span>
				<p class="price text-[15px]">
					10,000
					<span class="unit">تومان</span>
				</p>
			</div>
			<div
				class="total_price w-full mt-10 flex flex-row justify-between items-center">
				<span class="title font-[IranYekanBold] text-lg">جمع سبد خرید : </span>
				<p class="price text-[15px]">
					0
					<span class="unit">تومان</span>
				</p>
			</div>
		`;
	}
};

total();
