var RT = {};
RT.terms = 'zena rocks';
RT.subreddit = 'all';

RT.getPosts = function (sort, limit) {
	var that = this;
	$.ajax({
		url : 'http://www.reddit.com/r/' + that.subreddit + '/search.json?q=' + that.terms + '&sort=' + sort + '&limit=' + limit,
		success : function (result) {
			var data = result.data.children;
			var created = '';
			$('#' + sort).html('');
			var i = 0;
			for (i = 0; i < data.length; i++) {
				created = new Date(data[i].data.created);
				$('#' + sort).append('<li>' +
					'<a href="http://www.reddit.com' + data[i].data.permalink + '">' +
					data[i].data.title +
					'</a><br>' +
					'r/' + data[i].data.subreddit + '<br>' +
					'created: ' + created +
					'</li>');
			}
		},
		error : function (result) {
			console.log('error');
			console.log(result);
		}
	});
};

RT.populatePage = function () {
	$('#terms').html(RT.terms); 
	$('#subreddit').html(RT.subreddit);
	RT.getPosts('hot', 30);
	RT.getPosts('new', 30);
	RT.getPosts('comments', 30);
};

$('.input').keypress(function (e) {
	if (e.which == 13) {
		if ($('#search-input').val()) {
			RT.terms = encodeURIComponent($('#search-input').val());
		} else {
			RT.terms = encodeURIComponent('zena rocks');
		}

		if ($('#subreddit-input').val()) {
			RT.subreddit = encodeURIComponent($('#subreddit-input').val());
		} else {
			RT.subreddit = encodeURIComponent('all');
		}
		$('#terms').html(decodeURIComponent(RT.terms)); 
		$('#subreddit').html(decodeURIComponent(RT.subreddit));
		RT.getPosts('hot', 30);
		RT.getPosts('new', 30);
		RT.getPosts('comments', 30);
	}
});

RT.populatePage();