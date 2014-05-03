var dim = 3;
var clicks = 0;
var started = false;

var initTime;
var endTime;

$('#start').click(function() {
	$('#start').addClass('hidden');
	$('#stop').removeClass('hidden');
	$('#timeLabel').addClass('hidden');

	document.getElementById('clicks').innerHTML = '0';

	setGame(dim);
	started = true;
	initTime = (new Date()).getTime();
});

$('#stop').click(function() {
	$('#stop').addClass('hidden');
	$('#start').removeClass('hidden');
	started = false;
	dim = 3;
	clicks = 0;

	endTime = (new Date()).getTime();	
	var totalTime = (endTime - initTime)/600;

	document.getElementById('time').innerHTML = totalTime.toFixed(2) + ' seconds';	
	$('#timeLabel').removeClass('hidden');

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

	document.getElementById('completed').innerHTML = '0%';

	var offset = Math.max(0, (($(window).width() - (size*80))/2) - 15);

	$('#game').css('margin-left', offset);
	$('#game').focus();

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
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			if ($('#'+i+'_'+j).hasClass('dcell')) {
				count++;
			}
		}
	}

	if (count === 9) {
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
