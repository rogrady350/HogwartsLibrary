var spells = [];
var activeSpell = 0;

var app = angular.module('browseSpellsApp', []);

app.controller('browseSpellsCtrl', function($scope, $http){
    $scope.get_records = function() {
        $http({
            //Send request to the server
            method: 'get', 
            url: potterURL + "/get-spells"
        }).then(function(response){
            //Successfully connected to the server
            if(response.data.msg === "SUCCESS") {
                spells = response.data.spells;
                $scope.obj = spells[activeSpell];
                $scope.showHide();
            } else {
                console.log(response.data.msg);
            }
        }), function(error) {
            console.log(error)
        }
    }

    //execute on page load
    $scope.get_records()

    $scope.changeSpell = function(direction) {
        activeSpell += direction;
        $scope.obj = spells[activeSpell];
        $scope.showHide();
    }

    //hide buttons if on first/last spells
    $scope.showHide = function() {
        $scope.hidePrev = (activeSpell == 0);
        $scope.hideNext = (activeSpell == spells.length - 1);
    }
}); //End of controller