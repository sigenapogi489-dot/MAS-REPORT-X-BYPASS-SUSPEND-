let type;
let _token;
let clicked = false;


window.hc_ = function(token) {
	_token = token;
};


$('label span').click(function() {
	let state = $(this).text();
	if (state.startsWith('fbstate')) {
		$(this).text('cookie - tap to change!');
		type = 2;
	} else {
		$(this).text('fbstate - tap to change!');
		type = 1;
	}
});


$('button').click(function() {
	if (clicked) return;
	
	clicked = true;
	
	const a = $('input').eq(0).val();
	const b = $('input').eq(1).val();
	const c = $('select').val().toUpperCase();
	const d = type || 1;
	
	$('.card-form .alert').remove();
	$('.card-form').append(`<div class="alert alert-primary">Submitting your request, please wait.</div>`);
	
	$.post('/api/reaction', { a, b, c, d, _token }, function(data) {
		clicked = false;
		$('.card-form .alert').remove();
	        hcaptcha.reset(); _token = "";
		if (data.success === true) {
			$('.card-form').append(`<div class="alert alert-success">${data.message}</div>`);
		} else if (data.success === false) {
			$('.card-form').append(`<div class="alert alert-danger">${data.error}</div>`);
		} else {
			$('.card-form').append(`<div class="alert alert-danger">An unexpected error occurred, and no detailed error message was received. Please report this issue to <a href="https://www.facebook.com/its.uzoq">@Uzoq</a>.</div>`);
		}
	}).fail(function(e) {
		clicked = false;
		$('.card-form .alert').remove();
		$('.card-form').append(`<div class="alert alert-danger">Request failed. Please check your internet connection and try again.</div>`);
		console.error('error ! ', JSON.stringify(e, null, 4));
	});
});
