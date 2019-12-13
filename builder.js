
const GLOBAL_MIN = -11500;
const GLOBAL_MAX = 2000;

function yearify(year) {
	if (year < 0) {
		return -year + ' BCE';
	}
	else if (year > 0) {
		return year + ' CE';
	}
	else {
		return 'BCE&nbsp;/&nbsp;CE'; // no year 0
	}
}

function plot(element, year, loc) {
	element.append(`
		<div class='marker' style='left: ${loc}vh;'>
			<h3>${yearify(year)}</h3>
		</div>
	`);
}

$.getJSON('timeline.json', function(timelineData) {

	const SCALE = [
		[-2500, 0.006, 1500],
		[500, 0.04, 250],
		[1250, 0.05, 250],
		[Infinity, 0.3, 50]
	];

	function widthCalc(begin, end) {
		let Ccursor = begin;
	  let Csegment = 0;
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
  let segment = 0;
  let locator = 0;

  let plotNow = () => {plot($('main .markings'), cursor, locator)};
  while (true) {
  	plotNow();
  	cursor += SCALE[segment][2];
  	locator += SCALE[segment][1] * SCALE[segment][2];
  	if (cursor >= SCALE[segment][0]) {
  		segment++;
  	}
		if (cursor >= GLOBAL_MAX) {
			plotNow();
			break;
		}
  }

  $('main').css('width', widthCalc(GLOBAL_MIN, GLOBAL_MAX) + 'vh');

  for (let evt of timelineData.events) {
  	if (evt.type === 'range') {
	  	$(evt.region).append(`
	  		<div class='bar' style='width: ${widthCalc(evt.begin, evt.end)}vh; top: ${evt.shift + 12}vh; left: ${widthCalc(GLOBAL_MIN, evt.begin)}vh;'>
	  			<h2>${evt.name}</h2>
	  			<p hidden>${evt.description}</p>
	  			<address hidden>${evt.picture}</address>
	  			<time hidden>${yearify(evt.begin)} &ndash; ${yearify(evt.end)}</time>
	  		</div>
	  	`);
	  }
	  else if (evt.type === 'point') {
	  	$(evt.region).append(`
	  		<div class='dot' style='top: ${evt.shift + 12}vh; left: ${widthCalc(GLOBAL_MIN, evt.at)}vh;'>
	  			<div class='dot-details'>
		  			<h2>${evt.name}</h2>
	  				<p hidden>${evt.description}</p>
	  				<address hidden>${evt.picture}</address>
	  				<time hidden>${yearify(evt.at)}</time>
		  		</div>
	  		</div>
	  	`);
	  }
  }

});
