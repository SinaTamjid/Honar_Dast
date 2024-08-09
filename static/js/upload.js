const fileInput = document.getElementById("fileToUpload");
const imagePreview = document.getElementById("imagePreview");
const previewImage = imagePreview.querySelector(".image-preview__image");
const loader = document.getElementById("loader");
const deleteButton = document.getElementById("deleteButton");

fileInput.addEventListener("change", function () {
	const file = this.files[0];

	if (file) {
		const reader = new FileReader();

		loader.classList.add("active");

		reader.addEventListener("load", function () {
			setTimeout(() => {
				previewImage.classList.remove("hidden");
				previewImage.setAttribute("src", this.result);
				previewImage.classList.add("loaded");
				loader.classList.remove("active");
				imagePreview.children[0].removeAttribute("style");
				imagePreview.children[1].removeAttribute("style");
			}, 3000);
		});

		reader.readAsDataURL(file);
	} else {
		previewDefaultText.style.display = null;
		previewImage.style.display = null;
		previewImage.setAttribute("src", "");
	}
});

imagePreview.addEventListener("dragover", function (e) {
	e.preventDefault();
	imagePreview.classList.add("dragover");
	imagePreview.style.backgroundColor = "#1e67896e";
	imagePreview.children[0].style.opacity = "0";
	imagePreview.children[1].style.opacity = "1";
});

imagePreview.addEventListener("dragleave", function (e) {
	e.preventDefault();
	imagePreview.classList.remove("dragover");
	imagePreview.removeAttribute("style");
	imagePreview.children[0].removeAttribute("style");
	imagePreview.children[1].removeAttribute("style");
});

imagePreview.addEventListener("drop", function (e) {
	e.preventDefault();
	imagePreview.classList.remove("dragover");
	imagePreview.children[0].removeAttribute("style");
	imagePreview.children[1].removeAttribute("style");
	const file = e.dataTransfer.files[0];

	if (file) {
		const reader = new FileReader();

		loader.classList.add("active");

		reader.addEventListener("load", function () {
			setTimeout(() => {
				previewImage.classList.remove("hidden");
				previewImage.setAttribute("src", this.result);
				previewImage.classList.add("loaded");
				loader.classList.remove("active");
				imagePreview.children[0].removeAttribute("style");
				imagePreview.children[1].removeAttribute("style");
			}, 3000);
		});

		reader.readAsDataURL(file);
	}
});

deleteButton.addEventListener("click", () => {
	previewImage.classList.add("hidden");
	previewImage.setAttribute("src", "#!");
});
