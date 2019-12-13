
$(document).on('click', '.bar, .dot', function (e) {
	let scroll = $('article');
	let tapTarget = $(e.currentTarget);
	scroll.find('h5').html(tapTarget.find('h2').text() + ` [&nbsp;${tapTarget.find('time').text()}&nbsp;]`);
	scroll.find('p').html(tapTarget.find('p').text());
	scroll.find('header').css('background-image', `url('${tapTarget.find('address').text()}')`);
	scroll.removeClass('hide');
	$('.container').addClass('popup-open');
});

$('article nav button').on('click', function (e) {
	$('article').addClass('hide');
	$('.container').removeClass('popup-open');
});

(function () {

	var blurFilter = document.getElementById('blur-kernel');
	var scrollView = $('.container');
	var prevPos = $(window).scrollLeft();
	var prevTime = Date.now();
	var speed = 0;
	var cheat = 0;
	var stepper = 0;

	function blur() {
		stepper++;

		if (stepper >= 3) {

			stepper = 0;

		  cheat = 1 - cheat; // alternates between 0 and 1; used to force browser repaint by setting CSS

		  let newPos = $(window).scrollLeft();
		  let newTime = Date.now()

		  // distance over time times milliseconds per frame
		  velocity = (newPos - prevPos) / Math.max(1, newTime - prevTime) * 1000 / 60;
		  
		  prevPos = newPos;
		  prevTime = newTime;
		  
		  const STRENGTH = 2;
		  blurSize = Math.max(0, Math.abs(velocity) / 2 * STRENGTH - 0.5);

		  blurFilter.setStdDeviation(0, Math.floor(blurSize));
		  blurFilter.setAttribute('stdDeviation', blurSize + ',0');

		  // forces browser repaint
		  scrollView.css('margin-bottom', cheat + 'px');
		 }
	  
	  requestAnimationFrame(blur);
	}

	requestAnimationFrame(blur);

})();
