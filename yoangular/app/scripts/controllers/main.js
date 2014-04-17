'use strict';

angular.module('yoangularApp')
  .controller('MainCtrl', function ($scope,$location) {
  	localStorage.setItem('uname','kiranml1');
  	localStorage.setItem('password','kirankumar');
  	$scope.login = {
  		'uName':'kiranml1',
  		'uPassword':'kirankumar'
  	};
    $scope.loginProcess = function(){
    	if(($scope.login.uName === localStorage.getItem('uname'))
    		&& ($scope.login.uPassword === localStorage.getItem('password')) )
    	{
    		sessionStorage.setItem('uname','kiranml1');
  			sessionStorage.setItem('password','kirankumar');
  			$location.path("/dashboard");
    	}
    };
  });
