var app = angular.module("addSpellsApp", []);

//POST - function to add spells
app.controller("addSpellsCtrl", function($scope, $http){
    $scope.submitSpell = function(){
        //make sure user does not submit blank form
        if($scope.name == "" || $scope.type == "" || $scope.effect == "") {
            return;
        }

        $http({
            method: "post",
            url: potterURL + "/add-spell",
            data: {
                name: $scope.name,
                type: $scope.type.toLowerCase(),
                effect: $scope.effect,
                counter: $scope.counter
            }
        }).then(function(response){
            if(response.data.msg = "SUCCESS") {
                $scope.addResults = "Spell is added!";
                $scope.name = "";
                $scope.type = "";
                $scope.counter = "";
            } else {
                $scope.addResults = respones.data.msg;
            }
        }), function(err) {
            console.log(err);
        }
    }

    $scope.addResults = "";
    
}); //end of controller