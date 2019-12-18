
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

	let dataBlock = timelineDataJSON.events[Number(tapTarget.find('.id').text())];

	scroll.find('.article-heading h5').html(dataBlock.name);
	scroll.find('.article-heading h6').html(yearify(dataBlock.at) || yearify(dataBlock.begin) + ' &ndash; ' + yearify(dataBlock.end));
	scroll.find('.content').html(dataBlock.description.split('\n').map(x => '<p>' + x + '</p>'));
	let unit = dataBlock.unit;
	scroll.find('.info-unit').html(unit + ': ' + UNITS[unit]);
	scroll.find('.info-region').html(dataBlock.region.join(', ').replace(/&/gmi, '&amp;'));
	scroll.find('header figure').remove();

	for (let picture of dataBlock.picture) {
		scroll.find('header').append(`
			<figure>
				<img src='${picture.url}' alt=''>
				<figcaption>
					<p>
						${picture.caption || dataBlock.name}
					</p>
					<p>
						<a href='${picture.url}'>Image Source</a>
					</p>
				</figcaption>
			</figure>
		`);
	}
	scroll.removeClass('hide');
	$('.container').addClass('popup-open');
});

$('article nav button').on('click', function (e) {
	$('article').addClass('hide');
	$('.container').removeClass('popup-open');
});
