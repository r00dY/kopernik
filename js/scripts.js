/**
 * jQuery.browser.mobile (http://detectmobilebrowser.com/)
 * jQuery.browser.mobile will be true if the browser is a mobile device
 
 * Można wywalić do osobnego pliku...
 **/
(function(a){jQuery.browser.mobile=/android.+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);

/**
 * @author Alexander Farkas
 * v. 1.02
 *
 * Edited by Nelson Wells for jQuery 1.8 compatibility
 */
(function($) {
    $.extend($.fx.step,{
        backgroundPosition: function(fx) {
            if (fx.pos === 0 && typeof fx.end == 'string') {
                var start = $.css(fx.elem,'backgroundPosition');
                start = toArray(start);
                fx.start = [start[0],start[2]];
                var end = toArray(fx.end);
                fx.end = [end[0],end[2]];
                fx.unit = [end[1],end[3]];
            }
            var nowPosX = [];
            nowPosX[0] = ((fx.end[0] - fx.start[0]) * fx.pos) + fx.start[0] + fx.unit[0];
            nowPosX[1] = ((fx.end[1] - fx.start[1]) * fx.pos) + fx.start[1] + fx.unit[1];
            fx.elem.style.backgroundPosition = nowPosX[0]+' '+nowPosX[1];
 
           function toArray(strg){
               strg = strg.replace(/left|top/g,'0px');
               strg = strg.replace(/right|bottom/g,'100%');
               strg = strg.replace(/([0-9\.]+)(\s|\)|$)/g,"$1px$2");
               var res = strg.match(/(-?[0-9\.]+)(px|\%|em|pt)\s(-?[0-9\.]+)(px|\%|em|pt)/);
               return [parseFloat(res[1],10),res[2],parseFloat(res[3],10),res[4]];
           }
        }
    });
})(jQuery);

