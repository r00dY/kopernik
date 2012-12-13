	function initialize() {
		
			var styles = [
			  {
			    "featureType": "poi",
			    "stylers": [
			      { "visibility": "off" }
			    ]
			  },{
			    "featureType": "landscape.man_made",
			    "stylers": [
			      { "visibility": "off" }
			    ]
			  },{
			    "featureType": "landscape.natural",
			    "elementType": "geometry.fill",
			    "stylers": [
			      { "visibility": "on" },
			      { "color": "#111111" }
			    ]
			  },{
			    "featureType": "road.highway",
			    "elementType": "geometry.fill",
			    "stylers": [
			      { "color": "#808080" }
			    ]
			  },{
			    "featureType": "road.arterial",
			    "elementType": "geometry.fill",
			    "stylers": [
			      { "color": "#484848" }
			    ]
			  },{
			    "featureType": "road.local",
			    "elementType": "geometry.fill",
			    "stylers": [
			      { "color": "#080808" }
			    ]
			  },{
			    "featureType": "road.arterial",
			    "elementType": "labels.text.fill",
			    "stylers": [
			      { "color": "#ffffff" }
			    ]
			  },{
			    "featureType": "road.arterial",
			    "elementType": "labels.text.stroke",
			    "stylers": [
			      { "color": "#191919" }
			    ]
			  },{
			    "featureType": "road.local",
			    "elementType": "labels.text.fill",
			    "stylers": [
			      { "color": "#ffffff" }
			    ]
			  },{
			    "featureType": "road.local",
			    "elementType": "labels.text.stroke",
			    "stylers": [
			      { "color": "#0c0c0c" }
			    ]
			  },{
			    "featureType": "road.arterial",
			    "elementType": "labels.icon",
			    "stylers": [
			      { "visibility": "off" }
			    ]
			  },{
			    "featureType": "road.arterial",
			    "elementType": "geometry.stroke",
			    "stylers": [
			      { "weight": 1.6 },
			      { "color": "#b8b8b8" }
			    ]
			  },{
			    "featureType": "administrative.locality",
			    "elementType": "labels.text.fill",
			    "stylers": [
			      { "color": "#ffffff" }
			    ]
			  },{
			    "featureType": "administrative.locality",
			    "elementType": "labels.text.stroke",
			    "stylers": [
			      { "color": "#808080" },
			      { "lightness": -77 }
			    ]
			  },{
			    "featureType": "administrative.neighborhood",
			    "elementType": "labels.text.fill",
			    "stylers": [
			      { "color": "#ffffff" }
			    ]
			  },{
			    "featureType": "administrative.neighborhood",
			    "elementType": "labels.text.stroke",
			    "stylers": [
			      { "lightness": -86 }
			    ]
			  },{
			    "featureType": "water",
			    "elementType": "geometry.fill",
			    "stylers": [
			      { "color": "#292b58" }
			    ]
			  },{
			    "featureType": "water",
			    "elementType": "labels.text.fill",
			    "stylers": [
			      { "color": "#ffffff" }
			    ]
			  },{
			    "featureType": "water",
			    "elementType": "labels.text.stroke",
			    "stylers": [
			      { "lightness": -68 }
			    ]
			  },{
			    "featureType": "transit.station",
			    "stylers": [
			      { "visibility": "off" }
			    ]
			  },{
			    "featureType": "road.highway",
			    "elementType": "labels.text.fill",
			    "stylers": [
			      { "lightness": 100 }
			    ]
			  },{
			    "featureType": "road.highway",
			    "elementType": "labels.text.stroke",
			    "stylers": [
			      { "color": "#4b4f4f" }
			    ]
			  },{
			    "featureType": "road.arterial",
			    "elementType": "labels.text.stroke",
			    "stylers": [
			      { "lightness": 33 }
			    ]
			  },{
			  }
			];
			var options = {
				mapTypeControlOptions: {
					mapTypeIds: [ 'Styled']
				},
				center: new google.maps.LatLng(53.781066, 20.48019),
				zoom: 15,
				mapTypeId: 'Styled',
				disableDefaultUI: true
			};
			
			
			function TextualZoomControl(map) {
					
				var g = google.maps;
				var control = document.createElement("div");
				control.id = "zoomcontrol";
				var zoomInDiv = document.createElement("div");
				this.setButtonStyle_(zoomInDiv);
				control.appendChild(zoomInDiv);
				zoomInDiv.appendChild(document.createTextNode("Zoom In"));
				g.event.addDomListener(zoomInDiv, "click", function() {
					map.setZoom(map.getZoom()+1);
				});
				
				var zoomOutDiv = document.createElement("div");
				this.setButtonStyle_(zoomOutDiv);
				control.appendChild(zoomOutDiv);
				zoomOutDiv.appendChild(document.createTextNode("Zoom Out"));
				
				g.event.addDomListener(zoomOutDiv, "click", function() {
					map.setZoom(map.getZoom()-1);
				});
				
				document.getElementById("mapCont").appendChild(control);
				return control;
				
			}
			
			TextualZoomControl.prototype.setButtonStyle_ = function(button) {

			}
			
			var div = document.getElementById('mapCont');
			var map = new google.maps.Map(div, options);
			var styledMapType = new google.maps.StyledMapType(styles, { name: 'Styled' });
			map.mapTypes.set('Styled', styledMapType);
			
			var markerLatLng = new google.maps.LatLng(53.781066, 20.48019);
			var image = '../workspace/img/pinezka2.png';	
			var marker = new google.maps.Marker({
			      position: markerLatLng,
			      map: map,
			      icon: image
			});
			
			var zoom_control = new TextualZoomControl(map); 
			zoom_control.index = 1;
			
		}
