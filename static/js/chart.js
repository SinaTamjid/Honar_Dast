const ctx = document.querySelector("canvas#chart");

new Chart(ctx, {
	type: "bar",
	data: {
		labels: [
			"شنبه",
			"یکشنبه",
			"دوشنبه",
			"سه شنبه",
			"چهارشنبه",
			"پنجشنبه",
			"جمعه",
		],
		datasets: [
			{
				backgroundColor: "#2ea4c2",
				borderColor: "#2ea4c2",
				hoverBackgroundColor: "#2ea4c2",
				hoverBorderColor: "#2ea4c2",
				data: [
					69000000, 63000000, 24000000, 48000000, 52000000, 66000000, 44000000,
				],
				barPercentage: 0.75,
				categoryPercentage: 0.5,
			},
		],
	},
	options: {
		maintainAspectRatio: false,
		cutoutPercentage: 80,
		plugins: {
			legend: {
				display: false,
			},
		},
		scales: {
			x: {
				grid: {
					color: "transparent",
				},
				ticks: {
					color: "#9c9c9c",
					font: {
						size: 12,
						family: "IranYekanBold",
					},
				},
			},
			y: {
				grid: {
					color: "#dad2d8",
				},
				ticks: {
					color: "#9c9c9c",
					font: {
						size: 12,
						family: "IranYekanBold",
					},
				},
			},
		},
	},
});
