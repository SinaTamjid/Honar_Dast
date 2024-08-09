let inp2 = document.querySelector(
	"main.main > div.submit > form > div.input_form > div.wave-group:nth-of-type(6) > input"
);
let inp3 = document.querySelector(
	"main.main > div.submit > form > div.input_form > div.wave-group:nth-of-type(7) > input"
);
let bar = document.querySelector(
	"main.main > div.submit > form > div.input_form > div.wave-group:nth-of-type(7) > span"
);
let label = document.querySelector(
	"main.main > div.submit > form > div.input_form > div.wave-group:nth-of-type(7) > label > span"
);
let show2 = document.querySelector(
	"main.main > div.submit > form > div.input_form > div.wave-group:nth-of-type(6) > button.show_pass"
);
let show3 = document.querySelector(
	"main.main > div.submit > form > div.input_form > div.wave-group:nth-of-type(7) > button.show_pass"
);

let svg_3 = document.getElementById("eye2");
let svg_4 = document.getElementById("eye-slash2");
let svg_5 = document.getElementById("eye3");
let svg_6 = document.getElementById("eye-slash3");

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
