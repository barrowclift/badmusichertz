window.onload = function() {
	// forEach method, could be shipped as part of an Object Literal/Module
	var forEach = function (array, callback, scope) {
		for (var i = 0; i < array.length; i++) {
			callback.call(scope, i, array[i]); // passes back stuff we need
		}
	};

	// Usage:
	// optionally change the scope as final parameter too, like ECMA5
	var imagePlaceholders = document.querySelectorAll('.placeholder')
	forEach(imagePlaceholders, function (index, value) {
		tinyImage = value.querySelector('.img-small')

		// 1: load small image and show it
		var img = new Image();
		img.src = tinyImage.src;
		img.onload = function () {
		 tinyImage.classList.add('loaded');
		};
		
		// // 2: load large image
		var imgLarge = new Image();
		imgLarge.src = imagePlaceholders[index].dataset.large; 
		imgLarge.onload = function () {
			imgLarge.classList.add('loaded');
		};
		imagePlaceholders[index].appendChild(imgLarge);
	});
}