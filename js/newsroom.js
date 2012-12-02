var Browser = {
  Version: function() {
    var version = 999; // we assume a sane browser
    if (navigator.appVersion.indexOf("MSIE") != -1)
      // bah, IE again, lets downgrade version number
      version = parseFloat(navigator.appVersion.split("MSIE")[1]);
    return version;
  }
}

var nr = {

	init: function(){
		nr.windowH = $(window).height();
		nr.windowW = $(window).width();
		nr.sliderWidth = $('.slideshow .slides').outerWidth();
		nr.sliderHeight = $('.slideshow .slides').height();
		nr.slideshowHeight = $(window).height() - 180;
		
		if (Browser.Version() == 8){
			$('body').addClass('ie8');
		}

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
					//nr.image.css({'width' : nr.sliderWidth + 'px'});
					nr.imgCollectionLength = nr.img.length;
					/*$('.slideshow .slides .slide img').each(function(index, value){
						console.log($(this).height());
						if($(this).height()!= 0 && $(this).height() < nr.sliderHeight){
							$(this).css({'margin-top' : (nr.sliderHeight - $(this).height())/2 + 'px'});
						}
							
						
					});*/
					
					$('.slides #cover').fadeOut(800);
				},

	hideImg : function(){
					$('.slideshow .slides .slide:not(:first)').hide();
				},

	nextSlide : function(){
					var next = $('.slides .slide:first');
					
					//nr.titleDisplay.empty().html(next.data('display'));

					next.fadeOut(300, function(){
						$(this).next().fadeIn();
						nr.setSlideTitle($(this).next().find('img').attr('alt'));
						nr.setDisplayTitle($(this).next().data('display'));
						$('.slides .slide:last').after($(this));
						
						//$(this).fadeOut();
					})
					
				},
	prevSlide : function(){
					//var cont = $('.slides .slide:last').css({'width' : '0px'});
					//$('.slides').prepend(cont);
					//nr.setImages();
					var prev = $('.slides .slide:first');
					var last = $('.slides .slide:last');
					
					
					/*prev.animate({'width' : '100%'}, {
						duration: nr.easingDuration,
						easing : nr.easingEffect,
						complete: function(){
							
						}
					})*/

					prev.fadeOut(300, function(){
						prev.before(last);
						nr.setSlideTitle($('.slides .slide:first').find('img').attr('alt'));
						nr.setDisplayTitle($('.slides .slide:first').data('display'));
						$('.slides .slide:first').fadeIn();
						
					});
					
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
					nr.setImages();
				}
};

$(document).ready(function(){

	nr.init();
	
	$('.slideshow .slides').prepend('<div id="cover"></div>');
	nr.hideImg();

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


$('.slides #cover').fadeOut(800);
	/*$.when(function(){
		nr.imgHeight = $('.slide:first img').height();
	}).done(function(){
		//nr.setOnLoad();
		
		nr.setImages();
		$('.slides #cover').fadeOut(800, function(){
			$(this).remove();
			
		});
	})*/
});