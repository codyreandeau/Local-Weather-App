var app = angular.module('LocalWeather', []);

app.factory('WeatherApi', function($http) {
  var obj = {};
  
  obj.getLoc = function() {
    return $http.jsonp("http://ipinfo.io/json?callback=JSON_CALLBACK");
  };
  obj.getCurrent = function(city) {
    var units = "&units=metric";
    var conditions = "&callback=JSON_CALLBACK";
    
    return $http.jsonp("http://api.openweathermap.org/data/2.5/weather?q=" + city + units + "&APPID=061f24cf3cde2f60644a8240302983f2" + conditions);
  };
  return obj
});

app.controller('Main', function($scope, WeatherApi) {
  $scope.Data = {};
  $scope.Data.unit ='C';
  WeatherApi.getLoc().success(function(data) {
    var city = data.city;
    $scope.Data.city = data.city;
    WeatherApi.getCurrent(city).success(function(data) {
      YourWeather(data)
    });
  });

  function YourWeather(data) {
    $scope.Data.temp = Math.round(data.main.temp);
    $scope.Data.Fahrenheit = Math.round(($scope.Data.temp * 9)/5 + 32 );
    $scope.Data.des = data.weather[0].main;
    $scope.Data.Celcius = Math.round(data.main.temp);
    return IconGen($scope.Data.des);
  }
  
  
  $scope.Data.sys= function(){
   if($scope.Data.sysChange){
    $scope.Data.unit ='C';
    $scope.Data.temp = $scope.Data.Celcius;
     return $scope.Data.sysChange = false;
     }
     $scope.Data.unit ='F';
     $scope.Data.temp = $scope.Data.Fahrenheit;
    return $scope.Data.sysChange = true;
  }
});