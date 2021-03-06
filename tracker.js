var RT = {};

RT.parseQuery = function () {
	var query = window.location.search.substring(1);
	var vars = query.split('&');
	var values = [];
	var response = {};

	var i = 0;
	for (i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		values.push(pair[1]);
	}
	response.q = values[0];
	response.subreddit = values[1];

	return response;
};

RT.getPosts = function (sort, limit) {
	var query = this.parseQuery();
	var subreddit = 'none';
	var terms = 'none';

	if (query.subreddit) {
		subreddit = query.subreddit;
	}

	if (query.q) {
		terms = query.q;
	}

	$.ajax({
		url : 'http://www.reddit.com/r/' + subreddit + '/search.json?q=' + terms + '&sort=' + sort + '&limit=' + limit,
		success : function (result) {
			var data = result.data.children;
			console.log(data);
			var comments = '';
			$('#' + sort).html('');
			var i = 0;
			for (i = 0; i < data.length; i++) {
				created = new Date(data[i].data.created);
				$('#' + sort).append('<li>' +
					'<a href="http://www.reddit.com' + data[i].data.permalink + '">' +
					data[i].data.title +
					'</a><br>' +
					'r/' + data[i].data.subreddit + '<br>' +
					'comments: ' + data[i].data.num_comments  + '<br>' +
					'upvotes: ' + data[i].data.ups + ', downvotes: ' + data[i].data.downs +
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
	var query = this.parseQuery();
	$('#terms').html(decodeURIComponent(query.q)); 
	$('#subreddit').html(decodeURIComponent(query.subreddit));

	if (query.q) {
		$('#search-input').val(decodeURIComponent(query.q));
	}
	if (query.subreddit) {
		$('#subreddit-input').val(decodeURIComponent(query.subreddit));
	}

	RT.getPosts('hot', 10);
	RT.getPosts('new', 10);
	RT.getPosts('controversial', 10);
	RT.getPosts('comments', 10);
};

$('.input').keypress(function (e) {
	var q = '';
	var subreddit = '';

	if (e.which == 13) {
		if ($('#search-input').val()) {
			q = encodeURIComponent($('#search-input').val());
		} else {
			q = encodeURIComponent('zena rocks');
		}

		if ($('#subreddit-input').val()) {
			subreddit = encodeURIComponent($('#subreddit-input').val());
		} else {
			subreddit = encodeURIComponent('all');
		}

		window.location.search = 'q=' + q + '&subreddit=' + subreddit;

		RT.getPosts('hot', 30);
		RT.getPosts('new', 30);
		RT.getPosts('comments', 30);
	}
});

window.onload = setupRefresh;

function setupRefresh() {
  setTimeout("refreshPage();", 10000);
}
function refreshPage() {
   window.location = location.href;
}

RT.populatePage();