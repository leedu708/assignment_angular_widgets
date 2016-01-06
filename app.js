var widgets = angular.module('widgets', []);

widgets.controller('RestaurantCtrl', ['$scope', function($scope){

  $scope.restaurants = [];
  $scope.sort = "foodType";

  $scope.createRestaurant = function(name, foodType, imageURL) {
    var newRestaurant = {
      name: name,
      foodType: foodType,
      imageURL: imageURL
    };

    $scope.restaurants.push(newRestaurant);
    $scope.name = null;
    $scope.foodType = null;
    $scope.imageURL = null;
  };

  $scope.remove = function(restaurant) {
    var i = $scope.restaurants.indexOf(restaurant);
    $scope.restaurants.splice(i, 1);
  };

  $scope.setSort = function(selected) {
    $scope.sort = selected;
  };

}]);

widgets.controller('PhotosCtrl', ['$scope', function($scope){

  $scope.rawFeed = instagramResponse;
  $scope.photos = $scope.rawFeed["data"];


  // page variables; offset to determine starting index based on page number
  $scope.page = {
    number: 1,
    perPage: 3,
    offset: function() { return (this.number - 1) * this.perPage }
  };

  // push all unique filters to Filter Options List
  $scope.allFilters = [];
  $scope.photos.forEach( function(photo) {
    if ($scope.allFilters.indexOf(photo.filter) === -1) {
      $scope.allFilters.push(photo.filter);
    };
  });

  // add all tags to the Tags Options List
  $scope.allTags = [];
  $scope.photos.forEach( function(photo) {
    $scope.allTags = $scope.allTags.concat(photo.tags);
  });

  // start with full match
  $scope.tagSearch = "";

  // if tagSearch = "", then all the photos send back true for the match
  // multiple tags selected shows all photos with ANY of the tags
  $scope.customFilter = function(photo) {
    var match = false;
    if ($scope.tagSearch) {
      $scope.tagSearch.forEach( function(tag) {
        if (photo.tags.indexOf(tag) !== -1) {
          match = true;
        };
      });
    };

    if ($scope.tagSearch === "") {
      match = true;
    };
    return match;
  };

  $scope.pageDown = function() {
    if ($scope.page.number > 1) {
      $scope.page.number--;
    };
  };

  $scope.pageUp = function() {
    var totalPages = Math.ceil($scope.filteredPhotos.length / $scope.page.perPage);
    if ($scope.page.number < totalPages) {
      $scope.page.number++;
    };
  };

  $scope.resetPage = function() {
    $scope.page.number = 1;
  };

  // resets all searches
  $scope.resetSearch = function() {
    $scope.filterSearch = "";
    $scope.tagSearch = "";
    $scope.userFilter = {};
    $scope.page.number = 1;
  };

  // Users
  $scope.users = [];
  $scope.photos.forEach( function(photo) {
    if ($scope.users.indexOf(photo.user) === -1) {
      $scope.users.push(photo.user);
    };
  });

  $scope.setUserFilter = function(user) {
    $scope.userFilter = user;
  };

}]);