var app = angular.module("tableApp", []);

app.controller("tableCtrl", function($scope, $http){
    $scope.spells = [];

    //GET - function to retrieve spells
    $scope.get_records = function(){
        $http({
            method: 'get',
            url: potterURL + "/get-spells"
        }).then(function(response){
            if (response.data.msg === "SUCCESS") {
                $scope.spells = response.data.spells;
                $scope.types = getTypes(response.data.spells);
                $scope.selectedType = $scope.types[0];
            } else {
                console.log(response.data.msg);
            }
        }), function(error) {
            console.log(error);
        }
    }; //End of get records function

    //execute on page load
    $scope.get_records();

    $scope.redrawTable = function() {
        var type = $scope.selectedType.value;
        
        $http({
            method: 'get',
            url: potterURL + "/get-spellsByType",
            params: {type: type}
        }).then(function(response){
            if (response.data.msg === "SUCCESS") {
                $scope.spells = response.data.spells;
            } else {
                console.log(response.data.msg);
            }
        }), function(error) {
            console.log(error);
        }
    }

    $scope.editSpell = function(spellNumber) {
        $scope.name = $scope.spells[spellNumber].name;
        $scope.type = $scope.spells[spellNumber].type;
        $scope.effect = $scope.spells[spellNumber].effect;
        $scope.counter = $scope.spells[spellNumber]['counter-spell'];
        $scope.spellID = $scope.spells[spellNumber]['_id'];

        $scope.hideTable = true;
        $scope.hideForm = false;
    }

    $scope.cancelUpdate = function(){
        $scope.hideTable = false;
        $scope.hideForm = true;
    }

    //PUT - update a spell
    $scope.updateSpell = function() {
        if($scope.name === "" || $scope.type === "" || $scope.effect === "") {
            $scope.addResults = "Name, type, add effect are required";
            return;
        }

        $http({
            method: 'put',
            url: potterURL + "/update-spell",
            data: {
                ID: $scope.spellID,
                name: $scope.name,
                type: $scope.type.toLowerCase(),
                effect: $scope.effect,
                counterSpell: $scope.counter
            }
        }).then(function(response){
            if(response.data.msg === "SUCCESS") {
                $scope.cancelUpdate();
                $scope.redrawTable();

                $scope.name = "";
                $scope.type = "";
                $scope.effect = "";
                $scope.counter = "";
            }else {
                $scope.addResults = response.data.msg
            }
        }), function(error) {
            console.log(error);
        }
    } //end of update spell function

    //DELETE - delete a spell
    $scope.deleteSpell = function(id) {
        console.log(id);

        $http({
            method: 'delete',
            url: potterURL + "/delete-spell",
            params: {spellID: id}

        }).then(function(response){
            if(response.data.msg == "SUCCESS") {
                $scope.redrawTable();
            } else {
                console.log(response.data.msg);
            }
        }), function(error){
            console.log(error);
        }
    } //end of delete function
}); //End of controller

function getTypes(spellTableData) {
    var typeExists;

    typesArray = [{ value:"", display:"All" }];

    for (var i=0; i<spellTableData.length; i++) {
        typeExists = typesArray.find(function (element) {
            return element.value === spellTableData[i].type;
        });

        if (typeExists) {
            continue;
        } else {
            typesArray.push({value: spellTableData[i].type, display: spellTableData[i].type.toUpperCase()})
        }
    }

    return typesArray;
}