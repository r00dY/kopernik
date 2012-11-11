$(function() {

	// COORDS TRANSFORM

	areas = $('area.lokal');
	areas.each(function() {
		coords = $(this).attr('data-coords');
		coords = coords.split(',');
		for(i = 0; i < coords.length; i++) {
			coords[i] = Math.round( parseFloat(coords[i]) / 2.34 ).toString();
		}	
		coords = coords.join(',');
		$(this).attr('data-coords', coords);
	});

	// PANEL BUTTONS
	
	$(".panel .tool a").mouseover(function(){
		$(this).prev().stop().animate({ 'width': '208px' 
		});
	});
	
	$(".panel .tool a").mouseout(function(){
		$(this).prev().stop().animate({'width': '0px'
		});
	});

    

    

	// MAP HIGHLIGHT
	
	$("img#bryla").maphilight({
		stroke: false,
		fillColor: 'c9825d',
		fillOpacity: 0.6
	});

    $("img.widok-kondygnacji").maphilight({
        stroke: false,
        fillColor: 'c9825d',
        fillOpacity: 0.6
    });

    
    
	
	
	// MAP HOVER 
	
	$(".bud-bryla area").hover(function() {
		var pietro = $(this).attr("class");
		$(".bryla ul.pietra li." + pietro).stop().animate({"opacity" : "1"}, 400);
	}, function() {
		$(".bryla ul.pietra li").stop().animate({"opacity" : "0"}, 200);
	});
	

	// DOCK EFFECT 
	
    $( ".bryla .dock a" ).hover(function() {
        $(this).addClass( "hover", 500);
    }, function() {
    	$(this).removeClass( "hover", 500);
    });
    
    
    $( ".bryla .dock a" ).click(function() {
    	$( ".bryla .budynki a" ).removeClass("current");
    	$(this).addClass("current");
    	return false;
    });
    
    var jqDockOpts = {align: 'left', duration: 200, labels: 'tc', size: 90, distance: 85};  
    $('.dock').jqDock(jqDockOpts);

    // KONDYGNACJE
    
    //$(".bryla .rzut:not(:first)").hide();
    $('.budynek:not(:first)').hide();
    $( ".bryla .dock a" ).click(function() {
    	var rzut = $(this).attr("id");
    	$(".bryla .rzut").fadeOut(300);
    	$(".bryla ." + rzut ).delay(300).slideDown(300);
    });

    $('.bud-bryla:not(:first)').hide();
    $( "#bryla-list a" ).click(function(e) {
        var rzut = $(this).attr("href");
        $('#bryla-list a').removeClass('current');
        $(this).addClass('current');
        rzut = rzut.substring(1, rzut.length);
        $(".bud-bryla").fadeOut(300);
        $("#" + rzut ).delay(300).slideDown(300);
        e.preventDefault();
    });
    
    
    // MIESZKANIE HOVER 
    
    $(".budynek a.lokal").hover(function() {
    	
    	//fade in
    	$(this).stop().animate({"opacity" : "1"}, 300);
    	
    	
    	// getting data attribute
    	var pow = $(this).data('pow');    	
    	var pokoje = $(this).data('pokoje'); 
    	var pietro = $(this).data('pietro'); 
    	var cena = $(this).data('cena'); 
    	var brutto = $(this).data('brutto'); 
    	
    	// setting values into b elements
    	
    	$("#budinfo li.pow b").text(pow);
    	$("#budinfo li.pokoje b").text(pokoje);
    	$("#budinfo li.pietro b").text(pietro);
    	$("#budinfo li.cena b").text(cena);
    	$("#budinfo li.brutto b").text(brutto);
    	
    	// info fade in
    	$("#budinfo").fadeIn(300);
    	
    	
    }, function() {
    
    	// fade out
    	$(this).stop().animate({"opacity" : "0"}, 300);
    	
    	// info fade out
    	$("#budinfo").fadeOut(300);
    	
    });

});


var preloadImages = function(im) {
    kp.cachedImg = new Array();
    var args_len = im.length;
    for (var i = args_len; i--;) {
        kp.cachedImg[i] = new Image();
        kp.cachedImg[i].src = im[i];  
    }
  };

  var getDocHeight = function() {
    var D = document;
    return Math.max(
        Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
        Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
        Math.max(D.body.clientHeight, D.documentElement.clientHeight)
        );
    }   

