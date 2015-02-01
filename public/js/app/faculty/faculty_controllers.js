/**
 * Created by chaow on 12/18/2014 AD.
 */

app.controller('FacultyListController', function ($scope,$state,$modal,facultyList,FacultyService) {

    //console.log("NewsListController");
    var datatables = facultyList.data.data;

    $scope.dt = datatables;
    $scope.faculties = datatables.data;
    $scope.dt.data = null;
    $scope.dt.skip = parseInt( $scope.dt.skip );
    $scope.dt.take = parseInt( $scope.dt.take);

    $scope.currentPage = 1;

    $scope.pageChange = function(){
        console.log('Page changed to: ' + $scope.currentPage)
        var dt = $scope.dt;
        dt.skip = $scope.currentPage-1;
        NewsService.postFilter(dt).success(function(response){
            console.log(response);
            datatables = response.data;
            $scope.dt = datatables;
            $scope.faculties = datatables.data;
            $scope.dt.data = null;
            $scope.dt.skip = parseInt( $scope.dt.skip );
            $scope.dt.take = parseInt( $scope.dt.take);
        });
    }

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

app.controller('FacultyPhotoController',function($scope,$modal,FileUploader,FacultyService,faculty,photos){
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


    var uploader = $scope.uploader = FacultyService.getUploader($scope.faculty.id);

    uploader.filters.push({
        name: 'imageFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    });
    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
        console.info('onWhenAddingFileFailed', item, filter, options);
    };
    uploader.onAfterAddingFile = function(fileItem) {
        console.info('onAfterAddingFile', fileItem);

        uploader.uploadItem(fileItem);
    };
    uploader.onAfterAddingAll = function(addedFileItems) {
        console.info('onAfterAddingAll', addedFileItems);
    };
    uploader.onBeforeUploadItem = function(item) {
        console.info('onBeforeUploadItem', item);
    };
    uploader.onProgressItem = function(fileItem, progress) {
        console.info('onProgressItem', fileItem, progress);
    };
    uploader.onProgressAll = function(progress) {
        console.info('onProgressAll', progress);
    };
    uploader.onSuccessItem = function(fileItem, response, status, headers) {
        console.info('onSuccessItem', fileItem, response, status, headers);
        $scope.photos.push(response.data);
    };
    uploader.onErrorItem = function(fileItem, response, status, headers) {
        console.info('onErrorItem', fileItem, response, status, headers);
    };
    uploader.onCancelItem = function(fileItem, response, status, headers) {
        console.info('onCancelItem', fileItem, response, status, headers);
    };
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        console.info('onCompleteItem', fileItem, response, status, headers);
    };
    uploader.onCompleteAll = function() {
        console.info('onCompleteAll');
    };
});


app.controller('FacultyLogoController',function($scope,FacultyService,faculty,logo){

    $scope.faculty= faculty.data.data;
    $scope.facultyLogo_current = logo.data.data;
    $scope.facultyLogo_upload = null;




    $scope.selectImage = function(){
        $("#file").click();
    }


    $scope.$watch("facultyLogo_upload", function(newValue, oldValue) {

        if(newValue !== null){

            if(newValue.filetype.split('/')[0] !== 'image'){
                alert('Please select only image file');
                $scope.facultyLogo_upload = null;

            }else {
                $scope.facultyLogo_current = null;
            }
        }else {
            $scope.facultyLogo_current = logo.data.data;
        }
    });

    $scope.removeImage = function(){
        $scope.facultyLogo_upload = null;
    }

    $scope.save = function() {
        FacultyService.saveLogo(
            $scope.faculty,$scope.facultyLogo_upload).success(function(response){
                logo.data.data = response.data;
                $scope.facultyLogo_current = logo.data.data;
                $scope.facultyLogo_upload = null;

            })
    }

});
