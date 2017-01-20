/**
 * Created by Naresh Goud on 10/5/2016.
 */
var homeModule = angular.module('myModule',[]);
homeModule.controller('myController',['$scope',function($scope){
    console.log($scope);
}]);