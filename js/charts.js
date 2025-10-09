// Chart helpers built on Chart.js (CDN loaded in pages that need it)

/**
 * renderAttendanceChart renders a donut of attendance percentage
 * @param {HTMLCanvasElement} canvas
 * @param {number} percent 0-100
 */
function renderAttendanceChart(canvas, percent) {
	if (!window.Chart) return; // Chart.js not loaded
	const remaining = Math.max(0, 100 - percent);
	return new Chart(canvas, {
		type: 'doughnut',
		data: {
			labels: ['Present', 'Absent'],
			datasets: [{ data: [percent, remaining], backgroundColor: ['#22c55e', '#e2e8f0'] }]
		},
		options: { plugins: { legend: { position: 'bottom' } }, cutout: '70%' }
	});
}

/**
 * renderGradesChart renders bar chart of grades distribution
 * @param {HTMLCanvasElement} canvas
 * @param {{label:string, value:number}[]} items
 */
function renderGradesChart(canvas, items) {
	if (!window.Chart) return;
	return new Chart(canvas, {
		type: 'bar',
		data: {
			labels: items.map(i => i.label),
			datasets: [{ label: 'Grades', data: items.map(i => i.value), backgroundColor: '#3b82f6' }]
		},
		options: { plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
	});
}

window.EduCharts = { renderAttendanceChart, renderGradesChart };

