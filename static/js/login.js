let inp = document.querySelector(
	"main.main > div.submit > form > div.input_form > div.wave-group:nth-of-type(2) > input"
);
let show = document.querySelector(
	"main.main > div.submit > form > div.input_form > div.wave-group:nth-of-type(2) > button.show_pass"
);

let svg_3 = document.getElementById("eye");
let svg_4 = document.getElementById("eye-slash");

show.addEventListener("click", () => {
	if (inp.type === "password") {
		inp.type = "text";
		svg_4.style.display = "none";
		svg_3.style.display = "block";
	} else {
		inp.type = "password";
		svg_4.style.display = "block";
		svg_3.style.display = "none";
	}
});