$("document").ready(function() {

	// STICKY NAVIGATION
	
    var sticky_navigation_offset_top = $('nav').offset().top;
     
    var sticky_navigation = function(){
        var scroll_top = $(window).scrollTop();
        if (scroll_top > sticky_navigation_offset_top) { 
            $('nav').css({ 'position': 'fixed', 'top':0, 'left':0 });
        } else {
            $('nav').css({ 'position': 'relative' }); 
        }   
    };
     
    if (!jQuery.browser.mobile) {
    
       sticky_navigation();
       
       $(window).scroll(function() {
            sticky_navigation();
       });
    }
    
    
    // FORCE SPAN AROUND EMAIL TEXT 
     
    $('.biuro .adres p:nth-child(2)').contents().filter(function(){return this.nodeType === 3}).wrap('<span />');
    	 

	// EQUAL COLUMNS
	
	var leftColumn = $(".content").find(".column").eq(0);
	var rightColumn = $(".content").find(".column").eq(1);	
	
	var leftHeight = leftColumn.outerHeight();
	var rightHeight = rightColumn.outerHeight();
	
	if (leftHeight > rightHeight) { 
		leftColumn.css({'border-right': '1px solid #212121'});
	} else { 
		rightColumn.css({'border-left': '1px solid #212121'});
	};

	// BLOGNAV HOVER ANIMATION
	
	$(".blognav a.blogprev").hover(function() {
		$(this).stop().animate({"left" : "-5px"}, 100);
	}, function() {
		$(this).stop().animate({"left" : "0"}, 100)
	});
	
	$(".blognav a.blognext").hover(function() {
		$(this).stop().animate({"right" : "-5px"}, 100);
	}, function() {
		$(this).stop().animate({"right" : "0"}, 100)
	});
	
	
	// READ MORE HOVER ANIMATION
	
	$(".news-feature a.more, .news-item .meta a.more").hover(function() {
		$(this).stop().animate({backgroundPosition: '100% 50%'}, 100);
	}, function() {
		$(this).stop().animate({backgroundPosition: '98% 50%'}, 300);
	});
	

	// NEWSROOM ITEM HEIGHT 
	
	$(".news-item").hover(function() {
		var meta = $(this).find(".meta");
		meta.find("div").fadeIn(200);
		meta.stop().animate({"height" : "195px"}, 500);
	}, function() {
		var meta = $(this).find(".meta");
		meta.stop().animate({"height" : "103px"}, 500);
		meta.find("div").fadeOut(200);
	});


	// OLSZTYN PICS SLIDESHOW
	
	/*$('#pics, #newspics').cycle({
		after: onAfter,
		prev: ".lokalizacja .slidenav a.prevslide",
		next: ".lokalizacja .slidenav a.nextslide", 
		timeout: 0,
		fx: "cover",
		easing: "easeInOutExpo"
	});*/
	
	function onAfter() { 
		var opis = $(this).data('opis')
	    $('.lokalizacja div.descr .sub.pics').html('<p>' + opis + '</p>'); 
	}
	
	$(".lokalizacja div.descr #togglemap").click(function() {
		$(".lokalizacja div.descr .tool").removeClass("current");
		$(this).addClass("current");	
		$(".lokalizacja div.descr .sub.pics,.lokalizacja div.descr .slidenav,.title,.lokalizacja #pics").fadeOut(500, function(){
			$(".lokalizacja #mapCont").fadeIn();
			$(".lokalizacja div.descr .sub.mapa").fadeIn();
		});
		return false;
	});

	$('.faded-title').fadeOut();
	
	$(".lokalizacja div.descr #togglepics").click(function() {
		
		$(".lokalizacja div.descr .tool").removeClass("current");
		$(this).addClass("current");
		
		
		$(".lokalizacja div.descr .sub.mapa,.lokalizacja #mapCont").fadeOut(500, function(){
			$('.slideshow .slides .slide').show();
			$('.slideshow .slides').prepend('<div id="cover"></div>');
			$(".lokalizacja div.descr .sub.pics").fadeIn();
			$(".lokalizacja div.descr .slidenav").fadeIn();
			$(".lokalizacja #pics").fadeIn();
			$('.title').fadeIn();
			nr.setImages();
			
		});
		

		return false;
	});
		
	// GOOGLE MAPS FADE IN
	
	$("#mapCont").delay(1000).animate({
	    opacity: 1
	  }, 1000);
	

	// UNDERLINES
	
	$('body').on('mouseenter', '#submit', function(e) {
	  return $(this).next('.underline').css({
	    left: '-100%'
	  }).stop().animate({
	    left: '0%'
	  }, 250, "easeOutExpo");
	});
	$('body').on('mouseleave', '#submit', function(e) {
	  return $(this).next('.underline').stop().animate({
	    left: '100%'
	  }, 250, "easeOutExpo");
	});
	
	$('body').on('mouseenter', 'a.szlaczek', function(e) {
	  return $(this).find('.underline').css({
	    left: '-100%'
	  }).stop().animate({
	    left: '0%'
	  }, 250, "easeOutExpo");
	});
	$('body').on('mouseleave', 'a.szlaczek', function(e) {
	  return $(this).find('.underline').stop().animate({
	    left: '100%'
	  }, 250, "easeOutExpo");
	});
	
	
	$('body').on('mouseenter', 'footer p.credits a', function(e) {
	  return $(this).find('.underline').css({
	    left: '-100%'
	  }).animate({
	    left: '0%'
	  }, 250, "easeOutExpo");
	});
	$('body').on('mouseleave', 'footer p.credits a', function(e) {
	  return $(this).find('.underline').animate({
	    left: '100%'
	  }, 250, "easeOutExpo");
	});
	
	
	// OPB LOGO TRANSITIONS

	var cssTransitions = false;
    (function() {
        var b = document.body || document.documentElement;
        var s = b.style;
        var p = 'transition';
        if (typeof s[p] == 'string') {
            cssTransitions = true;
            return;
        }
        v = ['Moz', 'Webkit', 'O', 'ms'],
        p = p.charAt(0).toUpperCase() + p.substr(1);
        for (var i = 0; i < v.length; i++) {
            if (typeof s[v[i] + p] == 'string') {
                cssTransitions = true;
                return;
            }
        }
    })();
    if (cssTransitions) {
        $('body').addClass('cssTransitions');
    }
    
    var $opb = $('<div id="opb2"></div>').css({opacity: 0});
    $('#opb').after($opb);
    if (!cssTransitions) {
        $('#opb').hover(function() {
            $(this).stop().animate({height: 89}, 333, 'easeOutExpo');
            $('#opb2').stop().animate({bottom: 25, opacity: 1}, 333, 'easeOutExpo');
        }, function() {
            $(this).stop().animate({height: 74}, 333, 'easeOutExpo');
            $('#opb2').stop().animate({bottom: 45, opacity: 0}, 333, 'easeOutExpo');
        });
    }
	
	
	// ROLLING NAVIGATION LINKS

	$('nav a.roll').hover(function() {
		$(this).stop().animate({ 'top' : '20px' }, 200);
	
	}, function() {
		$(this).stop().animate({ 'top' : '0' }, 200);
	});
	
	
	// PREV/NEXT PAGE ARROWS

	$('a.prevpage').hover(function() {
		$(this).stop().animate({backgroundPosition: '0 0'}, 300);
	}, function() {
		$(this).stop().animate({backgroundPosition: '3% 0'}, 300);
	});
	
	$('a.nextpage').hover(function() {
		$(this).stop().animate({backgroundPosition: '100% 0'}, 300);
	}, function() {
		$(this).stop().animate({backgroundPosition: '97% 0'}, 300);
	});
	
	
	// PREV/NEXT SLIDE ARROWS
	
	$('a.prevslide').hover(function() {
		$(this).stop().animate({
		  'left': '0px'
		}, 200);
	}, function() {
		$(this).stop().animate({
		  'left': '4px'
		}, 200);
	});
	
	
	$('a.nextslide').hover(function() {
		$(this).stop().animate({
		  'right': '0px'
		}, 200);
	}, function() {
		$(this).stop().animate({
		  'right': '4px'
		}, 200);
	});
	
	
	// VIEW FILM ARROW ANIMATION

	$('#carousel .description a.film').hover(function() {
		$(this).animate({backgroundPosition: '100% 50%'}, 300);
	}, function() {
		$(this).animate({backgroundPosition: '95% 50%'}, 300)
	});
		

	// SEGMENT PREVIEWS
	
	$(".mieszkania #segprev").find("img:last").hide();
	
	$(".mieszkania .segments a.one").click(function() {
		$(".mieszkania .segments a.seg").removeClass("current");
		$(this).addClass("current");
		var segment = $(".mieszkania #segprev");
		segment.find("img:last").fadeOut(200);
		segment.find("img:first").delay(200).fadeIn(200);
		return false;
	});
	
	$(".mieszkania .segments a.two").click(function() {
		$(".mieszkania .segments a.seg").removeClass("current");
		$(this).addClass("current");
		var segment = $(".mieszkania #segprev");
		segment.find("img:first").fadeOut(200);
		segment.find("img:last").delay(200).fadeIn(200);
		return false;
	});
	
	
	// CONTACT FORM DROPDOWN
	
	$("form.contact .select").click(function() {
		$(this).find(".dropdown").slideDown(300);
	});
	
	$(document).mouseup(function (e) {
	    var container = $("form.contact .select");
	
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	        container.find(".dropdown").slideUp(300);
	    }
	});
		

	// CONTACT FORM VALIDATION
	
	$("#contactform").validate({
	  onfocusout: false,
	  onclick: false,
	  onkeyup: false,
	  rules: {
	    name: {
	      required: true
	    },
	    phone: {
	      required: true,
	      number: true
	    },
	    email: {
	      required: true,
	      email: true
	    }
	  },
	  messages: {
	    name: "Please enter your name",
	    phone: "Please enter your phone number",
	    email: "Enter a correct email."
	  },
	  submitHandler: function(form) {
	    return form.submit();
	  },
	  highlight: function(element) {
	    return $(element).parent().stop().addClass("invalid").animate({
	      left: "-=7"
	    }, 40).animate({
	      left: "+=14"
	    }, 80).animate({
	      left: "-=12"
	    }, 65).animate({
	      left: "+=10"
	    }, 65).animate({
	      left: "-=8"
	    }, 50).animate({
	      left: "+=6"
	    }, 50).animate({
	      left: "-=3"
	    }, 30);
	  },
	  unhighlight: function(element) {
	    return $(element).parent().stop().removeClass("invalid");
	  },
	  errorPlacement: function(error, element) {
	    return true;
	  }
	});
	
	return $("#submit").click(function() {
	  
	  if ( $("#contactform").valid() == true ) {
	  
		  $('#contactform').append('<img src="http://www.kopernikpark.lh.pl/kopernik/symphony/workspace/img/loader.gif" class="loaderIcon" alt="Loading..." />');
	      var name = $('input#name').val();
	      var email = $('input#email').val();
	      var phone = $('input#phone').val();
	      var message = $('textarea#message').val();
	      var checkboxes = $('#contactform input:checkbox:checked').map(function () {
	        return this.value;
	      }).get();
	      
	      $.ajax({
	          type: 'post',
	          url: '../submitemail.php',
	          data: 'name=' + name + '&email=' + email + '&phone=' + phone + '&checkboxes=' + checkboxes + '&message=' + message,
	
	          success: function(results) {
	              $('#contactform img.loaderIcon').fadeOut(500);
	              $('#response').slideDown(1000).html(results);
	          }
	      });
	      
	  } //endif    
	      
	  return false;
	});

						
});
