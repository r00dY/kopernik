var nr = {

	init: function(){
		nr.windowH = $(window).height();
		nr.windowW = $(window).width();
		nr.sliderWidth = $('.slideshow .slides').outerWidth();
		nr.sliderHeight = $('.slideshow .slides').height();
		nr.slideshowHeight = $(window).height() - 180;
		
		
		nr.setImages();

		nr.titleHolder = $('.title span');
		var next = $('.slides .slide:first');
		nr.setSlideTitle(next.find('img').attr('alt'));
		//alert($('.slideshow .slide').length);
		nr.titleDisplay = $('.title-display span');
		nr.titleDisplay.empty().html($('.slides .slide:first').data('display'));
		
	},

	setSlideTitle : function(desc){
						nr.titleHolder.fadeOut(500, function(){
							nr.titleHolder.html(desc);
							nr.titleHolder.fadeIn(500);
						});
						
					},

	setDisplayTitle : function(desc){
						nr.titleDisplay.fadeOut(500, function(){
							nr.titleDisplay.html(desc);
							nr.titleDisplay.fadeIn(500);
						});
					},
	setImages : function(){
					nr.image = $('.slideshow .slides img');
					nr.img = $('.slideshow .slides .slide');
					nr.image.css({'width' : nr.sliderWidth + 'px'});
					nr.imgCollectionLength = nr.img.length;
					$.each(nr.img, function(index, value){
							$(this).css({'z-index' : nr.imgCollectionLength - index});
						
					});
				},

	nextSlide : function(){
					var next = $('.slides .slide:first');
					nr.setSlideTitle(next.next().find('img').attr('alt'));
					nr.setDisplayTitle(next.next().data('display'));
					//nr.titleDisplay.empty().html(next.data('display'));
					next.animate({'width' : '0px'}, {
						duration: nr.easingDuration,
						easing : nr.easingEffect,
						complete : function(){
							$('.slides').append($(this));
							$(this).css({'width' : '100%'});
							nr.setImages();
						}
					})
					
				},
	prevSlide : function(){
					var cont = $('.slides .slide:last').css({'width' : '0px'});
					$('.slides').prepend(cont);
					nr.setImages();
					var prev = $('.slides .slide:first');
					
					nr.setSlideTitle(prev.find('img').attr('alt'));
					nr.setDisplayTitle(prev.data('display'));
					prev.animate({'width' : '100%'}, {
						duration: nr.easingDuration,
						easing : nr.easingEffect,
						complete: function(){
							nr.titleDisplay.empty().html($(this).data('display'));
						}
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

	titleDisplay: null,

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
					nr.imgHeight = $('.slides img:first').outerHeight();

					$('.slides img').each(function(){
						var h = $(this).outerHeight();
						if(h>nr.sliderHeight){
							$(this).css({'top' : -((h-nr.sliderHeight)/2) + 'px'});
						}else{
							$(this).css({'height' : '100%', 'width' : 'auto'});
							var w = $(this).width();
							$(this).css({'left' : -((w-nr.sliderWidth)/2) + 'px'});
						}
					});
						nr.hiddenDiff = (nr.imgHeight - nr.slideshowHeight)/2; 
						//$('.slides img').css({'top' : -nr.hiddenDiff + 'px'});
						nr.leftMargin = 0;
					nr.setImages();
				}
};

$(document).ready(function(){

	nr.init();
	$('.slideshow .slides').prepend('<div id="cover"></div>');
	/*var slides = $('.slides');
	for(var i=0; i< nr.imgSet.length; i++){
			var slide = $('<div class="slide" alt="'+ nr.imgAlt[i] +'"></div>').css({'background-image' : 'url(img/'+nr.imgSet[i] +'.jpg)'});
			slides.append(slide);
		}*/
	

	$('a.prevslide').bind('click', function(e){
		e.preventDefault();
		nr.prevSlide();
	});

	$('a.nextslide').bind('click', function(e){
		e.preventDefault();
		nr.nextSlide();
	});
	


});

$(window).resize(function(){
	nr.init();
	nr.setOnLoad();
});

$(window).load(function(){
	$.when(function(){
		nr.imgHeight = $('.slide:first img').height();
	}).done(function(){
		//nr.setOnLoad();
		$('.slides #cover').fadeOut(800, function(){
			$(this).remove();
		});
	})
});