var kp = {

        planDialog : null,
        dialogW : 0,
        kodMieszkania : null,
        powierzchniaM : null,
        liczbaPokoi : null,
        pietro : null,
        cenaZaMetr : null,
        cenaBrutto : null,
        widokImg : null,
        rzutImg : null,
        pdf : null,
        coordinates : null,
        cache : null,
        cachedImg : null,
        hiddenPanel: false,
        kartaW : 0,
        panelContainerW : 0,
        windowW : 0,
        showHideButton : null,
        showDialog : function(el){
                        window.location.hash = el.attr('href');
                        kp.kodMieszkania.empty().html(el.data('code'));
                        kp.powierzchniaM.empty().html(el.data('pow'));
                        kp.liczbaPokoi.empty().html(el.data('pokoje'));
                        kp.pietro.empty().html(el.data('pietro'));
                        kp.cenaZaMetr.empty().html(el.data('cena'));
                        kp.cenaBrutto.empty().html(el.data('brutto'));
                        kp.widokImg.attr('src', el.data('widok'));
                        kp.rzutImg.attr('src', el.data('rzut'));
                        kp.pdf.attr('href', el.data('pdf'));
                        kp.coordinates.attr('coords', el.data('coords'));

                        $('#plan-dialog .rzut img').imagesLoaded(function(){ 
                            $('#plan-dialog').show(10, function(){
                                $.scrollTo(0, {
                                    axis : 'y',
                                    duration : 300, 
                                    easing : 'easeInOutQuart'
                                });
                                $("img#widok").maphilight({
                                    stroke: false,
                                    alwaysOn: true,
                                    fillColor: 'c9825d',
                                    fillOpacity: 0.8
                                });
                                $('#plan-dialog .karta').animate({'scale' : '1', 'opacity' : '1'}, {easing : 'easeInOutExpo', duration: 500});
                            });
                        });
                    },

        showPanel : function(){
            kp.showHideButton.removeClass('hidden').addClass('shown');
            $('#plan-dialog .panel').animate({'right' : '30px'}, {easing : 'easeInOutExpo', duration: 500});
            $('#plan-dialog .rzut').animate({'width' : '560px', 'margin-left' : (kp.windowW - 400 - 560)/2 + 'px'}, {easing : 'easeInOutExpo', duration: 500});
            kp.hiddenPanel = false;
        },

        hidePanel : function(){
            kp.showHideButton.removeClass('shown').addClass('hidden');
            $('#plan-dialog .panel').animate({'right' : -400 + 'px'}, {easing : 'easeInOutExpo', duration: 500});
            $('#plan-dialog .rzut').animate({'width' : '650px', 'margin-left' : (kp.windowW - 650)/2 + 'px'}, {easing : 'easeInOutExpo', duration: 500});
            kp.hiddenPanel = true;
        }
        
    };

$(document).ready(function(){
    kp.cache = new Array();
    $('a.lokal').each(function(){
        var rzut = $(this).data('rzut');
        var rzutToPush = 'img/rzut-mieszkanie-' + rzut + '.jpg'; //nazwy plikow z rzutami
        var widok = $(this).data('widok');
        var widokToPush = 'img/widok-' + widok + '.jpg';// nazwy plikow z widokami
        kp.cache.push(rzutToPush);
        kp.cache.push(widokToPush);
    });
    
    preloadImages(kp.cache);

    kp.showHideButton = $('#plan-dialog a#showhide');
    kp.kartaW = $('#plan-dialog .container').width();
    kp.windowW = $(window).width();
    $('#plan-dialog .rzut').css({'margin-left' : (kp.windowW - 400 - 560)/2 + 'px'});
    $('#plan-dialog .container').css({'width' : kp.windowW + 'px'});
    kp.planDialog = $('#plan-dialog');
    kp.planDialog.css({'height' : getDocHeight() + 'px'});
    kp.kodMieszkania = $('#plan-dialog .kod-mieszkania');
    kp.powierzchniaM = $('#plan-dialog .pow-m');
    kp.liczbaPokoi = $('#plan-dialog .pokoje-l');
    kp.pietro = $('#plan-dialog .pietro-l');
    kp.cenaZaMetr = $('#plan-dialog .cena-l');
    kp.cenaBrutto = $('#plan-dialog .brutto-l');
    kp.widokImg = $('#plan-dialog img#widok');
    kp.rzutImg = $('#plan-dialog .rzut img');
    kp.pdf = $('#plan-dialog .lokal-pdf');
    kp.coordinates = $('#plan-dialog map area');
	
	
    var urlHash = window.location.hash;
	
	console.log(urlHash);
	
    if(urlHash != ''){
        kp.showDialog($('area.lokal[href="' + urlHash + '"]'))
    }
    $('area.lokal').bind('click', function(e){
        e.preventDefault();
        $('#plan-dialog .karta').animate({'scale' : '0.7', 'opacity' : '0'},10);
        kp.showDialog($(this)); 
            
    });

    $('area.lokal').mouseover(function(){
        var spanClass = $(this).attr('href');
        spanClass = spanClass.substring(1, spanClass.length);
        //console.log(spanClass);
        $('span.' + spanClass).stop().fadeIn(500);
    });

    $('area.lokal').mouseout(function(){
        var spanClass = $(this).attr('href');
        spanClass = spanClass.substring(1, spanClass.length);
       // alert(spanClass);
        $('span.' + spanClass).stop().hide();
    });
        
   
   $('#plan-dialog .close').bind('click', function(e){
        e.preventDefault();
        
        window.location.hash = '';
        $('#plan-dialog .karta').animate({'scale' : '0.7', 'opacity' : '0'}, {easing : 'easeInOutExpo', duration: 500,
                        complete: function(){
                            $('#plan-dialog').fadeOut(100);
                            kp.showPanel();
                        }

                    });
                
   });

   $('#plan-dialog a#showhide').bind('click', function(e){
        e.preventDefault();

        if(kp.hiddenPanel){
            kp.showPanel();
            
        }else{
            kp.hidePanel();
            
        } 
    });

});

