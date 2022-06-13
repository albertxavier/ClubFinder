'use strict';

var checkIn=function($location)
{
//	var userProfile=sessionStorage.getItem("PROFILE_DETAILS");
	var sessionData = JSON.parse(sessionStorage.getItem("PROFILE_DETAILS"));
	if(sessionData == null || sessionData.type!=3)
	{
		$location.url("/login");
	}
};

var checkParams=function($location )
{
//	var userProfile=sessionStorage.getItem("PROFILE_DETAILS");
	var comingUrl=$location.path();
	var donationId=comingUrl.split('/')[2];
	sessionStorage.setItem("donationId",JSON.stringify(donationId));
	console.log("1");
	var sessionData = JSON.parse(sessionStorage.getItem("PROFILE_DETAILS"));
	if(sessionData)
		{
	if(sessionData.type!=3)
	{
		$location.url("/login");
	}
	else{
		$location.url('/distributiondetail');
	}
		}
	else{
		$location.url("/login");
	}
	
	
};

var myapp = angular.module('myapp',['ngRoute','mycontroller','myservices']);

                                               myapp.config(['$routeProvider',
                                                 function($routeProvider) {
                                            	   $routeProvider
                                                       .when('/map',{
                                                         templateUrl: 'partials/map.html',
                                                         controller: 'mainCtrl'
                                                       })     
                                                     .otherwise({
                                                       redirectTo:'/map'
                                                     });
                                            	   
                                                 }]);