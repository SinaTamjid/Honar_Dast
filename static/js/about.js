let about_inp = document.querySelector(
	"main.main > div.about_content > div.about_content > div.content > input.read_more_btn"
);

let p_comp = document.querySelector(
	"main.main > div.about_content > div.about_content > div.content > p.about_txt_comp"
);

let p_incomp = document.querySelector(
	"main.main > div.about_content > div.about_content > div.content > p.about_txt_incomp"
);

let showless_a = document.querySelector(
	"main.main > div.about_content > div.about_content > div.content > p.about_txt_comp > a"
);

about_inp.addEventListener("click", () => {
	p_comp.classList.remove("hidden");
	p_incomp.classList.add("hidden");
	about_inp.classList.add("hidden");
});

showless_a.addEventListener("click", () => {
	p_comp.classList.add("hidden");
	p_incomp.classList.remove("hidden");
	about_inp.classList.remove("hidden");
});
