$("document").ready(function() {

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
	
	
	// READ MORE HOVER ANIMATIOn
	
	$(".news-feature a.more").hover(function() {
		console.log("hovered!");
		$(this).animate({
		  'background-position-x': '100%',
		  'background-position-y': '50%'
		}, 100)
	}, function() {
		$(this).animate({
		  'background-position-x': '98%',
		  'background-position-y': '50%'
		}, 100)
	});
	

	// NEWSROOM ITEM HEIGHT 
	
	$(".news-item .meta").hover(function() {
		$(this).find("div").fadeIn(200);
		$(this).stop().animate({"height" : "195px"}, 500);
	}, function() {
		$(this).stop().animate({"height" : "103px"}, 500);
		$(this).find("div").fadeOut(200);
	});


	// OLSZTYN PICS SLIDESHOW
	
	$('#pics, #newspics').cycle({
		after: onAfter,
		prev: ".lokalizacja .slidenav a.prevslide",
		next: ".lokalizacja .slidenav a.nextslide", 
		timeout: 0,
		fx: "cover"
	});
	
	function onAfter() { 
		var opis = $(this).data('opis')
	    $('.lokalizacja div.descr .sub.pics').html('<p>' + opis + '</p>'); 
	}
	
	$(".lokalizacja div.descr #togglemap").click(function() {
		$(".lokalizacja div.descr .tool").removeClass("current");
		$(this).addClass("current");
		$(".lokalizacja #pics").fadeOut();
		$(".lokalizacja #mapCont").fadeIn();
		$(".lokalizacja div.descr .sub.mapa").fadeIn();
		$(".lokalizacja div.descr .sub.pics").fadeOut();
		$(".lokalizacja div.descr .slidenav").fadeOut();
		return false;
	});
	
	
	$(".lokalizacja div.descr #togglepics").click(function() {
		$(".lokalizacja div.descr .tool").removeClass("current");
		$(this).addClass("current");
		$(".lokalizacja #pics").fadeIn();
		$(".lokalizacja #mapCont").fadeOut();
		$(".lokalizacja div.descr .sub.mapa").fadeOut();
		$(".lokalizacja div.descr .sub.pics").fadeIn();
		$(".lokalizacja div.descr .slidenav").fadeIn();
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
		$(this).stop().animate({
		  'background-position-x': '0%'
		}, 300);
	}, function() {
		$(this).stop().animate({
		  'background-position-x': '3%'
		}, 300);
	});
	
	$('a.nextpage').hover(function() {
		$(this).stop().animate({
		  'background-position-x': '100%'
		}, 300);
	}, function() {
		$(this).stop().animate({
		  'background-position-x': '97%'
		}, 300);
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
		$(this).animate({
		  'background-position-x': '100%'
		}, 300);
	}, function() {
		$(this).animate({
		  'background-position-x': '95%'
		}, 300);
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
	  rules: {
	    name: {
	      required: true
	    },
	    phone: {
	      required: true
	    },
	    email: {
	      required: true
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
	  //	console.log("trzęsie");
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
