/**
 * Created by chaow on 12/18/2014 AD.
 */

app.controller('NewsListController', function ($scope,$state,$modal,newsList,NewsService) {

    //console.log("NewsListController");

    $scope.newsList = newsList.data.data;

    $scope.open = function (size,news) {

        var modalInstance = $modal.open({
            templateUrl: '/partial/admin/news/faculty_delete.html',
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


app.controller('NewsPhotoController',function($scope,NewsService,news,photos){
    $scope.news= news.data.data;
    $scope.photos = photos.data.data;

});
