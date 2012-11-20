$(document).ready(function() {
	
	$('.news-grid .news-more').click(function() {
		$('.news-grid .news-item:hidden:lt(3)').fadeIn(200);
		if ( $('.news-grid .news-item:hidden').length == 0 ) {
			$('.news-grid .news-more').fadeOut(200);
		}
		return false;
	});
	
	
});