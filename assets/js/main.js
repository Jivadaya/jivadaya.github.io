(function($) {

	"use strict";


	$(window).stellar({
    responsive: true,
    parallaxBackgrounds: true,
    parallaxElements: true,
    horizontalScrolling: false,
    hideDistantElements: false,
    scrollProperty: 'scroll'
  });


	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	// loader
	var loader = function() {
		setTimeout(function() { 
			if($('#ftco-loader').length > 0) {
				$('#ftco-loader').removeClass('show');
			}
		}, 1);
	};
	loader();

  var carousel = function() {
  	$('.home-slider').owlCarousel({
	    loop:true,
	    autoplay: true,
	    margin:0,
	    animateOut: 'fadeOut',
	    animateIn: 'fadeIn',
	    nav:true,
	    dots: true,
	    autoplayHoverPause: false,
	    items: 1,
	    navText : ["<span class='ion-ios-arrow-back'></span>","<span class='ion-ios-arrow-forward'></span>"],
	    responsive:{
	      0:{
	        items:1
	      },
	      600:{
	        items:1
	      },
	      1000:{
	        items:1
	      }
	    }
		});
		$('.carousel-testimony').owlCarousel({
			center: true,
			loop: true,
			items:1,
			margin: 30,
			stagePadding: 0,
			nav: false,
			navText: ['<span class="ion-ios-arrow-back">', '<span class="ion-ios-arrow-forward">'],
			responsive:{
				0:{
					items: 1
				},
				600:{
					items: 2
				},
				1000:{
					items: 3
				}
			}
		});

	};
	carousel();

	$('nav .dropdown').hover(function(){
		var $this = $(this);
		// 	 timer;
		// clearTimeout(timer);
		$this.addClass('show');
		$this.find('> a').attr('aria-expanded', true);
		// $this.find('.dropdown-menu').addClass('animated-fast fadeInUp show');
		$this.find('.dropdown-menu').addClass('show');
	}, function(){
		var $this = $(this);
			// timer;
		// timer = setTimeout(function(){
			$this.removeClass('show');
			$this.find('> a').attr('aria-expanded', false);
			// $this.find('.dropdown-menu').removeClass('animated-fast fadeInUp show');
			$this.find('.dropdown-menu').removeClass('show');
		// }, 100);
	});


	$('#dropdown04').on('show.bs.dropdown', function () {
	  console.log('show');
	});

	// magnific popup
	$('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
     gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300 // don't foget to change the duration also in CSS
    }
  });

  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false
  });


  var counter = function() {
		
		$('#section-counter, .ftco-appointment').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {

				var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
				$('.number').each(function(){
					var $this = $(this),
						num = $this.data('number');
						console.log(num);
					$this.animateNumber(
					  {
					    number: num,
					    numberStep: comma_separator_number_step
					  }, 7000
					);
				});
				
			}

		} , { offset: '95%' } );

	}
	counter();

	var contentWayPoint = function() {
		var i = 0;
		$('.ftco-animate').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .ftco-animate.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn ftco-animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft ftco-animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight ftco-animated');
							} else {
								el.addClass('fadeInUp ftco-animated');
							}
							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '95%' } );
	};
	contentWayPoint();

	$('.appointment_date').datepicker({
	  'format': 'm/d/yyyy',
	  'autoclose': true
	});

	$('.appointment_time').timepicker();
})(jQuery);

$(document).ready(function() {
	let referrer = window.location.pathname.split('/').at(-1);
	if (referrer == "") {
		referrer = "N156473" // default jivadaya referrer id;
	}
	console.log("Referrer: ", referrer);
	$("#referrer").val(referrer);
	document.getElementById('referred_by').innerText = referrer;

	// Gets the video src from the data-src on each button
	var $videoSrc;
	$('.video-btn').click(function() {
		$videoSrc = $(this).data( "src" );
		console.log("VideoSrc:", $videoSrc);
	});

	// when the modal is opened autoplay it
	$('#myModal').on('shown.bs.modal', function (e) {
		// set the video src to autoplay and not to show related video. Youtube related video is like a box of chocolates... you never know what you're gonna get
		$("#video").attr('src',$videoSrc + "?autoplay=0&amp;modestbranding=1&amp;showinfo=0");
	})

	// stop playing the youtube video when I close the modal
	$('#myModal').on('hide.bs.modal', function (e) {
		// a poor man's stop video
		$("#video").attr('src',$videoSrc);
	})
});

let schemes = ["shastra-daan", "sb", "monk", "vec"];

