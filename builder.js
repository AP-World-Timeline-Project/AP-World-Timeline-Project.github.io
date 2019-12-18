
const GLOBAL_MIN = -11000;
const GLOBAL_MAX = 2000;

function yearify(year, html = false) {
	if (year < 0) {
		return -year + (html ? ' <span>BC</span>' : ' BC');
	}
	else if (year > 0) {
		return year + (html ? ' <span>AD</span>' : ' AD');
	}
	else {
		return null; // no year 0
	}
}

function plot(element, year, loc, major = true) {
	if (year === 0) {
		element.append(
			`
				<div class='marker supreme' style='left: ${loc}vh;'></div>
			`
		);
		return;
	}
	element.append(
		major ?
		`
			<div class='marker major' style='left: ${loc}vh;'>
				<h3>${yearify(year, true)}</h3>
			</div>
		` : `
			<div class='marker minor' style='left: ${loc}vh;'></div>
		`
	);
}

var timelineDataJSON;

$.getJSON('timeline.json', function(timelineData) {

	timelineDataJSON = timelineData;

	const SCALE = [
		[GLOBAL_MIN],
		[-3000, 0.005, 2000, 200],
		[1200, 0.05, 200, 50],
		[Infinity, 0.25, 50, 25]
	];

	function widthCalc(begin, end) {
		let Ccursor = begin;
		let Csegment = 1;
		let Clocator = 0;
		while (true) {
			Ccursor += 1;
			Clocator += SCALE[Csegment][1];
			if (Ccursor >= SCALE[Csegment][0]) {
				Csegment++;
			}
			if (Ccursor >= end) {
				return Clocator;
			}
		}
	}

	let cursor = GLOBAL_MIN;
	let segment = 1;
	let locator = 0;

	let plotNow = (major = true) => {plot($('main .markings'), cursor, locator, major)};
	while (true) {
		plotNow((cursor - SCALE[segment-1][0]) % SCALE[segment][2] === 0);
		cursor += SCALE[segment][3];
		locator += SCALE[segment][1] * SCALE[segment][3];
		if (cursor >= SCALE[segment][0]) {
			segment++;
		}
		if (cursor >= GLOBAL_MAX) {
			break;
		}
	}

	$('.timeline-summary-viewbox, .container, main').css('width', widthCalc(GLOBAL_MIN, GLOBAL_MAX) + 'vh');

	for (let [i, evt] of timelineData.events.entries()) {

		let lineSelectors = evt.region.map(x => ({
			'Africa & the Islamic World' : '.s-africa-islamic',
			'Asia' : '.s-china-india',
			'Europe' : '.s-europe',
			'The Americas' : '.s-americas'
		}[x])).join(', ');

		if (evt.type === 'range') {
			$(lineSelectors).append(`
				<div class='bar' style='width: ${widthCalc(evt.begin, evt.end)}vh; top: ${evt.shift + 12}vh; left: ${widthCalc(GLOBAL_MIN, evt.begin)}vh;'>
					<h2>${evt.name}</h2>
					<p hidden class='id'>${i}</p>
				</div>
			`);
		}
		else if (evt.type === 'point') {
			$(lineSelectors).append(`
				<div class='dot' style='top: ${evt.shift + 12}vh; left: ${widthCalc(GLOBAL_MIN, evt.at)}vh;'>
					<div class='dot-details'>
						<h2>${evt.name}</h2>
						<p hidden class='id'>${i}</p>
					</div>
				</div>
			`);
		}
	}

});
