var isMouseOver = new Array();
var images = new Array();
var subDir;

init();

function displayAsBookmarks() {
	displayImages(1);
}

function loadContactSheet() {
	displayImages(3);
}

function displayImages(numCols) {
	var imagesTable = document.getElementById('images');
	var imagesTableHtml = '';

	for (var i = 0; i < images.length; i++) {
		var image = images[i];
		if (i % numCols == 0) {
			if (i > 0) {
				imagesTableHtml += '</tr>';
			}
			imagesTableHtml += '<tr>';
		}
		imagesTableHtml += '<td>';
		imagesTableHtml += '<img src="images/' + subDir + '/filled/' + image + '"/><br/>\n';
		imagesTableHtml += '<div class="doodlesLink"><a href="https://fofolabs.com/doodles">fofolabs.com/doodles</a></div>';
		imagesTableHtml += '</td>';
	}
	imagesTableHtml += '</tr>';

	imagesTable.innerHTML = imagesTableHtml;
}

function load() {
	var imagesDiv = document.getElementById('images');
	var imagesDivHtml = '';
	for (var i = 0; i < images.length; i++) {
		var image = images[i];
		imagesDivHtml += '<div class="imageDiv"><img id="image' + i + '" ';
		if (isMouseOver.length > i && isMouseOver[i]) {
			imagesDivHtml += 'onMouseOver="mouseOverImage(this);" onMouseOut="mouseOutImage(this);" ';
		}
		imagesDivHtml += 'src="images/' + subDir + '/filled/' + image + '"/>\n';
		imagesDivHtml += '<div class="orderLink"><a href="mailto:mad7@runbox.com?subject=Order: ' + image
			+ '&body=I would like to order this print, please.">Click here to order a print of this image.</a></div>';
		imagesDivHtml += '</div>\n';
	}

	imagesDiv.innerHTML = imagesDivHtml;

	if (isMouseOver.length > 0) {
		var preloadCount = 0;
		var preloadedCount = 0;
		for (var i = 0; i < images.length; i++) {
			if (isMouseOver.length > i && isMouseOver[i]) {
				preloadCount++;
				var img = new Image();
				img.src = 'images/' + subDir + '/original/' + images[i];
				img.onload = function () {
					preloadedCount++;
					if (preloadedCount == preloadCount) {
						document.getElementById('loading').style.display = 'none';
					}
				};
			}
		}
	}
}

function mouseOverImage(el) {
	// $('#' + el.id).fadeOut();
	el.src = el.src.replace('/filled/', '/original/');
	// $('#' + el.id).fadeIn();
}

function mouseOutImage(el) {
	// $('#' + el.id).fadeOut();
	el.src = el.src.replace('/original/', '/filled/');
	// $('#' + el.id).fadeIn();
}
