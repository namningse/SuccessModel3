/**
 * Created by chaow on 12/18/2014 AD.
 */

app.controller('FacultyListController', function ($scope,$state,$modal,facultyList,FacultyService) {

    //console.log("FacultyListController");

    $scope.faculties = facultyList.data.data;

    $scope.open = function (size,faculty) {

        var modalInstance = $modal.open({
            templateUrl: '/partial/admin/faculty/delete.html',
            controller: 'FacultyDeleteController',
            size: size,
            resolve: {
                faculty: function () {
                    return faculty
                }
            }
        });

        modalInstance.result.then(function(result){

            FacultyService.delete(result).success(function(){
                FacultyService.getAll().success(function(response){
                    $scope.faculties = response.data;
                })
            });

        })
    }


});

app.controller('FacultyDeleteController',function($scope,$modalInstance,FacultyService,faculty) {

    $scope.faculty = faculty;

    $scope.ok = function(){
        $modalInstance.close($scope.faculty);
    }

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    }

});

app.controller('FacultyFormController', function ($scope,$state, faculty,FacultyService) {
    $scope.faculty= faculty.data.data;
    $scope.state = $state;

    $scope.save = function(){
        FacultyService.save($scope.faculty).success(function(response){

        })
    }
});

app.controller('FacultyCoverController',function($scope,FacultyService){

});
