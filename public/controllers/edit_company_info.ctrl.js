ourApp.controller("EditCompanyController", ['$scope', '$http', '$route', '$cookies', '$location', '$routeParams', function($scope, $http, $route, $cookies, $location, $routeParams){

  $scope.companyId = $routeParams.company_id;

  $http({
      method: 'GET',
      url: API_ROOT + 'companies/'+$scope.companyId,
    }).success(function(response){
      console.log(response)
      $scope.company = response.company
      console.log($scope.company.state === 'NY')
    });

  $scope.editCompany = function(){

    var infoEdit = {
      name:                 $('input[name=name]').val(),
      street_num:           $('input[name=street_num]').val(),
      street_num_line_2:    $('input[name=street_num_line_2]').val(),
      street:               $('input[name=street]').val(),
      city:                 $('input[name=city]').val(),
      state:                $('option:selected').val(),
      country:              $('input[name=country]').val(),
      website_url:          $('input[name=website_url]').val(),
      thumbnail_url:        $('input[name=thumbnail_url]').val(),
    };

    $http({
      method: 'PUT',
      url: API_ROOT + 'admins/'+$cookies.user_id+'/companies/'+$scope.companyId,
      params: infoEdit
    }).success(function(response){
      $cookies.company_id = response.id
      $location.path('/company_dashboard/'+response.id)
    }).error(function(data, status, headers, config){
      $scope.error = status
    })

  };

}]);
