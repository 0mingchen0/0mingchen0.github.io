/*
	Spectral by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {

	var $window = $(window),
		$body = $('body'),
		$wrapper = $('#page-wrapper'),
		$banner = $('#banner'),
		$header = $('#header');

	// Breakpoints.
	breakpoints({
		xlarge: ['1281px', '1680px'],
		large: ['981px', '1280px'],
		medium: ['737px', '980px'],
		small: ['481px', '736px'],
		xsmall: [null, '480px']
	});

	// Play initial animations on page load.
	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Mobile?
	if (browser.mobile)
		$body.addClass('is-mobile');
	else {

		breakpoints.on('>medium', function () {
			$body.removeClass('is-mobile');
		});

		breakpoints.on('<=medium', function () {
			$body.addClass('is-mobile');
		});

	}

	// Scrolly.
	$('.scrolly')
		.scrolly({
			speed: 1500,
			offset: $header.outerHeight()
		});

	// Menu.
	$('#menu')
		.append('<a href="#menu" class="close"></a>')
		.appendTo($body)
		.panel({
			delay: 500,
			hideOnClick: true,
			hideOnSwipe: true,
			resetScroll: true,
			resetForms: true,
			side: 'right',
			target: $body,
			visibleClass: 'is-menu-visible'
		});

	// Header.
	if ($banner.length > 0
		&& $header.hasClass('alt')) {

		$window.on('resize', function () { $window.trigger('scroll'); });

		$banner.scrollex({
			bottom: $header.outerHeight() + 1,
			terminate: function () { $header.removeClass('alt'); },
			enter: function () { $header.addClass('alt'); },
			leave: function () { $header.removeClass('alt'); }
		});

	}

	// Theme change function
	function changeTheme(theme) {
		const root = document.documentElement;
		const images = document.querySelectorAll('#two .image img');


		switch (theme) {
			case 'Red':
				root.style.setProperty('--background-color', 'maroon');
				root.style.setProperty('--second-color', '#340414');
				root.style.setProperty('--menu-color', '#873032');
				images.forEach(img => img.classList.remove('purple-filter'));
				break;
			case 'Purple':
				root.style.setProperty('--background-color', '#663399');
				root.style.setProperty('--second-color', '#371b4f');
				root.style.setProperty('--menu-color', '#645394');
				images.forEach(img => img.classList.add('purple-filter'));
				break;
			default:
				root.style.setProperty('--background-color', '');
				images.forEach(img => img.classList.remove('purple-filter'));
				break;
		}
	}

	// Make changeTheme function globally accessible
	window.changeTheme = changeTheme;

	// Function to create stars
	function createStars() {
		const starsContainer = document.querySelector('.stars');
		const starCount = 100; // Number of stars

		for (let i = 0; i < starCount; i++) {
			const star = document.createElement('div');
			star.classList.add('star');
			star.style.top = `${Math.random() * 100}vh`;
			star.style.left = `${Math.random() * 100}vw`;
			star.style.animationDuration = `${Math.random() * 2 + 1}s`;
			starsContainer.appendChild(star);
		}
	}

	// Call the function to create stars on DOMContentLoaded
	document.addEventListener("DOMContentLoaded", createStars)


	// background parallax effect for moon
	document.addEventListener("scroll", function () {
		let scrollPosition = window.scrollY;
		let moon = document.querySelector(".background");
		moon.style.transform = `translate(-50%, calc(-50% + ${scrollPosition * 0.05}px))`;
	});


})(jQuery);