var url = document.getElementById('url');
var originalValue = "type the short url";
url.value=originalValue;
url.onfocus = function() {
					this.style.color = "#888";
					if(this.value == originalValue) this.value = "";
			};
url.onkeypress = url.onfocus;
url.onblur = function() {
				this.style.color = "#CCC";
				if(!this.value) this.value = originalValue;
			};

var form = document.getElementById('queryForm');

form.onsubmit = function() {
	if (!url.value.match(/^[a-zA-Z0-9]+[.][a-zA-Z0-9.\/?&:_-]+$/)) {
		url.style.color = "#F00";
		return false;
	}
};
