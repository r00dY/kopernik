$(function() {

    // COORDS TRANSFORM

    areas = $('area.lokal');
    areas.each(function() {
        coords = $(this).attr('data-coords');
        coords = coords.split(',');
        for(i = 0; i < coords.length; i++) {
            coords[i] = Math.round( parseFloat(coords[i]) / 2.424 ).toString();
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

var Browser = {
  Version: function() {
    var version = 999; // we assume a sane browser
    if (navigator.appVersion.indexOf("MSIE") != -1)
      // bah, IE again, lets downgrade version number
      version = parseFloat(navigator.appVersion.split("MSIE")[1]);
    return version;
  }
}    

if (Browser.Version() == 8){
            $('body').addClass('ie8');
        }
    

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
    

    //$('body').addClass('ie8');
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
    //$('.budynek:not(:first)').hide();
    
    $( ".bryla .dock a" ).click(function(e) {
        e.preventDefault();
        var rzut = $(this).attr('href');
        rzut = rzut.substring(1, rzut.length);
        changeHash(rzut);
        $(".bryla .rzut").fadeOut(300);
        $(".bryla ." + rzut ).fadeIn(300, function(){
            $("img.widok-kondygnacji").maphilight({
                stroke: false,
                fillColor: 'c9825d',
                fillOpacity: 0.6
            });
        });
        
    });



    $('.bud-bryla:not(:first)').hide();
    $( "#bryla-list a" ).click(function(e) {
        e.preventDefault();
        var rzut = $(this).attr("href");
        $('#bryla-list a').removeClass('current');
        $(this).addClass('current');
        rzut = rzut.substring(1, rzut.length);
        $(".bud-bryla").fadeOut(300);
        $("#" + rzut ).delay(300).fadeIn(300, function(){
            $("img#bryla").maphilight({
                stroke: false,
                fillColor: 'c9825d',
                fillOpacity: 0.6
            });
        });
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

var addToHash = function(lokal){
    lokal = lokal.substring(1);
    var urlHash = window.location.hash;
    var hash = urlHash.split('_');
console.log('lokal: ' + lokal + ', url: '+urlHash);
    window.location.hash = hash[0] + '_' + lokal;
}

var removeFromHash = function(){
    var urlHash = window.location.hash;
    var hash = urlHash.split('_');
    var pietro = hash[0];
    pietro = pietro.substring(1);
    window.location.hash = pietro;
}

var changeHash = function(floor){
    console.log(floor);
    window.location.hash = floor;
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
        rzutW:0,
        rzutH:0,
        ratio:0,
        imgH:0,
        imgW:0,
        pdf : null,
        coordinates : null,
        cache : null,
        cachedImg : null,
        hiddenPanel: false,
        kartaW : 0,
        panelContainerW : 0,
        windowW : 0,
        windowH: 0,
        windowRatio: 0,
        state: null,
        showHideButton : null,
        cornerInfoContainer: null,
        cornerNrMieszkania: null,
        cornerPowierzchniaM: null,
        cornerLiczbaPokoi: null,
        cornerPietro: null,
        cornerCenaZaMetr: null,
        cornerCenaBrutto: null,
        init: function(){
                kp.kartaW = $('#plan-dialog .container').width();
                kp.windowW = $(window).width();
                kp.windowH = $(window).height();
        },

        setDims: function(){
                kp.rzutH = kp.windowH -170;
                kp.imgW = $('#plan-dialog .rzut img').width();
                kp.imgH = $('#plan-dialog .rzut img').height();
                kp.ratio = kp.imgW/kp.imgH;
                kp.windowRatio = (kp.windowW - 420) / kp.windowH;
                
                var margin = 0;
                if((kp.windowW - 400 - kp.rzutW)/2 < 0){
                    margin=10;
                }else{
                    margin = (kp.windowW - 420 - kp.rzutW)/2;
                }
                var r = kp.windowH*kp.ratio;
                var panW=0;
                if(kp.hiddenPanel){
                    panW = 20;
                }else{
                    panW = 420;
                }
                

                $('#plan-dialog .rzut').css({'height' : kp.windowH - 150 + 'px', 'width' : kp.windowW - panW-60 +'px', 'line-height' : kp.windowH -150 + 'px'});

                var panel = $('#plan-dialog .panel');
                var panelH = panel.height();
                if(panelH > (kp.windowH - 150)){
                    panel.css({'padding-top' : '0px'});
                }else{
                    panel.css({'padding-top' : (kp.windowH -150 - panelH)/2 + 'px', 'height' : kp.windowH - 170 + 'px'});
                    //$('#plan-dialog .rzut').css({'margin-top' : (kp.windowH -150 - panelH)/2 + 'px'});
                }
                    $('#showhide').css({'top' : (kp.windowH - 150 - 55)/2 + 'px'});
                


        },
        showDialog : function(el){
                        addToHash(el.attr('href'));
                        
                        if(el.data('code') == ''){
                            kp.kodMieszkania.hide();
                        } else{
                            kp.kodMieszkania.show();
                            kp.kodMieszkania.empty().html(el.data('code'));
                        }
                        
                        if(el.data('pow') == ''){
                            kp.powierzchniaM.parent().parent().hide();
                        }else{
                            kp.powierzchniaM.parent().parent().show();
                            kp.powierzchniaM.empty().html(el.data('pow'));
                        }

                        if(el.data('pokoje') == ''){
                            kp.liczbaPokoi.parent().parent().hide();
                        }else{
                            kp.liczbaPokoi.parent().parent().show();
                            kp.liczbaPokoi.empty().html(el.data('pokoje'));
                        }
                        if(el.data('pietro') == ''){
                            kp.pietro.parent().parent().hide();
                        }else{
                            kp.pietro.parent().parent().show();
                            kp.pietro.empty().html(el.data('pietro'));
                        }
                        if(el.data('cena') == ''){
                            kp.cenaZaMetr.parent().parent().hide();
                        }else{
                            kp.cenaZaMetr.parent().parent().show();
                            kp.cenaZaMetr.empty().html(el.data('cena'));
                        }
                        if(el.data('brutto') == ''){
                            kp.cenaBrutto.parent().parent().hide();
                        }else{
                            kp.cenaBrutto.parent().parent().show();
                            kp.cenaBrutto.empty().html(el.data('brutto'));
                        }

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
                                kp.setDims();
                                if(kp.windowH > 550){
                                   // $('body').css({'overflow' : 'hidden'});
                    $('#plan-dialog').css({'position' : 'fixed'});
                                }
                            });
                            
                
                        });
                    },

        showPanel : function(){

            var r = kp.windowH*kp.ratio;
            var h = 0;
                if(r > (kp.windowW - 400)){
                    h = (kp.windowW * (kp.imgH/kp.imgW))-400;
                    kp.rzutW = h * kp.ratio;
                }else{
                    h = kp.windowH - 170;
                    kp.rzutW = h * kp.ratio;
                }
                var margin = (kp.windowW - 400 - 60 - kp.rzutW)/2;
                if(margin<0){margin = 10;};
            kp.showHideButton.removeClass('hidden').addClass('shown');
            $('#plan-dialog .panel').animate({'right' : '30px'}, {easing : 'easeInOutExpo', duration: 500});
            $('#plan-dialog .rzut').animate({'width' : kp.windowW - 480 + 'px'}, {easing : 'easeInOutExpo', duration: 500});
            kp.hiddenPanel = false;
        },

        hidePanel : function(){
            var r = kp.windowH*kp.ratio;
            var h = 0;
            if(r > (kp.windowW - 20)){
                h = (kp.windowW * (kp.imgH/kp.imgW))-170;
                kp.rzutW = h * kp.ratio;
            }else{
                h = kp.windowH - 170;
                kp.rzutW = h * kp.ratio;
            } 
            var margin = (kp.windowW - kp.rzutW - 20)/2;
            if(margin<0){margin = 10;};
            kp.showHideButton.removeClass('shown').addClass('hidden');
            $('#plan-dialog .panel').animate({'right' : -380 + 'px'}, {easing : 'easeInOutExpo', duration: 500});
            $('#plan-dialog .rzut').animate({'width' : kp.windowW - 20 + 'px'}, {easing : 'easeInOutExpo', duration: 500});
            kp.hiddenPanel = true;
        }
        
    };

$(document).ready(function(){
    //window.location.hash = window.location.hash;
    kp.cache = new Array();
    $('area.lokal').each(function(){
        var rzut = $(this).data('rzut');
        var rzutToPush = rzut; //nazwy plikow z rzutami
        var widok = $(this).data('widok');
        var widokToPush = widok;// nazwy plikow z widokami
        kp.cache.push(rzutToPush);
        kp.cache.push(widokToPush);
    });
    
    

    preloadImages(kp.cache);
    kp.showHideButton = $('#plan-dialog a#showhide');
    kp.init();
    kp.planDialog = $('#plan-dialog');
    //kp.planDialog.css({'height' : getDocHeight() + 'px'});
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
    
    kp.cornerInfoContainer = $('#corner-info');
    kp.cornerInfoContainer.hide();
    kp.cornerNrMieszkania = $('#corner-info .nr-m');
    kp.cornerPowierzchniaM = $('#corner-info .pow-m');
    kp.cornerLiczbaPokoi = $('#corner-info .pokoje-l');
    kp.cornerPietro = $('#corner-info .pietro-l');
    kp.cornerCenaZaMetr = $('#corner-info .cena-l');
    kp.cornerCenaBrutto = $('#corner-info .brutto-l');
    
    
    var urlHash = window.location.hash;
    if(urlHash != ''){
        var hash = urlHash.split('_');
        if(hash.length == 1){
            var pietro = hash[0];
            pietro = pietro.substring(1);
            $('.bryla a').removeClass('current');
            $('.bryla a[href="#' + pietro + '"]').addClass('current');
            $('.budynek').hide();
            $('.' + pietro).show();
        }
        if(hash.length == 2){
            var pietro = hash[0];
            pietro = pietro.substring(1);
            var lokal = hash[1];
        kp.showDialog($('area.lokal[href="#' + lokal + '"]'));
            $('.bryla a').removeClass('current');
            $('.bryla a[href="' + pietro + '"]').addClass('current');
            $('.budynek').hide();
            $('.' + pietro).show();
            
        }
        
        
    }   
    

    $('area.lokal').mouseover(function(){
        var spanClass = $(this).attr('href');
        spanClass = spanClass.substring(1, spanClass.length);
        $('span.' + spanClass).stop().fadeIn(500);
    });

    $('area.lokal').mouseout(function(){
        var spanClass = $(this).attr('href');
        spanClass = spanClass.substring(1, spanClass.length);
        $('span.' + spanClass).stop().hide();
    });
        
   
   $('#plan-dialog .close').bind('click', function(e){
        e.preventDefault();
        
        
        $('#plan-dialog .karta').animate({'scale' : '0.7', 'opacity' : '0'}, {easing : 'easeInOutExpo', duration: 500,
                        complete: function(){
                            $('#plan-dialog').fadeOut(100);
                            $('body').css({'overflow' : 'auto'});
                            kp.showPanel();
                            removeFromHash();                        
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

   $('.budynek area').mouseover(function(){

        var nrM = $(this).attr('href');
        nrM = nrM.substring(2, nrM.length);
        kp.cornerNrMieszkania.empty().html(nrM);
        kp.cornerPowierzchniaM.empty().html($(this).data('pow'));
        kp.cornerLiczbaPokoi.empty().html($(this).data('pokoje'));
        kp.cornerPietro.empty().html($(this).data('pietro'));
        kp.cornerCenaZaMetr.empty().html($(this).data('cena'));
        kp.cornerCenaBrutto.empty().html($(this).data('brutto'));
        var el = $(this);

        if(el.data('pow') == ''){
            kp.cornerPowierzchniaM.parent().parent().hide();
        }else{
            kp.cornerPowierzchniaM.parent().parent().show();
            kp.cornerPowierzchniaM.empty().html(el.data('pow'));
        }

        if(el.data('pokoje') == ''){
            kp.cornerLiczbaPokoi.parent().parent().hide();
        }else{
            kp.cornerLiczbaPokoi.parent().parent().show();
            kp.cornerLiczbaPokoi.empty().html(el.data('pokoje'));
        }
        if(el.data('pietro') == ''){
            kp.cornerPietro.parent().parent().hide();
        }else{
            kp.cornerPietro.parent().parent().show();
            kp.cornerPietro.empty().html(el.data('pietro'));
        }
        if(el.data('cena') == ''){
            kp.cornerCenaZaMetr.parent().parent().hide();
        }else{
            kp.cornerCenaZaMetr.parent().parent().show();
            kp.cornerCenaZaMetr.empty().html(el.data('cena'));
        }
        if(el.data('brutto') == ''){
            kp.cornerCenaBrutto.parent().parent().hide();
        }else{
            kp.cornerCenaBrutto.parent().parent().show();
            kp.cornerCenaBrutto.empty().html(el.data('brutto'));
        }
        kp.cornerInfoContainer.fadeIn(100);
   });

   $('.budynek area').mouseout(function(){
        kp.cornerInfoContainer.fadeOut(100);     
   });

$('area.lokal').bind('click', function(e){
        e.preventDefault();
        $('#plan-dialog .karta').animate({'scale' : '0.7', 'opacity' : '0'},10);
        kp.showDialog($(this));      
    });

});

$(window).resize(function(){
    kp.init();
    kp.setDims();
});

$(window).load(function(){
});
