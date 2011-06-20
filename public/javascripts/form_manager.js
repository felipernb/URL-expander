var url = document.getElementById('url');
url.onfocus = function() {
	this.style.color = "#888";
};
url.onkeypress = url.onfocus;
url.onblur = function() {
	this.style.color = "#CCC";
};

var form = document.getElementById('queryForm');

form.onsubmit = function() {
	if (!url.value.match(/^[:\/a-zA-Z0-9]+[.][a-zA-Z0-9.\/?&:_-]+$/)) {
		url.style.color = "#F00";
		return false;
	}
};
