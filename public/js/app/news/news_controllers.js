/**
 * Created by chaow on 12/18/2014 AD.
 */

app.controller('NewsListController', function ($scope,$state,FileUploader,$modal,newsList,NewsService) {

    //console.log("NewsListController");
    var datatables = newsList.data.data;
    $scope.dt = datatables;
    $scope.newsList = datatables.data;
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
            $scope.newsList = datatables.data;
            $scope.dt.data = null;
            $scope.dt.skip = parseInt( $scope.dt.skip );
            $scope.dt.take = parseInt( $scope.dt.take);
        });
    }

    $scope.open = function (size,news) {

        var modalInstance = $modal.open({
            templateUrl: '/partial/admin/news/news_delete.html',
            controller: 'NewsDeleteController',
            size: size,
            resolve: {
                news: function () {
                    return news
                }
            }
        });

        modalInstance.result.then(function(result){

            NewsService.delete(result).success(function(){
                NewsService.getAll().success(function(response){
                    $scope.newsList = response.data;
                })
            });

        })
    }


});

app.controller('NewsDeleteController',function($scope,$modalInstance,NewsService,news) {

    $scope.news = news;

    $scope.ok = function(){
        $modalInstance.close($scope.news);
    }

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    }

});

app.controller('NewsFormController', function ($scope,$state, news,NewsService) {
    $scope.news= news.data.data;
    $scope.state = $state;

    $scope.save = function(){
        NewsService.save($scope.news).success(function(response){

        })
    }
});

app.controller('NewsCoverController',function($scope,NewsService,news,cover){
    $scope.news= news.data.data;
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
        NewsService.saveCover($scope.news,$scope.upload_image).success(function(response){
            cover.data.data = response.data;
            $scope.cover_image = cover.data.data;
            $scope.upload_image = null;

        })
    }

});

app.controller('NewsPhotoDeleteController',function($scope,$modalInstance,photo){
    $scope.photo = photo;

    $scope.ok = function(){
        $modalInstance.close($scope.photo);
    }

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    }
});


app.controller('NewsPhotoController',function($scope,$modal,NewsService,news,photos){
    $scope.news= news.data.data;
    $scope.photos = photos.data.data;


    $scope.open = function (size,photo) {

        var modalInstance = $modal.open({
            templateUrl: '/partial/admin/news/news_photo_delete.html',
            controller: 'NewsPhotoDeleteController',
            size: size,
            resolve: {
                photo: function () {
                    return photo
                }
            }
        });

        modalInstance.result.then(function(result){
            NewsService.deletePhoto($scope.news.id,result).success(function(response){
                index = $scope.photos.indexOf(result);
                $scope.photos.splice(index,index+1);
            });
        })
    }

    var uploader = $scope.uploader = NewsService.getUploader($scope.news.id);

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
