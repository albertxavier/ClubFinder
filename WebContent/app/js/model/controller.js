var myController = angular.module('mycontroller',[]);

myController.controller('mainCtrl',['$scope','$rootScope','loginsrevice','$location','$route','$timeout',function($scope,$rootScope,loginsrevice,$location,$route,$timeout){
	


	
	window.onload = function init() {
		
		
	};
	
	var	map;
	var circle;
	var marker;
	var markersArray = [];
	
	$scope.getLocation =function () {
		$scope.radius = 80.4672;
		$scope.distance  = 50;
	    if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition(showPosition,userLocationNotFound,notNow);
	    } else { 
	    //    x.innerHTML = "Geolocation is not supported by this browser.";
	        $scope.lat = 33.748995;
			$scope.lan = -84.387982;
			$scope.radius = 80.4672; 
			$scope.distance  = 50;
			$scope.getMapDetails();
	    }
	};

	function showPosition(position) {
		$scope.lat =  position.coords.latitude;
		$scope.lan = position.coords.longitude;	
		$scope.radius = 80.4672; 
		$scope.distance  = 50;
		 var
	        latLngCenter = new google.maps.LatLng($scope.lat, $scope.lan);
	        	map = new google.maps.Map(document.getElementById('map'), {
	            zoom: 8,
	            center: latLngCenter,
	            mapTypeId: google.maps.MapTypeId.ROADMAP,
	            mapTypeControl: false
	        });
		$scope.getMapDetails();
	}
	
	function userLocationNotFound(error){
		$scope.radius = 80.4672; 
		$scope.distance  = 50;
		$scope.lat = 33.748995;
		$scope.lan = -84.387982;
		 var
	        latLngCenter = new google.maps.LatLng($scope.lat, $scope.lan);
	        	map = new google.maps.Map(document.getElementById('map'), {
	            zoom: 8,
	            center: latLngCenter,
	            mapTypeId: google.maps.MapTypeId.ROADMAP,
	            mapTypeControl: false
	        });
		$scope.getMapDetails();
	}

	function notNow(error){
		$scope.radius = 80.4672; 
		$scope.distance  = 50;
		$scope.lat = 33.748995;
		$scope.lan = -84.387982;
		$scope.getMapDetails();
	}
	
	$scope.getMapDetails = function(){

		/*$scope.lat = 33.748995;
		$scope.lan = -84.387982;*/
		//$scope.radius = 50;  
		$rootScope.loadingImage = true;
		loginsrevice.getClubList($scope.lat,$scope.lan,$scope.radius)
		.then(function(responseData){
			console.log(responseData.data);
			$scope.clubs = responseData.data.results;
		    var
	        contentCenter = '<span class="infowin">Atlanta</span>';
	        
		    var
		        latLngCenter = new google.maps.LatLng($scope.lat, $scope.lan),
		        latLngCMarker = new google.maps.LatLng($scope.lat, $scope.lan),
		       /* map = new google.maps.Map(document.getElementById('map'), {
		            zoom: 8,
		            center: latLngCenter,
		            mapTypeId: google.maps.MapTypeId.ROADMAP,
		            mapTypeControl: false
		        }),*/
		        markerCenter = new google.maps.Marker({
		            position: latLngCMarker,
		            title: 'Drag me',
		            map: map,
		            icon :"images/pinred1.png",
		            draggable: true
		        }),
		        infoCenter = new google.maps.InfoWindow({
		            content: contentCenter
		        });
		        circle = new google.maps.Circle({
		            map: map,
		            clickable: false,
		            // metres
		            title:'sasass',
		            radius: 1000 * $scope.radius,
		            fillColor: '#fff',
		            fillOpacity: .6,
		            strokeColor: '#313131',
		            strokeOpacity: .4,
		            strokeWeight: .8,
		            editable: true,
		            draggable: true
		        });
		    // attach circle to marker
		    circle.bindTo('center', markerCenter, 'position');
		    
		    var
		    // get the Bounds of the circle
		    bounds = circle.getBounds();

		   /* google.maps.event.addListener(markerCenter, 'dragend', function() {
		        latLngCenter = new google.maps.LatLng(markerCenter.position.lat(), markerCenter.position.lng());
		        bounds = circle.getBounds();
		    });*/
		    
		    google.maps.event.addListener(markerCenter, 'click', function() {
		    	 var aa = circle.getCenter();
		    	 var markercenterLat=aa.k;
		    	 var markercenterLan=aa.B;
		    	loginsrevice.getAddress(markercenterLat,markercenterLan)
		    	.then(function(data){
		    		console.log(data.data.results[0].formatted_address);
		    		contentCenter =	'<span class="infowin" style="font-weight: bold;color: teal;background-color: mintcream;">'+data.data.results[0].formatted_address+'</span>';
		    		
		    var infoCenters = new google.maps.InfoWindow({
			            content: contentCenter
			        });
		    	
		    		  infoCenters.open(map, markerCenter);
		    	},function(error){
		    		  infoCenter.open(map, markerCenter);
		    	});
		      
		    });

		    google.maps.event.addListener(markerCenter, 'drag', function() {
		        infoCenter.close();
		    });
		    
		    google.maps.event.addListener(circle, 'radius_changed', function() {
		    	
		      console.log(circle.getRadius());
		      $scope.raduisInKM  = circle.getRadius()/1000;
		      $scope.radius = $scope.raduisInKM ;
		  	$scope.distance  = ($scope.radius/1.60934).toFixed(2);
		  	circle.setMap(null);
		  	markerCenter.setMap(null);
		  	clearOverlays();
		      $scope.getMapDetails();
		    });
		    google.maps.event.addListener(circle,'mouseover',function(){
	             this.getMap().getDiv().setAttribute('title',this.get('title'));});

	        google.maps.event.addListener(circle,'mouseout',function(){
	             this.getMap().getDiv().removeAttribute('title');});
	        
		    google.maps.event.addListener(markerCenter,'dragend', function() {
			      console.log(circle.getRadius());
			     
			      var aa = circle.getCenter();
			      $scope.lat=aa.k;
			      $scope.lan=aa.B;
			      $scope.raduisInKM = circle.getRadius()/1000;
			      $scope.radius = $scope.raduisInKM ;
			  	$scope.distance  = ($scope.radius/1.60934).toFixed(2);
			  	 circle.setMap(null);
			  	markerCenter.setMap(null);
			  	clearOverlays();
			  	marker.setMap(null);
			      $scope.getMapDetails();
			    });
			    
			    google.maps.event.addListener(circle,'dragstart', function() {
			    	alert("aa");
			    });
		    
		    for(var i=0;$scope.clubs.length>i;i++){
		    var	 latLng = new google.maps.LatLng($scope.clubs[i].Location.latitude, $scope.clubs[i].Location.longitude);
		    marker = new google.maps.Marker({
	            position: latLng,
	            title: 'Location',
	            map: map,
	            icon:"images/rt.jpg",
	            draggable: false
	        });
		    markersArray[i] = marker;
	       /* info = new google.maps.InfoWindow({
	            content: content
	        });*/
		    
		   /* google.maps.event.addListener(marker, 'dragend', function() {
		        latLng = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
		    });*/
		    
		   /* google.maps.event.addListener(marker, 'click', function() {
		        info.open(map, marker);
		    });*/
		    var infowindow = new google.maps.InfoWindow();
		    google.maps.event.addListener(marker, 'click', (function(marker, i) {
		    	
		        return function() {
		        	var content = '<span class="infowin" style="font-weight: bold;color: teal;background-color: mintcream;">'+$scope.clubs[i].siteName+'<br>'+$scope.clubs[i].Address1+','+$scope.clubs[i].City+','+ $scope.clubs[i].State+'</span>';
		        	 infowindow.setContent(content);
		          infowindow.open(map, marker);
		        }
		      })(marker, i));
		    
		    google.maps.event.addListener(marker, 'drag', function() {
		        info.close();
		    });

		    }
		    $rootScope.loadingImage = false;
		    
		 var   geocoder = new google.maps.Geocoder();
		    geocoder.geocode({'latLng': latLngCenter}, function(results, status) {
		        if (status == google.maps.GeocoderStatus.OK) {
		          if (results[1]){
		        	  contentCenter = '<span class="infowin">'+results[1].formatted_address+'</span>';
		          } else {
		            console.log('No results found');
		          }
		        } else {
		          console.log('Geocoder failed due to: ' + status);
		        }
		      });
		},function(error){
			$rootScope.loadingImage = true;
			console.log(error);
		});
		
		
	 /*   var
	        contentCenter = '<span class="infowin">Center Marker (draggable)</span>',
	        contentA = '<span class="infowin">Marker A (draggable)</span>',
	        contentB = '<span class="infowin">Marker B (draggable)</span>';
	    var
	      //  latLngCenter = new google.maps.LatLng(37.081476, -94.510574),
	    //    latLngCMarker = new google.maps.LatLng(37.0814, -94.5105),
	        latLngCenter = new google.maps.LatLng(33.748995, -84.387982),
	        latLngCMarker = new google.maps.LatLng(33.748995, -84.387982),
	        latLngA = new google.maps.LatLng(37.2, -94.1),
	        latLngB = new google.maps.LatLng(38, -93),
	        map = new google.maps.Map(document.getElementById('map'), {
	            zoom: 7,
	            center: latLngCenter,
	            mapTypeId: google.maps.MapTypeId.ROADMAP,
	            mapTypeControl: false
	        }),
	        markerCenter = new google.maps.Marker({
	            position: latLngCMarker,
	            title: 'Location',
	            map: map,
	            draggable: true
	        }),
	        infoCenter = new google.maps.InfoWindow({
	            content: contentCenter
	        }),
	        markerA = new google.maps.Marker({
	            position: latLngA,
	            title: 'Location',
	            map: map,
	            draggable: true
	        }),
	        infoA = new google.maps.InfoWindow({
	            content: contentA
	        }),
	        markerB = new google.maps.Marker({
	            position: latLngB,
	            title: 'Location',
	            map: map,
	            draggable: true
	        }),
	        infoB = new google.maps.InfoWindow({
	            content: contentB
	        })
	        // exemplary setup: 
	        // Assumes that your map is signed to the var "map"
	        // Also assumes that your marker is named "marker"
	        ,
	        circle = new google.maps.Circle({
	            map: map,
	            clickable: false,
	            // metres
	            radius: 1000*100,
	            fillColor: '#fff',
	            fillOpacity: .6,
	            strokeColor: '#313131',
	            strokeOpacity: .4,
	            strokeWeight: .8,
	            editable: true,
	            draggable: true
	        });
	    // attach circle to marker
	    circle.bindTo('center', markerCenter, 'position');

	    var
	    // get the Bounds of the circle
	    bounds = circle.getBounds()
	    // Note spans
	    ,
	        noteA = jQuery('.bool#a'),
	        noteB = jQuery('.bool#b');

	    noteA.text(bounds.contains(latLngA));
	    noteB.text(bounds.contains(latLngB));

	    // get some latLng object and Question if it's contained in the circle:
	    google.maps.event.addListener(markerCenter, 'dragend', function() {
	        latLngCenter = new google.maps.LatLng(markerCenter.position.lat(), markerCenter.position.lng());
	        bounds = circle.getBounds();
	        noteA.text(bounds.contains(latLngA));
	        noteB.text(bounds.contains(latLngB));
	    });

	    google.maps.event.addListener(markerA, 'dragend', function() {
	        latLngA = new google.maps.LatLng(markerA.position.lat(), markerA.position.lng());
	        noteA.text(bounds.contains(latLngA));
	    });

	    google.maps.event.addListener(markerB, 'dragend', function() {
	        latLngB = new google.maps.LatLng(markerB.position.lat(), markerB.position.lng());
	        noteB.text(bounds.contains(latLngB));
	    });

	    google.maps.event.addListener(markerCenter, 'click', function() {
	        infoCenter.open(map, markerCenter);
	    });

	    google.maps.event.addListener(markerA, 'click', function() {
	        infoA.open(map, markerA);
	    });

	    google.maps.event.addListener(markerB, 'click', function() {
	        infoB.open(map, markerB);
	    });

	    google.maps.event.addListener(markerCenter, 'drag', function() {
	        infoCenter.close();
	        noteA.html("draggin&hellip;");
	        noteB.html("draggin&hellip;");
	    });

	    google.maps.event.addListener(markerA, 'drag', function() {
	        infoA.close();
	        noteA.html("draggin&hellip;");
	    });

	    google.maps.event.addListener(markerB, 'drag', function() {
	        infoB.close();
	        noteB.html("draggin&hellip;");
	    });*/
	
	};
	$scope.initialize=function()
	{
		autocomplete = new google.maps.places.Autocomplete(
			      /** @type {HTMLInputElement} */(document.getElementById('autocomplete')),
			      { types: ['geocode'] });
			  // When the user selects an address from the dropdown,
			  // populate the address fields in the form.
			  google.maps.event.addListener(autocomplete, 'place_changed', function() {
			    fillInAddress();
			  });
	};
	
	function clearOverlays() {
		  for (var i = 0; i < markersArray.length; i++ ) {
		    markersArray[i].setMap(null);
		  }
		  markersArray.length = 0;
		}
	
	function fillInAddress() {
        var place = autocomplete.getPlace();
var lat=place.geometry.location.k;
var long=place.geometry.location.B;

console.log('lat is--->',lat);
console.log('long is--->',long);
$scope.lat =  lat;
$scope.lan = long;	
$scope.radius = 80.4672;
$scope.distance  = 50;
var
latLngCenter = new google.maps.LatLng($scope.lat, $scope.lan);
	map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: latLngCenter,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false
});
$scope.getMapDetails();
        }
	
	$scope.geolocate=function() {
		  if (navigator.geolocation) {
		    navigator.geolocation.getCurrentPosition(function(position) {
		      var geolocation = new google.maps.LatLng(
		          position.coords.latitude, position.coords.longitude);
		      autocomplete.setBounds(new google.maps.LatLngBounds(geolocation,
		          geolocation));
		    var  currentlat = position.coords.latitude;
            var  currentlong = position.coords.longitude;
            console.log("the lat and longs of my place are",currentlat,'||',currentlong);
		    });
		  }
		}
	
}]);