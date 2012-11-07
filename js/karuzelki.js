kp = {

	init: function(){
		kp.carousel = $('.overview');
		kp.containerWidth = $('#carousel').outerWidth();
		
		kp.scrollableWidth = ($('.overview .item').outerWidth())*2 + $('.overview .description').outerWidth();

		if(kp.containerWidth < kp.scrollableWidth){
			kp.hiddenDiff = parseInt((kp.scrollableWidth - kp.containerWidth)/2);
			kp.correction = (kp.hiddenDiff*2) - $('.overview .item').outerWidth();
		}
		kp.carousel.css({'left' : -kp.hiddenDiff + 'px'});
	},

	containerWidth : 0,

	scrollableWidth: 0,

	hiddenDiff : 0,

	carousel : null,

	index : 0,

	sliderState: 0,

	correction : 0,

	clockSize: 28,

	currentPercent : 0,

	carouselTimeout : 75,

	slideshowInterval : null,

	clockContext : null,

	timerEl : null,


	setTimer : function(){
		if(Modernizr.canvas){
			kp.timerEl = $('<canvas id="clockTimer" width="' + kp.clockSize + '" height="' + kp.clockSize + '" />'); 
			$('#carousel #playpause').append(kp.timerEl);
			kp.clockContext = kp.timerEl[0].getContext('2d');
	        kp.clockContext.lineWidth = 2;
	        kp.clockContext.lineCap = 'square';
    	}
	},

	hangSlideshow : function() {
			if(Modernizr.canvas){
                kp.clockContext.clearRect(0, 0, kp.clockSize, kp.clockSize);
            }
            if (typeof kp.slideshowInterval !== 'undefined') {
                clearInterval(kp.slideshowInterval);
            }
            //$('#wnext').removeClass('timer');
        },

    startSlideshow : function() {
        kp.hangSlideshow();
        //$('#wnext').addClass('timer');
        kp.currentPercent = 0;
        kp.slideshowInterval = setInterval(function() {
            if (++kp.currentPercent > 100) {
                kp.nextSlide();
                kp.hangSlideshow();
                kp.startSlideshow();
            }
            if(Modernizr.canvas){
                kp.clockContext.clearRect(0, 0, kp.clockSize, kp.clockSize);
                
                kp.clockContext.beginPath();
                kp.clockContext.strokeStyle = '#c9825d';
                kp.clockContext.arc(
                	kp.clockSize / 2, 
                	kp.clockSize / 2, 
                	(kp.clockSize / 2) - (kp.clockSize / 10), 
                	(Math.PI * 2 * (((kp.currentPercent / 100) * 780) / 780)) - (Math.PI / 2), 
                	-Math.PI / 2, 
                	true
            	);
                kp.clockContext.stroke();
                kp.clockContext.closePath();

                kp.clockContext.beginPath();
                kp.clockContext.strokeStyle = '#58514e';
                kp.clockContext.arc(
                	kp.clockSize / 2, 
                	kp.clockSize / 2, 
                	(kp.clockSize / 2) - (kp.clockSize / 10), 
                	-Math.PI / 2, 
                	(Math.PI * 2 * (((kp.currentPercent / 100) * 780) / 780)) - (Math.PI / 2), 
                	true
            	);
                kp.clockContext.stroke();
                kp.clockContext.closePath();
            }
        }, kp.carouselTimeout);
    },

    nextSlide : function(){
    	kp.carousel.animate({'left' : -(kp.containerWidth + kp.correction + kp.hiddenDiff) + 'px'}, {
			duration: 1000,
			easing: 'easeInOutExpo',
			complete: function(){
				$('.overview li:last').after($('.overview li:first'));
				$('.overview li:last').after($('.overview li:first'));
				kp.carousel.css({'left' : -kp.hiddenDiff + 'px'});
				} 
		});
    }
};

$(document).ready(function(){

	kp.init();
	kp.setTimer();
	kp.startSlideshow();

	$('#carousel #playpause').bind('click', function(e){
		e.preventDefault();
		if(kp.sliderState == 1){
			$(this).removeClass('pokaz').html('Zatrzymaj');
			$(this).append(kp.timerEl);
			kp.startSlideshow();
			kp.sliderState = 0;
		}else{
			$(this).addClass('pokaz').html('Pokaz slajdów');
			kp.hangSlideshow();
			kp.sliderState = 1;
		}
		
	});

});

$(window).resize(function(){
	kp.init();
});