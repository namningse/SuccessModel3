/**
 * Created by chaow on 12/18/2014 AD.
 */

app.controller('FacultyListController', function ($scope,$state,$modal,facultyList,FacultyService) {

    //console.log("FacultyListController");

    $scope.faculties = facultyList.data.data;

    $scope.open = function (size,faculty) {

        var modalInstance = $modal.open({
            templateUrl: '/partial/admin/faculty/faculty_delete.html',
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

app.controller('FacultyDeleteController',function($scope,$modalInstance,faculty) {

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

app.controller('FacultyCoverController',function($scope,FacultyService,faculty,cover){
    $scope.faculty= faculty.data.data;
    $scope.cover_image = cover.data.data;
    $scope.upload_image = null;

    $scope.selectImage = function(){
        $("#file").click();
    }

    $scope.$watch("upload_image", function(newValue, oldValue) {

        if(newValue !== null){

            if(newValue.filetype.split('/')[0] !== 'image'){
                alert('Please select only image file');
                $scope.upload_image = null;

            }else {
                $scope.cover_image = null;
            }
        }else {
            $scope.cover_image = cover.data.data;
        }
    });

    $scope.removeImage = function(){
        $scope.upload_image = null;
    }

    $scope.save = function() {
        FacultyService.saveCover($scope.faculty,$scope.upload_image).success(function(response){
            cover.data.data = response.data;
            $scope.cover_image = cover.data.data;
            $scope.upload_image = null;

        })
    }

});

app.controller('FacultyPhotoDeleteController',function($scope,$modalInstance,photo){
    $scope.photo = photo;

    $scope.ok = function(){
        $modalInstance.close($scope.photo);
    }

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    }
});

app.controller('FacultyPhotoController',function($scope,$modal,FacultyService,faculty,photos){
    $scope.faculty= faculty.data.data;
    $scope.photos = photos.data.data;

    $scope.open = function (size,photo) {

        var modalInstance = $modal.open({
            templateUrl: '/partial/admin/faculty/faculty_photo_delete.html',
            controller: 'FacultyPhotoDeleteController',
            size: size,
            resolve: {
                photo: function () {
                    return photo
                }
            }
        });

        modalInstance.result.then(function(result){
            FacultyService.deletePhoto($scope.faculty.id,result).success(function(response){
                index = $scope.photos.indexOf(result);
                $scope.photos.splice(index,index+1);
            });
        })
    }
});
