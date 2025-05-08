// Adjust font size
function setFontSize(size) {
    document.getElementById('text-block').style.fontSize = size;
}

// Change colour scheme
function changeColor(color) {
	const body = document.body;
	switch(color) {
		case 'light':
			body.style.backgroundColor = '#FFFFFF';
			document.getElementById('text-block').style.color = '#000000';
			document.getElementById('container').style.borderColor = '#000000';
			break;
		case 'dark':
			body.style.backgroundColor = '#1E1E1E';
			document.getElementById('text-block').style.color = '#FFFFFF';
			document.getElementById('container').style.borderColor = '#FFFFFF';
			break;
		case 'contrast':
			body.style.backgroundColor = '#FF0000';
			document.getElementById('text-block').style.color = '#FFFFFF';
			document.getElementById('container').style.borderColor = '#FFFFFF';
			break;
		case 'random':
			var color = getRandomColor();
			body.style.backgroundColor = color;
			document.getElementById('text-block').style.color = '#FFFFFF';
			document.getElementById('container').style.borderColor = '#FFFFFF';
			break;
	}

	window.scroll({
        top: 200,
        left: 0,
        behavior: 'smooth'
    });
	
}

function getRandomColor() {
	const letters = '0123456789ABCDEF';
	let color = '#';
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

// Open thumbnail
function displayImage(imgs) {
    var imageExpand = document.getElementById("image-expanded");
    var textBlock = document.getElementById("text-block");
    imageExpand.src = imgs.src;
    textBlock.innerHTML = imgs.alt;
    imageExpand.parentElement.style.display = "flex";

	window.scroll({
        top: 200,
        left: 0,
        behavior: 'smooth'
    });
}

