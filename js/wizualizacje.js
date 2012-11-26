/*var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};*/

var kp = {

	init: function(){
		kp.windowH = $(window).height();
		kp.windowW = $(window).width();
		kp.sliderWidth = $('.slideshow .slides').outerWidth();
		kp.sliderHeight = $('.slideshow .slides').height();
		kp.slideshowHeight = $(window).height() - 180;
		
		$('.slideshow').css({'height' : kp.slideshowHeight + 'px'});
		
		kp.setImages();

		kp.titleHolder = $('.slideshow .title span');
		var next = $('.slides .slide:first');
		kp.setSlideTitle(next.find('img').attr('alt'));
		
		
	},

	setSlideTitle : function(desc){
						kp.titleHolder.fadeOut(500, function(){
							kp.titleHolder.html(desc);
							kp.titleHolder.fadeIn(500);
						});
						
					},
	setImages : function(){
					kp.image = $('.slideshow .slides img');
					kp.img = $('.slideshow .slides .slide');
					kp.image.css({'width' : kp.sliderWidth + 'px'});
					kp.imgCollectionLength = kp.img.length;
					$.each(kp.img, function(index, value){
							$(this).css({'z-index' : kp.imgCollectionLength - index});
						
					});
				},

	nextSlide : function(){
					var next = $('.slides .slide:first');
					kp.setSlideTitle(next.next().find('img').attr('alt'));

					next.animate({'width' : '0px'}, {
						duration: kp.easingDuration,
						easing : kp.easingEffect,
						complete : function(){
							$('.slides').append($(this));
							$(this).css({'width' : '100%'});
							kp.setImages();
						}
					})
					
				},
	prevSlide : function(){
					var cont = $('.slides .slide:last').css({'width' : '0px'});
					$('.slides').prepend(cont);
					kp.setImages();
					var prev = $('.slides .slide:first');
					kp.setSlideTitle(prev.find('img').attr('alt'));
					prev.animate({'width' : '100%'}, {
						duration: kp.easingDuration,
						easing : kp.easingEffect
					})
					
				},

	titleHolder : null,

	easingDuration : 800,

	easingEffect : 'easeInOutExpo',

	windowHeight : 0,

	slideshowHeight : 0,

	img : null,

	image : null,

	leftMargin : 0,

	imgCollectionLength : 0,

	hiddenDiff : 0,

	imgHeight : 0,

	windowH : 0,

	windowW : 0,

	sliderWidth : null,

	clockSize: 28,

	currentPercent : 0,

	carouselTimeout : 75,

	slideshowInterval : null,

	clockContext : null,

	timerEl : null,

	imgSet : [	'wizualizacja01', 
				'wizualizacja02', 
				'wizualizacja03', 
				'wizualizacja04', 
				'wizualizacja05', 
				'wizualizacja06', 
				'wizualizacja07', 
				'wizualizacja08'],

	imgAlt : [	'wizualizacja01', 
				'wizualizacja02', 
				'wizualizacja03', 
				'wizualizacja04', 
				'wizualizacja05', 
				'wizualizacja06', 
				'wizualizacja07', 
				'wizualizacja08'],

	setOnLoad : function(){
					kp.imgHeight = $('.slides img:first').outerHeight();

						kp.hiddenDiff = (kp.imgHeight - kp.slideshowHeight)/2; 
						$('.slides img').css({'top' : -kp.hiddenDiff + 'px'});
						kp.leftMargin = 0;
					kp.setImages();

					if(kp.windowH < kp.windowW){
						$('.slideshow').unbind('mousemove').bind('mousemove', function(e) {
							
								var diff = kp.hiddenDiff*2;

					            var move = ((parseInt(e.pageY, 10) - kp.hiddenDiff) / kp.slideshowHeight) * diff;
					            if (move > diff) {
					                move = diff;
					            }
					            if (move < 0) {
					                move = 0;
					            }
					            kp.image.css('top', -move);   
				        });
					}
				},

	setTimer : function(){
		if(Modernizr.canvas){
			kp.timerEl = $('<canvas id="clockTimer" width="' + kp.clockSize + '" height="' + kp.clockSize + '" />'); 
			$('.slideshow #playpause').append(kp.timerEl);
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
        },

    startSlideshow : function() {
        kp.hangSlideshow();
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
    }
};

$(document).ready(function(){

	kp.init();
	$('.slides .slide:first img').imagesLoaded(function(){
		$.when(function(){
		kp.imgHeight = $('.slide:first img').height();
		if(windowH > windowW){
			$('.slideshow').css({'top' : ((windowH - 180 - kp.imgHeight)/2) + 'px'});
		}
		}).done(function(){
			kp.setTimer();
			kp.startSlideshow();
			kp.setOnLoad();
			$('.slides #cover').fadeOut(800, function(){
				$(this).remove();
			});
		});
	});
	$('.slideshow .slides').prepend('<div id="cover"></div>');
	/*var slides = $('.slides');
	for(var i=0; i< kp.imgSet.length; i++){
			var slide = $('<div class="slide" alt="'+ kp.imgAlt[i] +'"></div>').css({'background-image' : 'url(img/'+kp.imgSet[i] +'.jpg)'});
			slides.append(slide);
		}*/
	

	$('a.prevslide').bind('click', function(e){
		e.preventDefault();
		kp.prevSlide();
	});

	$('a.nextslide').bind('click', function(e){
		e.preventDefault();
		kp.nextSlide();
	});
	

	$('.slideshow #playpause').bind('click', function(e){
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
	kp.setOnLoad();
});

/*$(window).load(function(){
	$.when(function(){
		kp.imgHeight = $('.slide:first img').height();
		if(windowH > windowW){
			$('.slideshow').css({'top' : ((windowH - 180 - kp.imgHeight)/2) + 'px'});
		}
	}).done(function(){
		kp.setTimer();
		kp.startSlideshow();
		kp.setOnLoad();
		$('.slides #cover').fadeOut(800, function(){
			$(this).remove();
		});
	});
});*/