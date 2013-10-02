String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

$(document).ready(function() {
	
	var LOCALS_NORMAL = new Array();
	var LOCALS_SPECIAL = new Array();
	
	var LOCALS = new Array();
	var DISPLAYED = new Array();
	var PAGE = 1;
	var PAGES = 0;
	var LOCALS_PER_PAGE = 15;
	var FADE_DURATION = 200;
	var SHOW_ALERT = 0; // 0 - brak, 1 - podobne, 2 - nic
	var LOCALS_SHOWN = "NORMAL";
	
	// Create data structure of locals
	$('div#mieszkania-wszystkie > div').each(function() {
		var local = {};
		local['identyfikator'] = $(this).data('identyfikator');
		local['stan'] = $(this).data('stan');
		local['link'] = $(this).data('link');
		local['numer'] = parseInt($(this).data('numer'));
		local['budynek'] = $(this).data('budynek');
		local['pietro'] = parseInt($(this).data('pietro'));
		local['powierzchnia'] = parseFloat($(this).data('powierzchnia').toString().replace(',', '.'));
		local['pokoje'] = parseInt($(this).data('pokoje'));
		local['cechy'] = new Array();
		
		$(this).find('div#cechy div').each(function() {
			local['cechy'].push($(this).text());
		});
		
		if (local['pietro'] != -1 && local['pietro'] != 0) {
			LOCALS_NORMAL.push(local);
		} else {
			LOCALS_SPECIAL.push(local);
		}
	});
	
	LOCALS = LOCALS_NORMAL;
	DISPLAYED = LOCALS;
	locals_display(false);
	
	// LOCALS DISPLAY
	function locals_display(is_page_change) {
	
		if (!is_page_change) {
			$('.tabela-strony').fadeOut(FADE_DURATION);
		}
	
		$('tr.nie-znaleziono').fadeOut(FADE_DURATION);
		$('tr.nie-znaleziono-error').fadeOut(FADE_DURATION);
	
		$('table.sresults tbody').fadeOut(FADE_DURATION, function() {
		
			if (!is_page_change) {
				PAGE = 1;
				$('.tabela-strony').empty();
				
				PAGES = Math.ceil(DISPLAYED.length / LOCALS_PER_PAGE);
				
				for(var i = 0; i < PAGES; i++) {
					var a = $('<a href="#">' + (i + 1).toString() + '</a>');
					if (i == 0) { a.addClass('current'); }
					
					a.click(function() {
						$('.tabela-strony a').removeClass('current');
						$(this).addClass('current');
						PAGE = parseInt($(this).text());
						
						if (PAGE == PAGES) {
							$('.tabela-strony .next').hide();
						} else {
							$('.tabela-strony .next').show();
						}
						
						locals_display(true);
						return false;
					});
					
					$('.tabela-strony').append(a);
				}
				
				if (PAGES > 1) {
					var next = $('<a href="#" class="next">Następna &gt;</a>');
					next.click(function() {
						$('.tabela-strony a.current').next().trigger('click');
						return false;
					});
					$('.tabela-strony').append(next);
				}
			}
			
			$('table.sresults tbody').empty();
			
			var begin = LOCALS_PER_PAGE*(PAGE - 1);
			var end = Math.min(LOCALS_PER_PAGE*PAGE, DISPLAYED.length);
			
			for(i = begin; i < end; i++) {
				//console.log(i);
				var tr = $('#patterns tr').clone();
				tr.find('#numer').text(DISPLAYED[i]['numer']);
				tr.find('#budynek').text(DISPLAYED[i]['budynek'].capitalize());
				tr.find('#identyfikator').text(DISPLAYED[i]['identyfikator']);
				
				if (DISPLAYED[i]['pietro'] == 0) {
					tr.find('#pietro').text('Parter');
				} else {
					tr.find('#pietro').text(DISPLAYED[i]['pietro']);
				}
				
				for(var j = 0; j < DISPLAYED[i]['cechy'].length; j++) {
					var span;
					switch(DISPLAYED[i]['cechy'][j]) {
						case 'widok-na-panorame':
							span = $('#patterns div#cechy').find('.widok').clone();
							break;
						case 'mieszkanie-z-projektem-wnetrza':
							span = $('#patterns div#cechy').find('.projekt').clone();
							break;
						case 'przestronny-taras':
							span = $('#patterns div#cechy').find('.taras').clone();
							break;
						case 'oferta-specjalna':
							span = $('#patterns div#cechy').find('.oferta').clone();
							break;
					}
					tr.find('#cechy').append(span);
				}
				tr.find('#powierzchnia').text(DISPLAYED[i]['powierzchnia'].toString().replace('.',','));
				tr.find('#pokoje').text(DISPLAYED[i]['pokoje']);
				
				if (DISPLAYED[i]['stan'] == 'rezerwacja' || DISPLAYED[i]['stan'] == 'sprzedane') {
					tr.find('#stan').append($('<span class="' + DISPLAYED[i]['stan'] + '">' + DISPLAYED[i]['stan'].capitalize() + '</span>'));
				} else {
					tr.find('#stan').append($('<span class="wolne"><a href="' + DISPLAYED[i]['link'] + '" target="_blank">Zobacz plan</a></span>'));
				}
				
				tr.appendTo($('table.sresults tbody'));
			}
			
			$('table.sresults tbody').fadeIn(FADE_DURATION);
			
			if (LOCALS_SHOWN == "NORMAL") {
				if (SHOW_ALERT == 1) {
					$('tr.nie-znaleziono').fadeIn(FADE_DURATION);
				} else if (SHOW_ALERT == 2) {
					$('tr.nie-znaleziono-error').fadeIn(FADE_DURATION);
				}
			}
			
			if (!is_page_change) {
				$('.tabela-strony').fadeIn(FADE_DURATION);
			}
		});
	}
	
	// Filter, DISPLAYED refresh
	function filter_displayed() {
		var pokoje = [];
		var budynki = [];
		var pietra = [];
		var cechy = [];
		var tylko_dostepne = false;
		
		// Ilośc pokoi
		$('.tabela-form .dropdown#pokoje input[type=checkbox]:checked').each(function() {
			pokoje.push(parseInt($(this).val()));
		});
		// Budynki
		$('.tabela-form .dropdown#budynek input[type=checkbox]:checked').each(function() {
			budynki.push($(this).val());
		});
		// Piętro
		$('.tabela-form .dropdown#pietro input[type=checkbox]:checked').each(function() {
			pietra.push(parseInt($(this).val()));
		});
		// Cechy
		$('.tabela-form .cechy input[type=checkbox]:checked').each(function() {
			cechy.push($(this).attr('id'));
		});
		// Czy pokazywać tylko dostępne mieszkania?
		$('input#dostepne:checked').each(function() { tylko_dostepne = true; });

		/* KRYTERIA WYSZUKIWANIA INTELIGENTNEGO */
		var kryteria = [];
		
		var kryterium_glowne = {
			'pokoje' : pokoje,
			'budynki' : budynki,
			'pietra' : pietra,
			'cechy' : cechy,
			'tylko_dostepne' : tylko_dostepne
		};
		var kryterium_tmp = kryterium_glowne;
		
		// Kryterium główne
		kryteria.push(kryterium_glowne);
	
		// Kryterium 1
		kryterium_tmp = $.extend({}, kryterium_tmp);
		kryterium_tmp['pietra'] = [];
		kryteria.push(kryterium_tmp);
	
		// Kryterium 2
		kryterium_tmp = $.extend({}, kryterium_tmp);
		kryterium_tmp['budynki'] = [];
		kryteria.push(kryterium_tmp);
		
		// Tutaj trzeba dodać kryteria
		
		// Ocenianie poziomu zgodności dla każdego mieszkania
		var TMP = LOCALS.map(function(x) { x['level'] = 0; return x; });
		
		for(var j = 0; j < TMP.length; j++) {
			var mieszkanie = TMP[j];
			var k = 0;
			while(k != kryteria.length)
			{
				var kryterium = kryteria[k];
				result = criterion_match(mieszkanie, kryterium);
				if (result) {
					mieszkanie['level'] = k + 1;
					break;
				}
				k++;
			}
		}
		
		var level = 1;
		var TMP2;
		do {
			TMP2 = TMP.filter(function(x) { return x['level'] == level; });
			if (TMP2.length > 0) {
				TMP = TMP2;
				break;
			}
			level++;
			
			if (level == 20) break;
		}
		while (true);
		
		SHOW_ALERT = 0;
		if (level != 1) {
			SHOW_ALERT = 1;
			if (level == 20) {
				SHOW_ALERT = 2;
				TMP = [];
			}
		}

		// Przy okazji filtracji pojawiają się wyniki filtracji w polach
		var budynek_msg = budynki.length > 0 ? budynki.join(', ') : "dowolny";
		var pokoje_msg = pokoje.length > 0 ? pokoje.join(', ') : "dowolna";
		var pietro_msg = pietra.length > 0 ? pietra.join(', ') : "dowolne";
		
		$('.tabela-form .dropdown#budynek').parent().contents().first().replaceWith(budynek_msg);
		$('.tabela-form .dropdown#pietro').parent().contents().first().replaceWith(pietro_msg);
		$('.tabela-form .dropdown#pokoje').parent().contents().first().replaceWith(pokoje_msg);
		
		DISPLAYED = TMP;
		locals_display(false);
	}
	
	// Dopasowywanie kryteriów
	function criterion_match(mieszkanie, kryterium) {
	
		if (kryterium['budynki'].length > 0) {
			if ($.inArray(mieszkanie['budynek'], kryterium['budynki']) == -1) return false;
		}
		if (kryterium['pietra'].length > 0) {
			if ($.inArray(mieszkanie['pietro'], kryterium['pietra']) == -1) return false;
		}
		if (kryterium['pokoje'].length > 0) {
			if ($.inArray(mieszkanie['pokoje'], kryterium['pokoje']) == -1) return false;
		}
		
		if (kryterium['cechy'].length > 0) {
			for (var i = 0; i < kryterium['cechy'].length; i++) {
				if ($.inArray(kryterium['cechy'][i], mieszkanie['cechy']) == -1) return false;
			}
		}
		
		if (kryterium['tylko_dostepne']) {
			if (mieszkanie['stan'] != 'wolne') return false;
		}
		
		return true;
	}
	
	// Eventy zmiany filtracji!
	$('.tabela-form input[type=checkbox]').change(function() {
		filter_displayed();
	});
	
	// Czyszczenie
	$('.tabela-form .form-clear').click(function() {
		$('.tabela-form input:checkbox').prop('checked', false);
		$.uniform.update('.tabela-form input:checkbox')
		filter_displayed();
		return false;
	});
	
	// Taby
	$('#lokale-uzytkowe').click(function() {
		LOCALS_SHOWN = "SPECIAL";
		
		$('a#mieszkania').parent().removeClass('current');
		$(this).parent().addClass('current');
		
		$('.tabela-form').fadeOut(FADE_DURATION);
		LOCALS = LOCALS_SPECIAL;
		DISPLAYED = LOCALS;
		locals_display(false);
		$('.sresults').fadeOut(FADE_DURATION, function() {
			$('.sresults').fadeIn();
		});
		
		return false;
	});
	
	$('#mieszkania').click(function() {
		LOCALS_SHOWN = "NORMAL";
		
		$('a#lokale-uzytkowe').parent().removeClass('current');
		$(this).parent().addClass('current');
		
		LOCALS = LOCALS_NORMAL;
		DISPLAYED = LOCALS;
		locals_display(false);
		$('.sresults').fadeOut(FADE_DURATION, function() {
			$('.sresults').fadeIn();
			$('.tabela-form').fadeIn();
		});
		
		return false;
	});
	
});