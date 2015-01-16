/**
 * Created by chaow on 12/18/2014 AD.
 */

app.controller('ProjectListController', function ($scope,$state,$modal,projectList,ProjectService) {

    //console.log("ProjectListController");

    $scope.projects = projectList.data.data;

    $scope.open = function (size,project) {

        var modalInstance = $modal.open({
            templateUrl: '/partial/admin/project/project_delete.html',
            controller: 'ProjectDeleteController',
            size: size,
            resolve: {
                project: function () {
                    return project
                }
            }
        });

        modalInstance.result.then(function(result){

            ProjectService.delete(result).success(function(){
                ProjectService.getAll().success(function(response){
                    $scope.projects = response.data;
                })
            });

        })
    }


});

app.controller('ProjectDeleteController',function($scope,$modalInstance,project) {

    $scope.project = project;

    $scope.ok = function(){
        $modalInstance.close($scope.project);
    }

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    }

});

app.controller('ProjectFormController', function ($scope,$state, project,FacultyService,ProjectService,ResearcherService) {
    $scope.project= project.data.data;
    $scope.state = $state;

    $scope.save = function(){
        ProjectService.save($scope.project).success(function(response){

        })
    }

    $scope.searchFaculty = function($value){
        return FacultyService.getSearch($value).then(function (response){
            return response.data;
        });
    }

    $scope.searchResearcher = function($value){
        return ResearcherService.getSearch($value).then(function(response){
            return response.data;
        })
    }

    $scope.addResearcher = function(value){
        if(value){
            if(!$scope.project.researchers){
                $scope.project.researchers = [];
            }

            $scope.project.researchers.push(value);

            console.log($scope.project.researchers);
        }
    }

    $scope.addVideo = function(value){
        if (value) {

            if(!$scope.project.videos){
                $scope.project.videos = [];
            }

            video = {
                url : value
            }

            ProjectService.postAddVideo($scope.project.id,video).success(function(response){
                $scope.project.videos.push(response.data);
                $scope.video = "";
            })
        }
    }

    $scope.deleteVideo = function(video){

        if(confirm("Do you want to delete this video")){

            ProjectService.postDeleteVideo($scope.project.id,video).success(function(response){
                //video = response.data
                console.log($scope.project.videos.indexOf(video));
                $scope.project.videos.splice($scope.project.videos.indexOf(video),1);
            })

        }
    }

});

app.controller('ProjectCoverController',function($scope,ProjectService,project,cover){
    $scope.project= project.data.data;
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
        ProjectService.saveCover($scope.project,$scope.upload_image).success(function(response){
            cover.data.data = response.data;
            $scope.cover_image = cover.data.data;
            $scope.upload_image = null;

        })
    }

});

app.controller('ProjectPhotoDeleteController',function($scope,$modalInstance,photo){
    $scope.photo = photo;

    $scope.ok = function(){
        $modalInstance.close($scope.photo);
    }

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    }
});

app.controller('ProjectPhotoController',function($scope,$modal,FileUploader,ProjectService,project,photos){
    $scope.project= project.data.data;
    $scope.photos = photos.data.data;

    $scope.open = function (size,photo) {

        var modalInstance = $modal.open({
            templateUrl: '/partial/admin/project/project_photo_delete.html',
            controller: 'ProjectPhotoDeleteController',
            size: size,
            resolve: {
                photo: function () {
                    return photo
                }
            }
        });

        modalInstance.result.then(function(result){
            ProjectService.deletePhoto($scope.project.id,result).success(function(response){
                index = $scope.photos.indexOf(result);
                $scope.photos.splice(index,index+1);
            });
        })
    }


    var uploader = $scope.uploader = ProjectService.getUploader($scope.project.id);

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

    uploader.onSuccessItem = function(fileItem, response, status, headers) {
        console.info('onSuccessItem', fileItem, response, status, headers);
        $scope.photos.push(response.data);
    };

});

app.controller('ProjectFullTextController',function($scope,$modal,FileUploader,ProjectService,project,fulltext){
    $scope.project= project.data.data;
    $scope.fulltext = fulltext.data.data;

    console.log(fulltext.data.data);


    var fullTextuploader = $scope.FullTextuploader = ProjectService.getFullTextUploader($scope.project.id);

    fullTextuploader.filters.push({
        name: 'docFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            console.log(type);
            return '|jpeg|pdf|doc|docx|vnd.ms-word.document.12|'.indexOf(type) !== -1;
        }
    });
    fullTextuploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
        console.info('onWhenAddingFileFailed', item, filter, options);
    };
    fullTextuploader.onAfterAddingFile = function(fileItem) {
        console.info('onAfterAddingFile', fileItem);
        fullTextuploader.uploadItem(fileItem);
    };

    fullTextuploader.onSuccessItem = function(fileItem, response, status, headers) {
        console.info('onSuccessItem', fileItem, response, status, headers);
        $scope.fulltext = response.data;
    };

});
