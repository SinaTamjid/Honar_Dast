var swiper = new Swiper(".mySwiper", {
	slidesPerView: 1,
	autoplay: {
		speed: 5000,
		delay: 7000,
	},
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
		dynamicBullets: true,
	},
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
});
