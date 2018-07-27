angular.module("signApp", ["ngRoute"])
	.config(function ($routeProvider) {
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
	.controller("mainCtrl", function ($scope, $location) {
		$scope.pet = [
			{"name": "Perky", "breed": "", "dob": "", "gender_male": true, "gender_female": false, "spayed": true, "neutered": false, "weight": "50-100", "photo": "url" }
		];
		$scope.nextTo = function (page) {
			switch(page){
				case "signup3" :
					$location.path("/signup3");
					break;
					case "signup4" :
						$location.path("/signup4");
						break;
					default:
						$location.path("/signup1");
						break;
			}
		}
	});