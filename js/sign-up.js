angular.module("signApp", ["ngRoute"])
	.config(function ($routeProvider) {
		$routeProvider.when("/signup1", {
			templateUrl: "views/signup1.html"
		});
		$routeProvider.when("/signup3", {
			templateUrl: "views/signup3.html"
		});
		$routeProvider.when("/signup4", {
			templateUrl: "views/signup4.html"
		});
		$routeProvider.otherwise({
			templateUrl: "views/signup1.html"
		});
	})
	.config(function($locationProvider) {
	  $locationProvider.hashPrefix('!');
	})
	.controller("mainCtrl", function ($scope, $http, $location, $anchorScroll) {
// INITIAL LANDING PAGE NAV: 
	$scope.scroll = function(id) {
		if ($location.hash() !== id) {
      // set the $location.hash to `newHash` and
      // $anchorScroll will automatically scroll to it
      $location.hash(id);
    } else {
      // call $anchorScroll() explicitly,
      // since $location.hash hasn't changed
      $anchorScroll();
    }
	};
	
// FIRST PAGE Signup-1
		$scope.data = {};
		$scope.data.imageUrl = "img/paw.png"; //default profile image
		$scope.nextTo = function () {
			console.log($scope.data);
			$http({
				method:'post', 
				url: "postData1.php", 
				data: $scope.data, 
				headers: {'Content-Type': undefined}
				}).success(function(data) {
    			console.log(data);
    			$location.path("/signup3");
    		});
		}
// image upload features: 
			$scope.form = [];
		  $scope.files = [];

	      $scope.submit = function() {
	      	$scope.form.image = $scope.files[0];

	      	$http({
					  method  : 'POST',
					  url     : 'postData1.php',
					  processData: false,
					  transformRequest: function (data) {
					      var formData = new FormData();
					      formData.append("image", $scope.form.image);  
					      return formData;  
					  },  
					  data : $scope.form,
					  headers: {
					         'Content-Type': undefined
					  }
					   }).success(function(data){
					   		$scope.data.imageUrl = data;
					   		console.log($scope.data.imageUrl);
					      //server will return data : imageUrl path-on-server to image.
					});

	      };//end submit()

//select and view selected image
	      $scope.uploadedFile = function(element) {
			    $scope.currentFile = element.files[0];
			    var reader = new FileReader();

			    reader.onload = function(event) {
			      $scope.image_source = event.target.result
			      $scope.$apply(function($scope) {
			        $scope.files = element.files;
			      });
			    }
	          reader.readAsDataURL(element.files[0]);
			  }

// calculate age from DOB:
			  $scope.ageCalc = function (dateOfBirth) {
			  	var today = new Date();
			    var birthDate = new Date(dateOfBirth);
			    var age = today.getFullYear() - birthDate.getFullYear();
			    var m = today.getMonth() - birthDate.getMonth();
			    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			        age--;
			    }
			    return age;
			  }

// SECOND PAGE Signup-3:
		$scope.ccard = {};

		$scope.nextTo4 =function () {
			console.log($scope.ccard);
			if ($scope.ccard.save_authorised == true) {
				$http({
				method:'POST', 
				url: "postPaymentData.php", 
				data: $scope.ccard, 
				headers: {'Content-Type': undefined}
				}).success(function(data) {
    			console.log(data);
    		}).error(function(errorMsg) {
    			console.log(errorMsg);
    		});
			}else{
				console.log("payment data not saved");
			}

			$location.path("/signup4");
		}
// THIRD PAGE: Signup-4
		$scope.addMore = function () {
			$location.path("/signup1");
// process to get last 4 rows from db and publish these profiles in section3
			$http({ 
				method: 'get', 
				url: 'fetchData.php'
				}).then(function (response) {
				$scope.profile = response.data;
				console.log($scope.profile);
				},
				function(error){
				console.log(error, "ajax can't get data" );
			});
		}
		
// get last 4 rows of db table and publish in section3
		$scope.publishProfile = function() {
			$http({ 
				method: 'get', 
				url: 'fetchData.php'
				}).then(function (response) {
				$scope.profile = response.data;
				console.log($scope.profile);
				},
				function(error){
				console.log(error, "ajax can't get data" );
			});
		}

		
	});