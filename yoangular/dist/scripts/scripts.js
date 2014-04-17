'use strict';
angular.module('yoangularApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize'
]).config([
  '$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    }).when('/dashboard', { templateUrl: 'views/dashboard.html' }).otherwise({ redirectTo: '/' });
  }
]);
'use strict';
angular.module('yoangularApp').controller('MainCtrl', [
  '$scope',
  '$location',
  function ($scope, $location) {
    localStorage.setItem('uname', 'kiranml1');
    localStorage.setItem('password', 'kirankumar');
    $scope.login = {
      'uName': 'kiranml1',
      'uPassword': 'kirankumar'
    };
    $scope.loginProcess = function () {
      if ($scope.login.uName === localStorage.getItem('uname') && $scope.login.uPassword === localStorage.getItem('password')) {
        sessionStorage.setItem('uname', 'kiranml1');
        sessionStorage.setItem('password', 'kirankumar');
        $location.path('/dashboard');
      }
    };
  }
]);
'use strict';
function command() {
  if (arguments.length > 0) {
    switch (arguments[0]) {
    case 'login':
      login('mkdir');
      break;
    case 'logout':
      logout('cd');
      break;
    default:
      alert('Terminal Unable to find the Command');
    }
  }
}
function login() {
  window.location = 'http://kiranml1.github.io/jkefexjs/demos/yoangular/app/#/dashboard';
}
function logout() {
  window.location = 'http://kiranml1.github.io/jkefexjs/demos/yoangular/app/#/';
}
$(function () {
  $('#console input:text').val('Command line .............');
  $('#console input:text').focusin(function () {
    $('#console input:text').val(' ');
  });
  $('#console input:text').focusout(function () {
    $('#console input:text').val('Command line .............');
  });
  $('#console input:text').keyup(function (e) {
    if (e.which === 13) {
      var args = $(this).val().split(' ');
      if (args[0] === '')
        args.shift();
      command.apply(this, args);
    }
  });
});