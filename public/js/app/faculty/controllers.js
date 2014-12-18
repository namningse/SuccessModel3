/**
 * Created by chaow on 12/18/2014 AD.
 */

app.controller('FacultyListController', function ($scope,$state, facultyList) {

    console.log("FacultyListController");

    $scope.faculties = facultyList.data.data;


});

app.controller('FacultyFormController', function ($scope,$state, faculty,FacultyService) {
    $scope.faculty= faculty.data.data;
    $scope.state = $state;

    $scope.save = function(){
        FacultyService.save($scope.faculty).success(function(response){

        })
    }

});
