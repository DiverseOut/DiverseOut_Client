ourApp.controller("CompanyDashboardController", ['$scope', '$http', '$route', '$cookies', '$location', '$routeParams', function($scope, $http, $route, $cookies, $location, $routeParams){

    $scope.companyId = $routeParams.company_id;

    $scope.readableDate = function(dateArr){
      return (new Date(Date.parse(dateArr)).toDateString())
    };

    $http({
      method: 'GET',
      url: API_ROOT + 'companies/'+$scope.companyId,
    }).success(function(response){
      console.log(response)
      $scope.company = response.company
      $scope.surveys = response.surveys
    });

}]);