function resetAll() {
	for (let scheme of schemes) {
		$('#' + scheme + '-intro').css('display', 'block');
		$('#' + scheme + '-choose').css('display', 'none');
	}
}

$(".donate-option-btn").click(function() {
	let element_id=this.id;
	resetAll();

	$('#' + element_id + '-intro').css('display', 'none');
	$('#' + element_id + '-choose').css('display', 'block');
})

const shastraDaanDonateButton = document.getElementById("shastra-daan-donate-btn");

document.querySelectorAll('input[name="shastra-daan-gita-option"]').forEach((radio) => {
	radio.addEventListener('change', () => {
		const amount = radio.value;
		shastraDaanDonateButton.textContent = `Donate ₹ ${amount}`;
		shastraDaanDonateButton.disabled = false; // Enable button when a radio option is selected
		// numberInput.value = ''; // Clear number input if a radio option is selected
	});
});

$("#shastra-daan-donate-btn").click(function () {
	const selectedOption = document.querySelector('input[name="shastra-daan-gita-option"]:checked');
	let amount = 0;

	// Determine amount based on selection or input
	if (selectedOption) {
		amount = selectedOption.value; // Use selected radio button value
		console.log(amount);
		$('#amount').val(amount);
	}
	document.getElementById("donation-form").scrollIntoView();
})

const sbDonateButton = document.getElementById("sb-donate-btn");

document.querySelectorAll('input[name="sb-gita-option"]').forEach((radio) => {
	radio.addEventListener('change', () => {
		const amount = radio.value;
		sbDonateButton.textContent = `Donate ₹ ${amount}`;
		sbDonateButton.disabled = false; // Enable button when a radio option is selected
		// numberInput.value = ''; // Clear number input if a radio option is selected
	});
});

$("#sb-donate-btn").click(function () {
	const selectedOption = document.querySelector('input[name="sb-gita-option"]:checked');
	let amount = 0;

	// Determine amount based on selection or input
	if (selectedOption) {
		amount = selectedOption.value; // Use selected radio button value
		console.log(amount);
		$('#amount').val(amount);
	}
	document.getElementById("donation-form").scrollIntoView();
})

const monkDonateButton = document.getElementById("monk-donate-btn");

document.querySelectorAll('input[name="monk-gita-option"]').forEach((radio) => {
	radio.addEventListener('change', () => {
		const amount = radio.value;
		monkDonateButton.textContent = `Donate ₹ ${amount}`;
		monkDonateButton.disabled = false; // Enable button when a radio option is selected
		// numberInput.value = ''; // Clear number input if a radio option is selected
	});
});

$("#monk-donate-btn").click(function () {
	const selectedOption = document.querySelector('input[name="monk-gita-option"]:checked');
	let amount = 0;

	// Determine amount based on selection or input
	if (selectedOption) {
		amount = selectedOption.value; // Use selected radio button value
		console.log(amount);
		$('#amount').val(amount);
	}
	document.getElementById("donation-form").scrollIntoView();
})

const vecDonateButton = document.getElementById("vec-donate-btn");

document.querySelectorAll('input[name="vec-gita-option"]').forEach((radio) => {
	radio.addEventListener('change', () => {
		const amount = radio.value;
		vecDonateButton.textContent = `Donate ₹ ${amount}`;
		vecDonateButton.disabled = false; // Enable button when a radio option is selected
		// numberInput.value = ''; // Clear number input if a radio option is selected
	});
});

$("#vec-donate-btn").click(function () {
	const selectedOption = document.querySelector('input[name="vec-gita-option"]:checked');
	let amount = 0;

	// Determine amount based on selection or input
	if (selectedOption) {
		amount = selectedOption.value; // Use selected radio button value
		console.log(amount);
		$('#amount').val(amount);
	}
	document.getElementById("donation-form").scrollIntoView();
})

function show80GFields() {
	var checkbox = document.getElementById("80g_checkbox");
	var fields = document.getElementById("conditionalFields");
	if (checkbox.checked) {
		fields.style.display = "block";
		document.getElementById("pan").required = true;
		document.getElementById("address").required = true;
		document.getElementById("city").required = true;
		document.getElementById("state").required = true;
		document.getElementById("zipcode").required = true;
	} else {
		fields.style.display = "none";
		document.getElementById("pan").required = false;
		document.getElementById("address").required = false;
		document.getElementById("city").required = false;
		document.getElementById("state").required = false;
		document.getElementById("zipcode").required = false;
	}
}
