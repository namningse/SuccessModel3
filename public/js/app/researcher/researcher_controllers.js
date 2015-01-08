/**
 * Created by chaow on 12/18/2014 AD.
 */

app.controller('ResearcherListController', function ($scope,$state,$modal,researcherList,ResearcherService) {

    //console.log("ResearcherListController");

    $scope.researchers = researcherList.data.data;

    $scope.open = function (size,researcher) {

        var modalInstance = $modal.open({
            templateUrl: '/partial/admin/researcher/researcher_delete.html',
            controller: 'ResearcherDeleteController',
            size: size,
            resolve: {
                researcher: function () {
                    return researcher
                }
            }
        });

        modalInstance.result.then(function(result){

            ResearcherService.delete(result).success(function(){
                ResearcherService.getAll().success(function(response){
                    $scope.researchers = response.data;
                })
            });

        })
    }


});

app.controller('ResearcherDeleteController',function($scope,$modalInstance,researcher) {

    $scope.researcher = researcher;

    $scope.ok = function(){
        $modalInstance.close($scope.researcher);
    }

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    }

});

app.controller('ResearcherFormController', function ($scope,$state, researcher,FacultyService,ResearcherService) {
    $scope.researcher= researcher.data.data;
    $scope.state = $state;

    $scope.save = function(){
        ResearcherService.save($scope.researcher).success(function(response){
            if ($state.current.name==='add'){
                $state.go("list")
            }
        })
    }

    $scope.searchFaculty = function($value){
        return FacultyService.getSearch($value).then(function (response){
            return response.data;
        });
    }
});

app.controller('ResearcherCoverController',function($scope,ResearcherService,researcher,cover){
    $scope.researcher= researcher.data.data;
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
        ResearcherService.saveCover($scope.researcher,$scope.upload_image).success(function(response){
            cover.data.data = response.data;
            $scope.cover_image = cover.data.data;
            $scope.upload_image = null;

        })
    }

});


app.controller('ResearcherProfilePhotoController',function($scope,ResearcherService,researcher,profilePhoto){
    $scope.researcher= researcher.data.data;
    $scope.profilePhoto_current = profilePhoto.data.data;
    $scope.profilePhoto_upload = null;


    $scope.selectImage = function(){
        $("#file").click();
    }


    $scope.$watch("profilePhoto_upload", function(newValue, oldValue) {

        if(newValue !== null){

            if(newValue.filetype.split('/')[0] !== 'image'){
                alert('Please select only image file');
                $scope.profilePhoto_upload = null;

            }else {
                $scope.profilePhoto_current = null;
            }
        }else {
            $scope.profilePhoto_current = profilePhoto.data.data;
        }
    });

    $scope.removeImage = function(){
        $scope.profilePhoto_upload = null;
    }

    $scope.save = function() {
        ResearcherService.saveProfilePhoto(
            $scope.researcher,$scope.profilePhoto_upload).success(function(response){
            profilePhoto.data.data = response.data;
            $scope.profilePhoto_current = profilePhoto.data.data;
            $scope.profilePhoto_upload = null;

        })
    }

});



app.controller('ResearcherPhotoDeleteController',function($scope,$modalInstance,photo){
    $scope.photo = photo;

    $scope.ok = function(){
        $modalInstance.close($scope.photo);
    }

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    }
});

app.controller('ResearcherPhotoController',function($scope,$modal,FileUploader,ResearcherService,researcher,photos){
    $scope.researcher= researcher.data.data;
    $scope.photos = photos.data.data;

    $scope.open = function (size,photo) {

        var modalInstance = $modal.open({
            templateUrl: '/partial/admin/researcher/researcher_photo_delete.html',
            controller: 'ResearcherPhotoDeleteController',
            size: size,
            resolve: {
                photo: function () {
                    return photo
                }
            }
        });

        modalInstance.result.then(function(result){
            ResearcherService.deletePhoto($scope.researcher.id,result).success(function(response){
                index = $scope.photos.indexOf(result);
                $scope.photos.splice(index,index+1);
            });
        })
    }


    var uploader = $scope.uploader = ResearcherService.getUploader($scope.researcher.id);

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

app.controller('ResearcherImportController',function($scope,ResearcherService){

    $scope.importResearchers = null;

    $scope.removeImportResearcher = function(index){
        $scope.importResearchers.splice(index,1);
        if ($scope.importResearchers.length == 0){
            $scope.importResearchers = null;
        }
    }

    $scope.confirmImport = function(){
        console.log($scope.importResearchers);
        var uploadResearchers = {
            'researchers' : $scope.importResearchers
        }

        ResearcherService.confirmImport(uploadResearchers).success(function(response){
            console.log(response)
        })
    }

    var importCSVuploader = $scope.ImportCSVuploader = ResearcherService.getImportUploader();

    importCSVuploader.filters.push({
        name: 'csvFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|csv|'.indexOf(type) !== -1;
        }
    });

    importCSVuploader.onAfterAddingFile = function(fileItem) {
        console.info('onAfterAddingFile', fileItem);
        importCSVuploader.uploadItem(fileItem);
    };

    importCSVuploader.onSuccessItem = function(fileItem, response, status, headers) {
        console.log(response.data)
        $scope.importResearchers = response.data;
    };

});