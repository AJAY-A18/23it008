var app = angular.module("myApp",[]);

app.controller("WeatherController",['$scope','$http',function($scope,$http){
    $scope.weather={};
    $scope.getweather = function(){
        var city = $scope.city;
        var apikey="fc3bbb4a0bcdd875a75a3297814fe252";
        var url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apikey;

        $http.get(url)
        .then(function(response){
            $scope.weather = response.data;
        }).catch(function(error){
            console.error("Error fetching weather data:", error);
        })
    }
}])