ourApp.controller("CreateCompanyController", ['$scope', '$http', '$route', '$cookies', '$location', function($scope, $http, $route, $cookies, $location){

  $scope.createCompany = function(){

    var credentials = {
      name:                 $('input[name=name]').val(),
      street_num:           $('input[name=street_num]').val(),
      street_num_line_two:  $('input[name=street_num_line_two]').val(),
      street:               $('input[name=street]').val(),
      city:                 $('input[name=city]').val(),
      state:                $('option:selected').val(),
      country:              $('input[name=country]').val(),
      website_url:          $('input[name=website_url]').val(),
      thumbnail_url:        $('input[name=thumbnail_url]').val(),
    };

    $http({
      method: 'POST',
      url: API_ROOT + 'admins/'+$cookies.user_id+'/companies',
      params: credentials
    }).success(function(response){
      $cookies.company_id = response.id
      $location.path('/company_dashboard/'+response.id)
    }).error(function(data, status, headers, config){
      $scope.error = status
    })

  };

}]);
