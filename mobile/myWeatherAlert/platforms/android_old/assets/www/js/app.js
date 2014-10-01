(function(){
  'use strict';
  var module = angular.module('app', ['onsen']);

  module.controller('QuakeController', function($scope) {
    var data = [];
    var noData = [{place: 'No Data', mag: ''}];
    var markerArrayLen = markerArray.length;
    // console.log(markerArrayLen);
    for(var i = 0; i < markerArrayLen; i++) {
      var curPlace = markerArray[i].title.split(": Magnitude ")[0];
      var curMag = markerArray[i].title.split(": Magnitude ")[1];
      data.push({place: curPlace, mag: curMag});
    }
    if(data.length > 0) {
      $scope.items = data;
    } else {
      $scope.items = noData;
    }
  });
})();

