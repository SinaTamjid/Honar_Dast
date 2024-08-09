let time = document.querySelector(
	"main > div.Contents > div.content > div.second_content > div.welcom > p.time"
);

let inp2 = document.querySelector(
	"main.main > div.Contents > div.content > div.third_content > div.prof > div.Contents > div.content_1 > form > div.wave-group:nth-of-type(4) > input"
);

let inp3 = document.querySelector(
	"main.main > div.Contents > div.content > div.third_content > div.prof > div.Contents > div.content_1 > form > div.wave-group:nth-of-type(5) > input"
);

let bar = document.querySelector(
	"main.main > div.Contents > div.content > div.third_content > div.prof > div.Contents > div.content_1 > form > div.wave-group:nth-of-type(5) > span"
);

let label = document.querySelector(
	"main.main > div.Contents > div.content > div.third_content > div.prof > div.Contents > div.content_1 > form > div.wave-group:nth-of-type(5) > label > span"
);

let show2 = document.querySelector(
	"main.main > div.Contents > div.content > div.third_content > div.prof > div.Contents > div.content_1 > form > div.wave-group:nth-of-type(4) > button.show_pass"
);

let show3 = document.querySelector(
	"main.main > div.Contents > div.content > div.third_content > div.prof > div.Contents > div.content_1 > form > div.wave-group:nth-of-type(5) > button.show_pass"
);
let best_sell = document.querySelector(
	"main.main > div.Contents > div.content > div.fourth_content > div.best_seller > div.Contents"
);
let dark_mode = document.querySelector("input[type='checkbox']");

let html = document.querySelector("html");

let badge = document.querySelector(".badge");

let badge_basket = JSON.parse(localStorage.getItem("badge_basket")) || [];

let svg_3 = document.getElementById("eye2");

let svg_4 = document.getElementById("eye-slash2");

let svg_5 = document.getElementById("eye3");

let svg_6 = document.getElementById("eye-slash3");

let set_time = () => {
	let Time = new Date();
	time.children[0].innerText = `${Time.toLocaleDateString("fa-IR", {
		weekday: "long",
	})}،`;
	time.children[1].innerText = Time.toLocaleDateString("fa-IR", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
	time.children[2].innerText = `ساعت : ${Time.toLocaleTimeString("fa-IR", {
		hour: "2-digit",
		minute: "numeric",
	})}`;
};

set_time();

dark_mode.addEventListener("change", () => {
	if (dark_mode.checked) {
		html.classList.add("dark");
		svg_3.setAttribute("fill", "#fff");
		svg_4.setAttribute("fill", "#fff");
		svg_5.setAttribute("fill", "#fff");
		svg_6.setAttribute("fill", "#fff");
	} else {
		html.classList.remove("dark");
		svg_3.removeAttribute("fill");
		svg_4.removeAttribute("fill");
		svg_5.removeAttribute("fill");
		svg_6.removeAttribute("fill");
	}
});

let items_pro = () => {
	best_sell.innerHTML = items_new_data
		.filter(
			(item) =>
				(item.id >= 1 && item.id <= 5) ||
				item.id === 15 ||
				item.id === 18 ||
				item.id === 23
		)
		.map((e) => {
			let { id, title, desc, img } = e;
			return `
				<div
					class="new_item_${id} w-full h-80 pb-2.5 ml-5 bg-white dark:bg-[#1d1d1d] dark:text-white shadow-[1px_3px_10px_2px_#8b8b8b] text-zinc-800 flex flex-col justify-between rounded-xl">
					<img
						class="new_img w-40 h-40 max-w-[unset] rounded-lg m-3"
						src="${img}"
						title="${title}"
						alt="new_item_${id}" />
					<p class="m-2.5 mb-8">
						${title}
						<br />
						<span class="text-[11px] pt-3 inline-block">${desc}</span>
					</p>
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

show2.addEventListener("click", () => {
	if (inp2.type === "password") {
		inp2.type = "text";
		svg_4.style.display = "none";
		svg_3.style.display = "block";
	} else {
		inp2.type = "password";
		svg_4.style.display = "block";
		svg_3.style.display = "none";
	}
});

show3.addEventListener("click", () => {
	if (inp3.type === "password") {
		inp3.type = "text";
		svg_6.style.display = "none";
		svg_5.style.display = "block";
	} else {
		inp3.type = "password";
		svg_6.style.display = "block";
		svg_5.style.display = "none";
	}
});

inp3.addEventListener("input", () => {
	if (inp2.value !== "" && inp2.value !== inp3.value) {
		bar.classList.replace("after:bg-[#2ea4c2]", "after:bg-red-600");
		bar.classList.replace("before:bg-[#2ea4c2]", "before:bg-red-600");
		label.classList.add("!text-red-600");
	} else {
		bar.classList.replace("after:bg-red-600", "after:bg-[#2ea4c2]");
		bar.classList.replace("before:bg-red-600", "before:bg-[#2ea4c2]");
		label.classList.remove("!text-red-600");
	}
	if (inp3.value === "") {
		bar.classList.replace("after:bg-red-600", "after:bg-[#2ea4c2]");
		bar.classList.replace("before:bg-red-600", "before:bg-[#2ea4c2]");
		label.classList.remove("!text-red-600");
	}
});
