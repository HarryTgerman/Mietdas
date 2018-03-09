$(document).on('ready', function(){

	//------- Google Maps ---------//

	// Creating a LatLng object containing the coordinate for the center of the map
	var latlng = new google.maps.LatLng(49.3133858,8.4355679);

	// Creating an object literal containing the properties we want to pass to the map
	var options = {
		zoom: 13, // This number can be set to define the initial zoom level of the map
		center: latlng,
		scrollwheel: false,
		styles:[
				{
					"featureType": "administrative",
					"elementType": "labels.text.fill",
					"stylers": [
						{
							"color": "#444444"
						}
					]
				},
				{
					"featureType": "landscape",
					"elementType": "all",
					"stylers": [
						{
							"color": "#f2f2f2"
						}
					]
				},
				{
					"featureType": "poi",
					"elementType": "all",
					"stylers": [
						{
							"visibility": "off"
						}
					]
				},
				{
					"featureType": "road",
					"elementType": "all",
					"stylers": [
						{
							"saturation": -100
						},
						{
							"lightness": 45
						}
					]
				},
				{
					"featureType": "road.highway",
					"elementType": "all",
					"stylers": [
						{
							"visibility": "simplified"
						}
					]
				},
				{
					"featureType": "road.arterial",
					"elementType": "labels.icon",
					"stylers": [
						{
							"visibility": "off"
						}
					]
				},
				{
					"featureType": "transit",
					"elementType": "all",
					"stylers": [
						{
							"visibility": "off"
						}
					]
				},
				{
					"featureType": "water",
					"elementType": "all",
					"stylers": [
						{
							"color": "#c0e4f3"
						},
						{
							"visibility": "on"
						}
					]
				}
			],
		mapTypeId: google.maps.MapTypeId.ROADMAP // This value can be set to define the map type ROADMAP/SATELLITE/HYBRID/TERRAIN
	};
	// Calling the constructor, thereby initializing the map
	var map = new google.maps.Map(document.getElementById('home-map'), options);

	// Define Marker properties
	var image = new google.maps.MarkerImage('assets/img/marker7.png',
		new google.maps.Size(80, 80),
		new google.maps.Point(0,0),
		new google.maps.Point(18, 42)
	);



	// Add Marker
	var marker1 = new google.maps.Marker({
		position: new google.maps.LatLng(49.3173858,8.4365679),
		map: map,
		icon: image // This path is the custom pin to be shown. Remove this line and the proceeding comma to use default pin
	});



	// Add listener for a click on the pin
	google.maps.event.addListener(marker1, 'click', function() {
		infowindow1.open(map, marker1);
		$('body .infowindow').parent().parent().parent().parent().parent().parent().addClass('custom-tooltip')
	});





	// Add information window
	var infowindow1 = new google.maps.InfoWindow({
		content:  createInfo('<div class="listing-shot grid-style"> <div class="listing-shot-img"><img src="http://via.placeholder.com/800x800" class="img-responsive" alt=""> <span class="approve-listing"><i class="fa fa-check"></i></span> <span class="like-listing"><i class="fa fa-heart-o" aria-hidden="true"></i></span> </div> <div class="listing-shot-caption"> <h4>Art & Design</h4> <p class="listing-location">Bishop Avenue, New York</p> </div> </a> <div class="listing-shot-info"> <div class="row extra"> <div class="col-md-12"> <div class="listing-detail-info"> <span><i class="fa fa-phone" aria-hidden="true"></i> 807-502-5867</span> <span><i class="fa fa-globe" aria-hidden="true"></i> www.mysitelink.com</span> </div> </div> </div> </div> <div class="listing-shot-info rating"> <div class="row extra"> <div class="col-md-7 col-sm-7 col-xs-6"> <i class="color fa fa-star" aria-hidden="true"></i> <i class="color fa fa-star" aria-hidden="true"></i> <i class="color fa fa-star" aria-hidden="true"></i> <i class="color fa fa-star" aria-hidden="true"></i> <i class="fa fa-star" aria-hidden="true"></i></div> <div class="col-md-5 col-sm-5 col-xs-6 pull-right"> <a href="#" class="detail-link">Open Now</a> </div> </div> </div> </div>')
	});



	// Create information window
	function createInfo(title, content) {
		return '<div class="infowindow"><span>'+ title +'</span>'+content+'</div>';
	}



});
