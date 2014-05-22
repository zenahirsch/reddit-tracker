var terms = 'vimeo';
var subreddit = 'all';

$('#terms').html(terms);

$.ajax({
	url : 'http://www.reddit.com/r/' + subreddit + '/search.json?q=' + terms + '&sort=hot&limit=30',
	success : function (result) {
		var data = result.data.children;
		var created = '';
		console.log(data);
		var i = 0;
		for (i = 0; i < data.length; i++) {
			created = new Date(data[i].data.created);
			$('#hot').append('<li>' +
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

$.ajax({
	url : 'http://www.reddit.com/r/' + subreddit + '/search.json?q=' + terms + '&sort=new&limit=30',
	success : function (result) {
		var data = result.data.children;
		var created = '';
		console.log(data);
		for (i = 0; i < data.length; i++) {
			created = new Date(data[i].data.created);
			$('#new').append('<li>' +
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

$.ajax({
	url : 'http://www.reddit.com/r/' + subreddit + '/search.json?q=' + terms + '&sort=comments&limit=30',
	success : function (result) {
		var data = result.data.children;
		var created = '';
		console.log(data);
		for (i = 0; i < data.length; i++) {
			created = new Date(data[i].data.created);
			$('#comments').append('<li>' +
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