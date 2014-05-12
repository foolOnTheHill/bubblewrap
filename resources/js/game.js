var dim = 3;
var clicks = 0;
var started = false;

$('#start').click(function() {
	$('#start').addClass('hidden');
	$('#stop').removeClass('hidden');
	$('#scores').removeClass('hidden');
	
	document.getElementById('clicks').innerHTML = '0';

	setGame(dim);
	started = true;
});

$('#stop').click(function() {
	$('#stop').addClass('hidden');
	$('#start').removeClass('hidden');
	started = false;
	dim = 3;
	clicks = 0;

	document.getElementById('game').innerHTML = '';
});

function setGame(size) {
	document.getElementById('game').innerHTML = '';
	for (var i = 0; i < size; i++) {
		var line = '<div class="row game_row">';
		for (var j = 0; j < size; j++) {
			line += '<div id="'+i+'_'+j+'" class="ucell" onclick="play('+i+', '+j+')"></div>';
		}
		line += '</div>'
		$('#game').append(line);
	}

	var screenWidth = Math.max(620, $(window).width()-1000);
	var diam = Math.min(60, Math.round(screenWidth/dim));
	$('.game_row div').css('width', diam+'px');
	$('.game_row div').css('height', diam+'px');

	document.getElementById('completed').innerHTML = '0%';

	var offset = Math.max(0, (($(window).width() - (size*diam))/2) - 15);

	$('#game').css('margin-left', offset);
	$('#game').focus();

	document.getElementById('level').innerHTML = dim-2;
}

function play(i, j) {

	if (!started) {
		return;
	}

	toggle(i, j);
	toggle(i-1, j);
	toggle(i+1, j);
	toggle(i, j-1);
	toggle(i, j+1);
	check();

	clicks += 1;
	document.getElementById('clicks').innerHTML = clicks;
}

function toggle(i, j) {

	if (i < 0 || i >= dim  || j < 0 || j >= dim) {
		return;
	}

	var btn = $('#'+i+'_'+j);

	if (btn.hasClass('ucell')) {
		btn.removeClass('ucell');
		btn.addClass('dcell');
	} else {
		btn.removeClass('dcell');
		btn.addClass('ucell');
	}

}

function check() {
	var count = 0;
	for (var i = 0; i < dim; i++) {
		for (var j = 0; j < dim; j++) {
			if ($('#'+i+'_'+j).hasClass('dcell')) {
				count++;
			}
		}
	}

	if (count === (dim*dim)) {
		dim += 1;
		setGame(dim);
	}

	var completed = 100*(count / (dim*dim));
	document.getElementById('completed').innerHTML = Math.round(completed)+'%';
}

function reset() {
	dim = 3;
	setGame(3);
}

function share() {
	FB.ui({
	  method: 'share',
	  href: 'http://foolonthehill.github.io/bubblewrap/',
	}, function(response){});
}
