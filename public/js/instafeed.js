(function() {
  //Place your own Instagram client_id below. Go to https://instagram.com/developer/clients/manage/ and register your app to get a client ID
   var client_id = '14f7d626a32f496281a194bb1032d58b';
  //To get your user ID go to http://jelled.com/instagram/lookup-user-id and enter your Instagram user name to get your user ID
  var user_id = '2287159047';
  //https://www.instagram.com/oauth/authorize/?client_id=64a12cb0db7b41da8cd2a8736770c466&redirect_uri=http://127.0.0.1:8080/test&response_type=token
   var access_token = '2287159047.14f7d62.a6e3401ead5549569d2dfde3b37ada39';
  var app = angular.module('instafeed', []);
  app.factory('InstagramAPI', ['$http', function($http) {
    return {
      fetchPhotos : function(callback) {
        var endpoint = 'https://api.instagram.com/v1/users/';
        endpoint += user_id;
        endpoint += '/media/recent/?';
        endpoint += '?count=99';
        endpoint += '&callback=JSON_CALLBACK';
        endpoint += '&access_token=' + access_token;
        $http.jsonp(endpoint)
        .success(function(response) {
          callback(response.data);
        })
        .error(function(xhr, status, err) {
          console.error(status, err);
        })
      }
    }
  }]);
  app.controller('ShowImages', function($scope, InstagramAPI) {
    $scope.layout = 'grid';
    $scope.data = {};
    $scope.pics = [];
    InstagramAPI.fetchPhotos(function(data) {
      $scope.pics = data;
    });
  });
})();
