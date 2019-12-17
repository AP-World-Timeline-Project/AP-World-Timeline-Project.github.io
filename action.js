
const UNITS = {
	'0' : 'History Before 1200',
	'1' : 'The Global Tapestry (1200&ndash;1450)',
	'2' : 'Networks of Exchange (1200&ndash;1450)',
	'3' : 'Land-Based Empires (1450&ndash;1750)',
	'4' : 'Transoceanic Interconnections (1450&ndash;1750)',
	'5' : 'Revolutions (1750&ndash;1900)'
};

$(document).on('click', '.bar, .dot', function (e) {
	let scroll = $('article');
	let tapTarget = $(e.currentTarget);
	scroll.find('.article-heading').html(`<h5>${tapTarget.find('h2').text()}</h5><h6>${tapTarget.find('time').text()}</h6>`);
	scroll.find('.content').html(
		tapTarget.find('.desc').html().split('<br>').map(x => '<p>' + x + '</p>')
		+
		`<p>
			<a href='${tapTarget.find('address').text()}'>Image Source</a>
		</p>`
	);
	let unit = tapTarget.find('.unit').text();
	scroll.find('.info-unit').html(unit + ': ' + UNITS[unit]);
	scroll.find('.info-region').html(tapTarget.find('.regions').text());
	scroll.find('header').css('background-image', `url('${tapTarget.find('address').text()}')`);
	scroll.removeClass('hide');
	$('.container').addClass('popup-open');
});

$('article nav button').on('click', function (e) {
	$('article').addClass('hide');
	$('.container').removeClass('popup-open');
});
