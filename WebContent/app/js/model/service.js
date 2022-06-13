'use strict';

/* Services */

var myservices = angular.module('myservices', []);

/*myservices.factory('companyservice', function($resource) {
    return{
    	query:function()
    	{
    		$resource('https://api.parse.com/1/classes/Companies', {}, {
        method: 'GET',
        headers: { 'X-Parse-Application-Id':'XxGL8QAcBDv4gpqkOVBwulKxY21WxCakb4Zhghco', 'X-Parse-REST-API-Key':'dPOl49Iiy0NkmkvBxeCicTmfwc2Z4IhGtnTPmBcK'}
    
    });
    	}
    };
});
*/



myservices.factory('loginsrevice', ['$http','$q',function($http,$q){
	
	return{
		getClubList:function(lat,lan,dist){
			
			return	$http({
				url: 'https://api.parse.com/1/classes/Address',
				method: "GET",
				params:{'where':'{ "Location": {"$nearSphere": { "__type": "GeoPoint", "latitude":'+ lat+', "longitude": '+lan+'},"$maxDistanceInKilometers": '+dist+'}}'},
				headers: {'Content-Type': 'application/json',
					'X-Parse-Application-Id':'b1UGEZZRntlk2nury7ayla4UcPOXWGD7IPfHbgpm',
					'X-Parse-REST-API-Key':'Q8MmwFuZY4YMidj5SPdv3WVluhlTKfIRfGJSSmix'}})
			.success(function(responseData){
				console.log(responseData);
			}).error(function(responseData){
				
			});
			
		},
		getAddress:function(lat,lan){
			return	$http({
				url: 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lan+'&sensor=true',
				method: "GET"
					})
			.success(function(responseData){
				console.log(responseData);
			}).error(function(responseData){
				console.log(responseData);
			});
		}
		
	};
}]);


/*myservices.factory('mainservice', ['$http',function($http){
	
	return{
		getDonationList:function()
		{
			console.log(user);
			
			$http({
						method : 'GET',
						url : 'http://Perfomatix01:500/fcb-api/api/public/tmdonationslist',
						headers : {
							'Content-Type' : 'application/json'
						}}).success(function(data, status) {
							console.log(data);
							
							//$rootScope.setAlbumPhotos(data.results);

			}).error(function(data, status) {
				//$location.url("/login");
			});
		}
	};
}]);

*/